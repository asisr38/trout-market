import Image from "next/image";
import type { CSSProperties } from "react";
import type { Slide } from "@/lib/tv-menu";
import { PriceCard } from "./price-card";
import { MenuRow } from "./menu-row";
import { SlideHead } from "./slide-head";

/** Brand wordmark — kept top-left on every slide. */
export function Brandmark() {
  return (
    <div className="brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" className="brand__mark" />
      <span className="brand__name">
        Trout&rsquo;s <em>Market</em>
      </span>
    </div>
  );
}

export function FooterLine({ text }: { text: string }) {
  return <div className="footer-line">{text}</div>;
}

/** Photo with branded fallback (shared by Hero + Individual media slots). */
function MediaPhoto({ imageSrc }: { imageSrc: string | null }) {
  if (imageSrc) {
    return (
      <div className="hero__img">
        <Image src={imageSrc} alt="Trout's Market fried chicken" fill sizes="50vw" priority />
      </div>
    );
  }
  return (
    <div className="hero__fallback">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" />
      <p>
        Famous <em>Fried Chicken</em>
      </p>
    </div>
  );
}

type HeroData = Extract<Slide, { type: "hero" }>;
type PiecesData = Extract<Slide, { type: "pieces" }>;
type MealsData = Extract<Slide, { type: "meals" }>;
type CombosData = Extract<Slide, { type: "combos" }>;
type IndividualData = Extract<Slide, { type: "individual" }>;

function HeroSlide({ data, imageSrc }: { data: HeroData; imageSrc: string | null }) {
  return (
    <div className="slide-inner tv-hero">
      <div className="hero__copy">
        <span className="hero__badge anim">{data.badge}</span>
        <h1 className="hero__headline">
          {data.headline.map((word, i) => (
            <span className="hero__word anim" style={{ "--i": i } as CSSProperties} key={i}>
              {word}
            </span>
          ))}
        </h1>
        <p className="hero__subhead anim" style={{ "--i": 3 } as CSSProperties}>
          {data.subhead}
        </p>
        <span className="hero__rule anim" style={{ "--i": 4 } as CSSProperties} />
      </div>
      <div className="hero__media anim" style={{ "--i": 2 } as CSSProperties}>
        <div className="hero__glow" aria-hidden="true" />
        <MediaPhoto imageSrc={imageSrc} />
      </div>
    </div>
  );
}

function PiecesSlide({ data }: { data: PiecesData }) {
  return (
    <div className="slide-inner stack">
      <SlideHead title={data.title} subtitle={data.subtitle} />
      <div className="pieces-grid">
        {data.items.map((it, i) => (
          <PriceCard key={i} index={i} {...it} featured={it.label === data.featuredLabel} />
        ))}
      </div>
    </div>
  );
}

function MealsSlide({ data }: { data: MealsData }) {
  const mid = Math.ceil(data.items.length / 2);
  const cols = [data.items.slice(0, mid), data.items.slice(mid)];
  return (
    <div className="slide-inner stack">
      <SlideHead title={data.title} subtitle={data.subtitle} pill />
      <div className="meals-cols">
        {cols.map((col, c) => (
          <div className="meals-col" key={c}>
            {col.map((it, i) => (
              <MenuRow key={i} index={c * mid + i} {...it} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CombosSlide({ data }: { data: CombosData }) {
  return (
    <div className="slide-inner stack">
      <SlideHead title={data.title} subtitle={data.subtitle} />
      <div className="combos-row">
        {data.items.map((it, i) => (
          <PriceCard key={i} index={i} {...it} featured={!!it.badge} />
        ))}
      </div>
    </div>
  );
}

function IndividualSlide({
  data,
  imageSrc,
}: {
  data: IndividualData;
  imageSrc: string | null;
}) {
  return (
    <div className="slide-inner individual">
      <div className="individual__copy">
        <SlideHead title={data.title} subtitle={data.subtitle} />
        <div className="individual__rows">
          {data.items.map((it, i) => (
            <MenuRow key={i} index={i} {...it} />
          ))}
        </div>
      </div>
      <div className="individual__media anim" style={{ "--i": 1 } as CSSProperties}>
        <div className="hero__glow" aria-hidden="true" />
        <MediaPhoto imageSrc={imageSrc} />
      </div>
    </div>
  );
}

/** Positioned, cross-fading slide wrapper (brand + body + footer). */
export function MenuSlide({
  data,
  active,
  footer,
  imageSrc,
}: {
  data: Slide;
  active: boolean;
  footer: string;
  imageSrc: string | null;
}) {
  return (
    <section
      className={"slide" + (active ? " is-active" : "")}
      aria-hidden={!active}
    >
      <Brandmark />
      <div className="slide-body">
        {data.type === "hero" && <HeroSlide data={data} imageSrc={imageSrc} />}
        {data.type === "pieces" && <PiecesSlide data={data} />}
        {data.type === "meals" && <MealsSlide data={data} />}
        {data.type === "combos" && <CombosSlide data={data} />}
        {data.type === "individual" && (
          <IndividualSlide data={data} imageSrc={imageSrc} />
        )}
      </div>
      <FooterLine text={footer} />
    </section>
  );
}

/* ProgressBar follows. */

/** Bottom progress — one segment per slide; the current segment fills. */
export function ProgressBar({
  count,
  current,
  seconds,
}: {
  count: number;
  current: number;
  seconds: number;
}) {
  return (
    <div className="progress" role="presentation">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={
            "progress__seg" +
            (i === current ? " is-current" : "") +
            (i < current ? " is-done" : "")
          }
        >
          <span
            className="progress__fill"
            style={i === current ? { animationDuration: seconds + "s" } : undefined}
          />
        </span>
      ))}
    </div>
  );
}
