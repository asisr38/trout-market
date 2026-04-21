import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">{SITE.name}</div>
          <div className="footer-brand-sub">{SITE.tagline}</div>
          <address className="footer-brand-desc" style={{ fontStyle: "normal" }}>
            {SITE.address.street}<br />
            {SITE.address.city}, {SITE.address.region} {SITE.address.postal}<br />
            Open 7 days a week.
          </address>
        </div>
        <div>
          <div className="footer-col-title">Specials</div>
          <nav className="footer-links" aria-label="Specials">
            <a href="#specials">Weekly Deals</a>
            <a href="#specials">Crab Pricing</a>
            <a href="#deli">Fried Chicken</a>
          </nav>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <nav className="footer-links" aria-label="Services">
            <a href="#deli">Deli</a>
            <a href="#deli">Catering</a>
            <a href="#hours">Curbside Pickup</a>
          </nav>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <nav className="footer-links" aria-label="Contact">
            <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href="#hours">Hours &amp; Location</a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
        <span className="footer-copy">Privacy Policy · Accessibility · Conditions of Use</span>
      </div>
    </footer>
  );
}
