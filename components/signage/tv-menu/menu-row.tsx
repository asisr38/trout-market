import type { CSSProperties } from "react";
import type { MenuItem } from "@/lib/tv-menu";

/** Label + dotted leader + right-aligned price. Used by Meals & Individual. */
export function MenuRow({
  label,
  price,
  index = 0,
}: MenuItem & { index?: number }) {
  return (
    <div className="menu-row" style={{ "--i": index } as CSSProperties}>
      <span className="menu-row__label">{label}</span>
      <span className="menu-row__dots" aria-hidden="true" />
      <span className="menu-row__price">{price}</span>
    </div>
  );
}
