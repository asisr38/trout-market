import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg-img" aria-hidden="true">
        <Image
          src="/buildingFront.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-year" aria-hidden="true">{SITE.founded}</div>
      <div className="hero-inner">
        <p className="hero-eyebrow">{SITE.address.city}, {SITE.address.region} · Since {SITE.founded}</p>
        <h1 className="hero-h1">
          Fresh from<br />
          land <em>&amp; sea.</em>
        </h1>
        <div className="hero-bottom">
          <div className="hero-copy">
            <p className="hero-desc">
              Your neighborhood market for fresh seafood, housemade deli, legendary fried chicken, and everyday groceries — serving Frederick County for over 30 years.
            </p>
            <ul className="hero-tags" aria-label="Highlights">
              <li className="hero-tag">Fresh seafood daily</li>
              <li className="hero-tag">Housemade deli &amp; catering</li>
              <li className="hero-tag">Hot dinners every evening</li>
            </ul>
          </div>
          <div className="hero-side">
            <div className="hero-actions">
              <a href="#specials" className="btn-gold">View Specials</a>
              <a href="#hours" className="btn-outline-cream">Hours &amp; Location</a>
            </div>
            <dl className="hero-facts">
              <div className="hero-fact-card">
                <dt className="hero-fact-label">Open Daily</dt>
                <dd className="hero-fact-value">Mon–Fri 7am–7pm</dd>
              </div>
              <div className="hero-fact-card">
                <dt className="hero-fact-label">Call Ahead</dt>
                <dd className="hero-fact-value">{SITE.phone}</dd>
              </div>
              <div className="hero-fact-card">
                <dt className="hero-fact-label">Visit</dt>
                <dd className="hero-fact-value">{SITE.address.city}, {SITE.address.region}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </header>
  );
}
