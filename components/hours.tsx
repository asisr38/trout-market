"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SITE } from "@/lib/site";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <span>Loading map…</span>
    </div>
  ),
});

export default function Hours() {
  const [todayIdx, setTodayIdx] = useState<number | null>(null);

  useEffect(() => {
    const d = new Date().getDay();
    setTodayIdx(d === 0 ? 6 : d - 1);
  }, []);

  return (
    <section id="hours" aria-labelledby="hours-title">
      <div className="section-wrap">
        <div className="section-header">
          <div>
            <p className="section-kicker">Open Every Day</p>
            <h2 className="section-title" id="hours-title">
              Hours &amp; <em>Location</em>
            </h2>
          </div>
        </div>
        <div className="hours-layout">
          <dl className="hours-table">
            {SITE.hours.map(([day, time], i) => {
              const isToday = i === todayIdx;
              return (
                <div className={`hours-row${isToday ? " today" : ""}`} key={day}>
                  <dt className="hours-day">
                    {isToday && <span className="today-dot" aria-hidden="true" />} {day}
                    {isToday && " — Today"}
                  </dt>
                  <dd className="hours-time">
                    <time>{time}</time>
                  </dd>
                </div>
              );
            })}
          </dl>
          <div>
            <div className="map-frame" aria-label={`Map showing ${SITE.name} location`}>
              <Map />
            </div>
            <address className="map-address" style={{ fontStyle: "normal" }}>
              <div>
                <div className="map-addr-name">{SITE.address.street.replace(" Street", " St")}</div>
                <div className="map-addr-sub">
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${SITE.address.street}, ${SITE.address.city} ${SITE.address.region} ${SITE.address.postal}`,
                )}`}
                className="btn-outline-cream btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions →
              </a>
            </address>
            <aside className="curbside-box" aria-label="Curbside service">
              <h3 className="curbside-box-title">Curbside Service</h3>
              <p className="curbside-box-body">
                Available Monday–Friday, 7am–5pm. Send your order by email and we&apos;ll have it ready at the door.
              </p>
              <a className="curbside-box-email" href={`mailto:${SITE.curbsideEmail}`}>
                {SITE.curbsideEmail}
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
