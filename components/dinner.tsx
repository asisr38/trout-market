import { DINNER, SITE } from "@/lib/site";

export default function Dinner() {
  return (
    <section id="dinner" aria-labelledby="dinner-title">
      <div className="section-wrap">
        <div className="section-header">
          <div>
            <p className="section-kicker">{DINNER.scheduleNote}</p>
            <h2 className="section-title" id="dinner-title">
              Dinner <em>Menu</em>
            </h2>
          </div>
          <p className="section-note">
            {DINNER.includesNote}
            <br />
            Call ahead for large orders: {SITE.phone}
          </p>
        </div>

        <div className="dinner-grid">
          {DINNER.days.map(({ day, items }) => (
            <article className="dinner-day" key={day}>
              <header className="dinner-day-head">
                <h3 className="dinner-day-name">{day}</h3>
                <span className="dinner-day-rule" aria-hidden="true" />
              </header>
              <dl className="dinner-items">
                {items.map((it) => (
                  <div className="dinner-row" key={it.name}>
                    <dt className="dinner-row-name">{it.name}</dt>
                    <dd className="dinner-row-price">{it.price}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <aside className="sides-strip" aria-label="Side dishes">
          <p className="sides-strip-label">Sides available every evening</p>
          <ul className="sides-strip-tags">
            {DINNER.sides.map((s) => (
              <li className="sides-tag" key={s}>{s}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
