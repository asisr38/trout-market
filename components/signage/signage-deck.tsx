"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { SITE } from "@/lib/site";
import {
  REFRESH_INTERVAL_MS,
  SLIDE_DURATION_MS,
  type SignageSlide,
} from "@/lib/signage";
import { HoursSlide, ItemsSlide, QrSlide } from "./signage-slide";

type Props = {
  slides: SignageSlide[];
  /** Pre-rendered inline QR SVG from the server, or null if generation failed. */
  qrSvg: string | null;
};

/** "19:00" -> "7 PM", "06:30" -> "6:30 AM". */
function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${hour} ${period}`
    : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function formatClock(d: Date): string {
  return formatTime(
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
      2,
      "0",
    )}`,
  );
}

function getOpenStatus(now: Date | null): { open: boolean; label: string } {
  if (!now) return { open: false, label: "" };
  // SITE.hours is ordered Monday..Sunday; JS getDay() is Sunday..Saturday.
  const idx = (now.getDay() + 6) % 7;
  const [, , open, close] = SITE.hours[idx];
  const current = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;

  if (current >= openMin && current < closeMin) {
    return { open: true, label: `Open until ${formatTime(close)}` };
  }
  if (current < openMin) {
    return { open: false, label: `Opens ${formatTime(open)}` };
  }
  return { open: false, label: "Closed" };
}

export function SignageDeck({ slides, qrSvg }: Props) {
  // Deck = product slides + hours slide + QR slide.
  const total = slides.length + 2;
  const hoursIndex = slides.length;
  const qrIndex = slides.length + 1;

  const [index, setIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  // Auto-rotate slides.
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % total),
      SLIDE_DURATION_MS,
    );
    return () => clearInterval(id);
  }, [total]);

  // Hard-refresh periodically so the TV picks up redeployed content.
  useEffect(() => {
    const id = setTimeout(() => window.location.reload(), REFRESH_INTERVAL_MS);
    return () => clearTimeout(id);
  }, []);

  // Lock page scroll while signage is mounted (does not affect other routes).
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  // Live clock — initialised after mount to avoid SSR/client hydration drift.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const todayIndex = now ? (now.getDay() + 6) % 7 : -1;
  const status = useMemo(() => getOpenStatus(now), [now]);
  const clock = now ? formatClock(now) : "";

  return (
    <div className="tv" role="presentation">
      <header className="tv-bar tv-bar--top">
        <div className="tv-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="tv-brand-mark" />
          <span className="tv-brand-text">
            <span className="tv-brand-name">{SITE.name}</span>
            <span className="tv-brand-tag">{SITE.tagline}</span>
          </span>
        </div>
        <div className="tv-clock" suppressHydrationWarning>
          {clock && <span className="tv-clock-time">{clock}</span>}
          {status.label && (
            <span
              className={`tv-status${status.open ? " is-open" : " is-closed"}`}
            >
              {status.label}
            </span>
          )}
        </div>
      </header>

      <main className="tv-stage">
        {slides.map((slide, i) => (
          <ItemsSlide key={slide.id} slide={slide} active={index === i} />
        ))}
        <HoursSlide active={index === hoursIndex} todayIndex={todayIndex} />
        <QrSlide active={index === qrIndex} qrSvg={qrSvg} />
      </main>

      <footer className="tv-bar tv-bar--bottom">
        <span className="tv-foot-addr">
          {SITE.address.street} · {SITE.address.city}, {SITE.address.region}{" "}
          {SITE.address.postal}
        </span>
        <nav className="tv-dots" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`tv-dot${index === i ? " is-active" : ""}`}
            />
          ))}
        </nav>
        <span className="tv-foot-phone">{SITE.phone}</span>
      </footer>

      <div className="tv-progress" aria-hidden="true">
        <div
          className="tv-progress-fill"
          key={index}
          style={{ "--tv-dur": `${SLIDE_DURATION_MS}ms` } as CSSProperties}
        />
      </div>
    </div>
  );
}
