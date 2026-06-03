import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { CHICKEN_BOARD, type BoardItem } from "@/lib/menu-board";

/** Section title lockup: small gold kicker over a large sage script title. */
function Lockup({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="board-lockup">
      {kicker && <span className="board-kicker">{kicker}</span>}
      <span className="board-title">{title}</span>
    </div>
  );
}

export function ChickenBoard() {
  const { tagline, pieces, individual, meals, combos, photo, photoCaption } =
    CHICKEN_BOARD;

  // Show the real photo only if it has been added; otherwise a branded panel.
  const photoExists =
    Boolean(photo) &&
    existsSync(path.join(process.cwd(), "public", photo.replace(/^\//, "")));

  return (
    <div className="board" role="presentation">
      <header className="board-head">
        <div className="board-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="board-brand-mark" />
          <span className="board-brand-text">
            <span className="board-brand-name">{SITE.name}</span>
            <span className="board-brand-sub">Hot Foods · Fried Daily</span>
          </span>
        </div>
        <p className="board-tagline">
          <span>{tagline.lead}</span>{" "}
          <em className="board-tagline-accent">{tagline.accent}</em>
        </p>
      </header>

      <main className="board-main">
        <figure className="board-photo">
          {photoExists ? (
            <Image
              src={photo}
              alt="Trout's Market fried chicken"
              fill
              sizes="34vw"
              className="board-photo-img"
              priority
            />
          ) : (
            <div className="board-photo-fallback" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.svg" alt="" className="board-photo-mark" />
              <p className="board-photo-script">
                Famous <em>Fried Chicken</em>
              </p>
            </div>
          )}
          <figcaption className="board-photo-cap">{photoCaption}</figcaption>
        </figure>

        <section className="board-pieces" aria-label="Chicken by the piece">
          <Lockup kicker={pieces.kicker} title={pieces.title} />
          <div className="pieces-grid">
            {pieces.items.map((it: BoardItem) => (
              <div className="piece-cell" key={it.label}>
                <span className="piece-label">{it.label}</span>
                <span className="piece-price">
                  {it.price}
                  {it.note && <span className="piece-note"> {it.note}</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="individual">
            <span className="individual-title">{individual.title}</span>
            <div className="individual-grid">
              {individual.items.map((it: BoardItem) => (
                <div className="ind-cell" key={it.label}>
                  <span className="ind-label">{it.label}</span>
                  <span className="ind-price">{it.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="board-meals" aria-label="Chicken meals">
          <div className="meals-head">
            <Lockup kicker={meals.kicker} title={meals.title} />
            <span className="meals-note">{meals.note}</span>
          </div>
          <ul className="meals-list">
            {meals.items.map((it: BoardItem) => (
              <li className="meal-row" key={it.label}>
                <span className="meal-name">{it.label}</span>
                <span className="meal-price">{it.price}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="board-combos" aria-label="Combo deals">
          <div className="combos-head">
            <span className="combos-kicker">Best Value</span>
            <span className="combos-title">{combos.title}</span>
          </div>
          <div className="combos-grid">
            {combos.items.map((it: BoardItem) => (
              <div className="combo-cell" key={it.label}>
                <span className="combo-label">{it.label}</span>
                <span className="combo-price">{it.price}</span>
                {it.note && <span className="combo-note">{it.note}</span>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="board-foot">
        <span className="board-foot-item">
          {SITE.address.city}, {SITE.address.region} · Since {SITE.founded}
        </span>
        <span className="board-foot-item board-foot-dot" aria-hidden="true" />
        <span className="board-foot-item">Call ahead · {SITE.phone}</span>
      </footer>
    </div>
  );
}
