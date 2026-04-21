import Image from "next/image";
import { SITE } from "@/lib/site";

const STATS = [
  ["30+", "Years serving Frederick County"],
  ["7", "Days open, every single week"],
  ["1994", "Founded in Woodsboro, MD"],
  ["#1", "Place for fresh crab in town"],
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="section-wrap">
        <div className="about-layout">
          <figure className="about-img">
            <Image
              src="/buildingFront.webp"
              alt={`${SITE.name} storefront on ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}`}
              fill
              sizes="(max-width:960px) 100vw, 50vw"
              quality={85}
              style={{ objectFit: "cover" }}
            />
          </figure>
          <div>
            <div className="about-rule" aria-hidden="true" />
            <h2 className="about-h2" id="about-title">
              A local<br />institution<br /><em>since 1994.</em>
            </h2>
            <p className="about-body">
              Trout&apos;s has been serving all of Frederick County from our little corner of Woodsboro for over three decades. We&apos;re proud to offer the freshest seafood, a full-service deli, and everyday groceries under one roof — along with the legendary fried chicken that keeps customers coming back every week, year after year.
            </p>
            <dl className="about-stats">
              {STATS.map(([num, label]) => (
                <div key={label}>
                  <dt className="stat-item-num">{num}</dt>
                  <dd className="stat-item-label">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
