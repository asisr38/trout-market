import type { CSSProperties } from "react";
import type { MenuItem } from "@/lib/tv-menu";

/**
 * Bold price card — used by the Pieces grid and the Combos row. `featured`
 * adds the accent border + glow; `badge` renders the green pill on top.
 * `index` drives the staggered entrance animation (--i).
 */
export function PriceCard({
  label,
  price,
  unit,
  desc,
  badge,
  featured = false,
  index = 0,
}: MenuItem & { featured?: boolean; index?: number }) {
  return (
    <div
      className={"price-card" + (featured ? " price-card--featured" : "")}
      style={{ "--i": index } as CSSProperties}
    >
      {badge ? <span className="price-card__badge">{badge}</span> : null}
      <span className="price-card__label">{label}</span>
      <span className="price-card__price">
        {price}
        {unit ? <em className="price-card__unit">{unit}</em> : null}
      </span>
      {desc ? <span className="price-card__desc">{desc}</span> : null}
    </div>
  );
}
