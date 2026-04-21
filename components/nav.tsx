"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "#specials", label: "Specials" },
  { href: "#deli", label: "Deli & Catering" },
  { href: "#hours", label: "Hours" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-logo" aria-label={`${SITE.name} home`}>
          <span className="nav-logo-top">{SITE.name}</span>
          <span className="nav-logo-sub">
            Est. {SITE.founded} · {SITE.address.city}, {SITE.address.region}
          </span>
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link-desktop">
              {l.label}
            </a>
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
        className={`mobile-menu${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-menu-inner">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-menu-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
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
