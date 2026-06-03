import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="content">
        <section className="notfound" aria-labelledby="notfound-title">
          <div className="section-wrap notfound-inner">
            <p className="hero-eyebrow">Error 404</p>
            <h1 className="notfound-h1" id="notfound-title">
              This one got <em>away.</em>
            </h1>
            <p className="notfound-desc">
              The page you were after isn&apos;t here — but the market still is. Head back home,
              browse the departments, or call us in {SITE.address.city} and we&apos;ll point you
              the right way.
            </p>
            <div className="notfound-actions">
              <Link href="/" className="btn-gold">
                Back to home
              </Link>
              <Link href="/shop" className="btn-outline-cream">
                Browse departments
              </Link>
              <a href={`tel:${SITE.phoneTel}`} className="btn-outline-cream">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
