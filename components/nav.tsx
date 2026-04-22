"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "/#specials", label: "Specials" },
  { href: "/shop", label: "Shop" },
  { href: "/#deli", label: "Deli & Catering" },
  { href: "/#dinner", label: "Dinner" },
  { href: "/#hours", label: "Hours" },
  { href: "/#about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key !== "Tab" || !focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <Link href="/" className="nav-logo" aria-label={`${SITE.name} home`}>
          <span className="nav-logo-text">
            <span className="nav-logo-top">{SITE.name}</span>
            <span className="nav-logo-sub">
              Seafood · Deli · Groceries
            </span>
          </span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link-desktop">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href={`tel:${SITE.phoneTel}`}
            className="nav-phone"
            aria-label={`Call ${SITE.phone}`}
          >
            <span>{SITE.phone}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`hamburger${open ? " open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        tabIndex={-1}
      >
        <div className="mobile-menu-inner">
          <nav className="mobile-menu-links" aria-label="Mobile">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mobile-menu-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="btn-gold mobile-menu-cta"
            onClick={() => setOpen(false)}
          >
            Call {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="btn-outline-cream mobile-menu-cta"
            onClick={() => setOpen(false)}
          >
            Email Us
          </a>
          <div className="mobile-menu-theme">
            <ThemeToggle variant="menu" />
          </div>
          <div className="mobile-menu-meta">
            {SITE.address.street}
            <br />
            {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
          </div>
        </div>
      </div>
    </>
  );
}
