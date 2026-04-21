import { SITE } from "@/lib/site";

const SERVICES = [
  {
    num: "01",
    title: "Party Platters",
    desc: "Deli meats, cheeses, and accompaniments — portioned and arranged for any group size. Order ahead for your next gathering.",
  },
  {
    num: "02",
    title: "Seafood Catering",
    desc: "Fresh crab, shrimp, and fish dishes prepared for events of all sizes. Call us to discuss your menu.",
  },
  {
    num: "03",
    title: "Sub Sandwiches",
    desc: "Built fresh daily with our housemade deli meats and artisan bread. Available for individual orders or group catering.",
  },
  {
    num: "04",
    title: "Grocery & Provisions",
    desc: "A full selection of everyday groceries, fresh produce, and pantry staples — everything you need under one roof.",
  },
];

const CHICKEN = [
  ["4 Piece", "$6.99"],
  ["8 Piece", "$12.99"],
  ["12 Piece", "$18.99"],
  ["16 Piece", "$24.99"],
];

const SIDES = ["Crab Cakes", "Fish & Chips", "Stuffed Shrimp", "Coleslaw", "Potato Salad"];

export default function Deli() {
  return (
    <section id="deli" aria-labelledby="deli-title">
      <div className="section-wrap">
        <div className="section-header">
          <div>
            <p className="section-kicker">Made Fresh Daily</p>
            <h2 className="section-title" id="deli-title">
              Deli &amp; <em>Catering</em>
            </h2>
          </div>
        </div>
        <div className="deli-layout">
          <div>
            <ol className="deli-services">
              {SERVICES.map((s) => (
                <li className="deli-service" key={s.num}>
                  <span className="deli-service-num" aria-hidden="true">{s.num}</span>
                  <div>
                    <h3 className="deli-service-title">{s.title}</h3>
                    <p className="deli-service-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="cta-band" role="complementary">
              <h3 className="cta-band-title">Planning an event?</h3>
              <p className="cta-band-sub">
                Call ahead or email — we&apos;ll prepare everything from seafood spreads to sandwich platters for your guests.
              </p>
              <div className="cta-btns">
                <a href={`tel:${SITE.phoneTel}`} className="btn-gold btn-sm">Call Now</a>
                <a href={`mailto:${SITE.email}`} className="btn-outline-cream btn-sm">Email Us</a>
              </div>
            </div>
          </div>
          <div>
            <div className="chicken-panel" aria-labelledby="chicken-title">
              <div className="chicken-panel-header">
                <div>
                  <p className="chicken-panel-kicker">Our Famous</p>
                  <h3 className="chicken-panel-title" id="chicken-title">Fried Chicken</h3>
                </div>
                <p className="chicken-panel-note">Call ahead for large orders</p>
              </div>
              {CHICKEN.map(([sz, pr]) => (
                <div className="chicken-row" key={sz}>
                  <span className="chicken-row-sz">{sz}</span>
                  <span className="chicken-row-pr">{pr}</span>
                </div>
              ))}
            </div>
            <div className="sides-panel">
              <p className="sides-label">Also Available</p>
              <ul className="sides-tags">
                {SIDES.map((s) => (
                  <li className="sides-tag" key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
