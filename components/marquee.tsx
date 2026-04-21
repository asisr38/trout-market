const ITEMS = [
  "Fresh Blue Crab",
  "Fried Chicken",
  "Deli Platters",
  "Jumbo Shrimp",
  "Crab Cakes",
  "Catering Available",
  "Open 7 Days",
  "Curbside Pickup",
  "Frederick County's Market Since 1994",
];

function Track() {
  return (
    <div className="marquee-item" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {item}
          <span className="marquee-dot" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-strip" role="marquee" aria-label="Highlights">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
