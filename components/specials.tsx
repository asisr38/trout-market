import { SITE } from "@/lib/site";

type Deal = {
  name: string;
  price: string;
  unit: string;
  was?: string;
  meta?: string;
  badge?: string;
};

const DEALS: Deal[] = [
  { name: "Jumbo Shrimp", was: "Was $13.99 / lb", price: "$9.99", unit: "/lb", badge: "On Sale" },
  { name: "Crab Cakes", was: "Was $14.99 / 2 pk", price: "$11.99", unit: "/pk", badge: "On Sale" },
  { name: "Turkey Breast", meta: "Sliced fresh at the deli", price: "$8.49", unit: "/lb" },
  { name: "Fried Chicken", was: "Was $8.99 / 4 pc", price: "$7.49", unit: "/4pc", badge: "On Sale" },
];

const CRAB = [
  { name: "#1 Jimmies (doz.)", price: "$48.00" },
  { name: "#2 Jimmies (doz.)", price: "$38.00" },
  { name: "#1 Sooks (doz.)", price: "$36.00" },
  { name: "Soft Shell (each)", price: "$4.50" },
] as const;

export default function Specials() {
  return (
    <section id="specials" aria-labelledby="specials-title">
      <div className="section-wrap">
        <div className="section-header">
          <div>
            <p className="section-kicker">Updated Weekly</p>
            <h2 className="section-title" id="specials-title">
              This Week&apos;s <em>Specials</em>
            </h2>
          </div>
          <p className="section-note">
            Prices subject to availability.<br />Call to confirm: {SITE.phone}
          </p>
        </div>

        <div className="deals-grid">
          {DEALS.map((d) => (
            <article className="deal-cell" key={d.name}>
              <h3 className="deal-cell-name">{d.name}</h3>
              {d.was && <p className="deal-cell-was">{d.was}</p>}
              {d.meta && <p className="deal-cell-meta">{d.meta}</p>}
              <p className="deal-cell-price">
                {d.price}
                <span className="deal-cell-price-unit"> {d.unit}</span>
              </p>
              {d.badge && <span className="deal-cell-badge">{d.badge}</span>}
            </article>
          ))}
        </div>

        <div className="crab-section">
          <div className="crab-grid">
            <div>
              <p className="section-kicker" style={{ marginBottom: 14 }}>Live Pricing</p>
              <h3 className="crab-intro-title">
                Crab<br /><em>Pricing</em>
              </h3>
              <p className="crab-intro-sub">
                Fresh blue crab, priced by grade. Market pricing — call ahead to confirm availability and current rates.
              </p>
              <a href={`tel:${SITE.phoneTel}`} className="btn-outline-cream btn-sm">Call to Confirm</a>
            </div>
            <dl className="crab-table">
              {CRAB.map((c) => (
                <div className="crab-row" key={c.name}>
                  <dt className="crab-row-name">{c.name}</dt>
                  <dd className="crab-row-price">{c.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
