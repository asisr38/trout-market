import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { DEPARTMENTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grocery, Deli & Seafood",
  description: `Explore every department at ${SITE.name}: fresh seafood, housemade deli, hot foods & dinners, and full grocery provisions. Serving ${SITE.address.city}, ${SITE.address.region} since ${SITE.founded}.`,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `Grocery, Deli & Seafood | ${SITE.name}`,
    description: `Every department at ${SITE.name} — seafood, deli, hot foods, and grocery.`,
    url: `${SITE.url}/shop`,
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <>
      <Nav />
      <main id="content">
        <section className="shop-hero" aria-labelledby="shop-title">
          <div className="section-wrap">
            <p className="hero-eyebrow">Departments</p>
            <h1 className="shop-hero-h1" id="shop-title">
              Grocery, Deli <em>&amp; Seafood</em>
            </h1>
            <p className="shop-hero-desc">
              Four departments under one roof in {SITE.address.city}. From dockside-fresh blue crab to pantry staples, housemade sides to legendary fried chicken — everything you need for the week ahead.
            </p>
          </div>
        </section>

        <section className="shop-depts">
          <div className="section-wrap">
            <div className="shop-grid">
              {DEPARTMENTS.map((d, i) => (
                <article className="shop-card" key={d.slug} id={d.slug}>
                  <div className="shop-card-head">
                    <span className="shop-card-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="section-kicker">{d.kicker}</p>
                      <h2 className="shop-card-title">{d.title}</h2>
                    </div>
                  </div>
                  <p className="shop-card-desc">{d.desc}</p>
                  <ul className="shop-card-tags">
                    {d.highlights.map((h) => (
                      <li className="sides-tag" key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="cta-band" style={{ marginTop: 64 }}>
              <h3 className="cta-band-title">Can&apos;t find something?</h3>
              <p className="cta-band-sub">
                Call us — if we don&apos;t have it on the shelf, we can usually get it in by the next day.
              </p>
              <div className="cta-btns">
                <a href={`tel:${SITE.phoneTel}`} className="btn-gold btn-sm">Call {SITE.phone}</a>
                <a href={`mailto:${SITE.email}`} className="btn-outline-cream btn-sm">Email Us</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
