import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Image
            src="/logo-mark.svg"
            alt=""
            width={72}
            height={72}
            className="footer-brand-mark"
          />
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
            <Link href="/#specials">Weekly Deals</Link>
            <Link href="/#specials">Crab Pricing</Link>
            <Link href="/#deli">Fried Chicken</Link>
          </nav>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <nav className="footer-links" aria-label="Services">
            <Link href="/shop">Grocery, Deli &amp; Seafood</Link>
            <Link href="/#deli">Deli &amp; Catering</Link>
            <Link href="/#dinner">Dinner Menu</Link>
            <Link href="/#hours">Curbside Pickup</Link>
          </nav>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <nav className="footer-links" aria-label="Contact">
            <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <Link href="/#hours">Hours &amp; Location</Link>
          </nav>
          <div className="payments">
            <div className="payments-label">We Accept</div>
            <ul className="payments-list">
              {SITE.paymentsAccepted.map((p) => (
                <li className="payment-badge" key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
        <span className="footer-copy">Family-owned seafood, deli, and grocery market in Woodsboro, Maryland.</span>
      </div>
    </footer>
  );
}
