"use client";

import { useEffect, useRef, useState } from "react";
import {
  MENU_FOOTER,
  REFRESH_INTERVAL_MS,
  SLIDE_SECONDS,
  type TvDeck,
} from "@/lib/tv-menu";
import { MenuSlide, ProgressBar } from "./slides";

export function DigitalMenuCarousel({
  deck,
  imageMap,
}: {
  /** Which TV's slide deck to play (see TV_DECKS in lib/tv-menu.ts). */
  deck: TvDeck;
  /** slide id → resolved photo src (or null to use the branded fallback). */
  imageMap: Record<string, string | null>;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = deck.slides.length;
  const seconds = SLIDE_SECONDS;
  const footer = deck.footer ?? MENU_FOOTER;

  // Auto-rotate forever — restart the timer whenever the slide changes.
  useEffect(() => {
    const id = setTimeout(
      () => setCurrent((c) => (c + 1) % total),
      seconds * 1000,
    );
    return () => clearTimeout(id);
  }, [current, seconds, total]);

  // Scale the fixed 1920×1080 canvas to fit the viewport (letterboxed).
  // A ResizeObserver on <html> fires immediately with real dimensions, so we
  // never get stuck at scale(0) if the first paint reports a 0-size viewport
  // (some TV browsers / signage players do this on cold load).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const w = window.innerWidth || document.documentElement.clientWidth;
      const h = window.innerHeight || document.documentElement.clientHeight;
      if (!w || !h) return;
      const s = Math.min(w / 1920, h / 1080);
      canvas.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    fit();
    requestAnimationFrame(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  // Kiosk behaviour: lock scroll + hard-refresh on an interval so the TV picks
  // up new prices after a redeploy. Scoped to this page's lifetime.
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const refresh = setTimeout(
      () => window.location.reload(),
      REFRESH_INTERVAL_MS,
    );
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      clearTimeout(refresh);
    };
  }, []);

  return (
    <div className="tv2-stage" role="presentation">
      <div className="canvas" data-style="a" ref={canvasRef}>
        <div className="slides">
          {deck.slides.map((slide, i) => (
            <MenuSlide
              key={slide.id}
              data={slide}
              active={i === current}
              footer={footer}
              imageSrc={imageMap[slide.id] ?? null}
              fallback={deck.fallback}
            />
          ))}
        </div>
        <ProgressBar count={total} current={current} seconds={seconds} />
      </div>
    </div>
  );
}
