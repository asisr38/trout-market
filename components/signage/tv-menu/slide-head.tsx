import type { CSSProperties } from "react";

/** Shared slide header: big display title + subtitle (plain or green pill). */
export function SlideHead({
  title,
  subtitle,
  pill = false,
}: {
  title: string;
  subtitle?: string;
  pill?: boolean;
}) {
  return (
    <div className="slide-head">
      <h2 className="slide-head__title anim">{title}</h2>
      {subtitle ? (
        <span
          className={"slide-head__sub anim" + (pill ? " slide-head__sub--pill" : "")}
          style={{ "--i": 1 } as CSSProperties}
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}
