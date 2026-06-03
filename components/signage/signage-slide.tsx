import Image from "next/image";
import { SITE } from "@/lib/site";
import type { SignageSlide } from "@/lib/signage";

/**
 * Product slide (Weekly Specials, Fresh Produce, Meat Deals, Bakery & Deli).
 * Renders a typographic layout, plus an optional photo when the slide defines
 * an `image` (hybrid photo slot).
 */
export function ItemsSlide({
  slide,
  active,
}: {
  slide: SignageSlide;
  active: boolean;
}) {
  const hasPhoto = Boolean(slide.image);

  return (
    <section
      className={`tv-slide tv-slide--items${hasPhoto ? " has-photo" : ""}${
        active ? " is-active" : ""
      }`}
      aria-hidden={!active}
    >
      {hasPhoto && (
        <div className="tv-photo">
          <Image
            src={slide.image as string}
            alt=""
            fill
            sizes="50vw"
            className="tv-photo-img"
            priority
          />
        </div>
      )}

      <div className="tv-body">
        <p className="tv-eyebrow">{slide.eyebrow}</p>
        <h2 className="tv-title">{slide.title}</h2>

        <ul className="tv-items">
          {slide.items.map((item, i) => (
            <li className="tv-item" key={`${slide.id}-${i}`}>
              <span className="tv-item-name">
                {item.name}
                {item.note && <span className="tv-item-note">{item.note}</span>}
              </span>
              {item.price && <span className="tv-item-price">{item.price}</span>}
            </li>
          ))}
        </ul>

        {slide.footnote && <p className="tv-footnote">{slide.footnote}</p>}
      </div>
    </section>
  );
}

/** Store-hours slide, with today's row highlighted. */
export function HoursSlide({
  active,
  todayIndex,
}: {
  active: boolean;
  /** 0 = Monday … 6 = Sunday, or -1 before the client clock has mounted. */
  todayIndex: number;
}) {
  return (
    <section
      className={`tv-slide tv-slide--hours${active ? " is-active" : ""}`}
      aria-hidden={!active}
    >
      <div className="tv-body">
        <p className="tv-eyebrow">Come See Us</p>
        <h2 className="tv-title">Store Hours</h2>

        <ul className="tv-hours">
          {SITE.hours.map(([day, display], i) => (
            <li
              className={`tv-hours-row${i === todayIndex ? " is-today" : ""}`}
              key={day}
            >
              <span className="tv-hours-day">{day}</span>
              <span className="tv-hours-dots" aria-hidden="true" />
              <span className="tv-hours-time">{display}</span>
            </li>
          ))}
        </ul>

        <p className="tv-footnote">{SITE.hotFoodsNote}</p>
      </div>
    </section>
  );
}

/** Closing slide: QR code to the website plus address & phone. */
export function QrSlide({
  active,
  qrSvg,
}: {
  active: boolean;
  /** Pre-rendered inline SVG markup, or null if generation failed. */
  qrSvg: string | null;
}) {
  const displayUrl = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <section
      className={`tv-slide tv-slide--qr${active ? " is-active" : ""}`}
      aria-hidden={!active}
    >
      <div className="tv-body tv-qr-layout">
        <div className="tv-qr-text">
          <p className="tv-eyebrow">Shop · Order · Explore</p>
          <h2 className="tv-title">Visit Us Online</h2>
          <p className="tv-qr-url">{displayUrl}</p>
          <div className="tv-qr-contact">
            <span>
              {SITE.address.street} · {SITE.address.city}, {SITE.address.region}{" "}
              {SITE.address.postal}
            </span>
            <span className="tv-qr-phone">{SITE.phone}</span>
          </div>
        </div>

        <div className="tv-qr-card">
          {qrSvg ? (
            <div
              className="tv-qr-code"
              role="img"
              aria-label={`QR code linking to ${displayUrl}`}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <div className="tv-qr-fallback">
              <span className="tv-qr-fallback-label">Visit</span>
              <span className="tv-qr-fallback-url">{displayUrl}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
