import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg-img" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-year" aria-hidden="true">{SITE.founded}</div>
      <div className="hero-inner">
        <p className="hero-eyebrow">{SITE.address.city}, {SITE.address.region} · Since {SITE.founded}</p>
        <h1 className="hero-h1">
          Fresh from<br />
          land <em>&amp; sea.</em>
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">
            Your neighborhood market for fresh seafood, housemade deli, legendary fried chicken, and everyday groceries — serving Frederick County for over 30 years.
          </p>
          <div className="hero-actions">
            <a href="#specials" className="btn-gold">View Specials</a>
            <a href="#hours" className="btn-outline-cream">Hours &amp; Location</a>
          </div>
        </div>
      </div>
    </header>
  );
}
