"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITE } from "@/lib/site";

type Theme = "dark" | "light";

const TILES: Record<Theme, string> = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
};

const goldIcon = L.divIcon({
  className: "trouts-marker",
  html: `<span style="
    display:block;width:22px;height:22px;border-radius:50%;
    background:#C9A84C;border:2px solid #0C0B09;
    box-shadow:0 0 0 4px rgba(201,168,76,0.25),0 4px 12px rgba(0,0,0,0.5);
  "></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
});

function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return (document.documentElement.dataset.theme as Theme) || "dark";
  });

  useEffect(() => {
    const el = document.documentElement;
    const read = () => {
      const t = (el.dataset.theme as Theme) || "dark";
      setTheme(t);
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return theme;
}

export default function Map() {
  const theme = useTheme();
  const pos: [number, number] = [SITE.geo.lat, SITE.geo.lng];
  const bg = theme === "light" ? "#F5F0E4" : "#0C0B09";
  return (
    <MapContainer
      center={pos}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: bg }}
      attributionControl={true}
    >
      <TileLayer
        key={theme}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={TILES[theme]}
      />
      <Marker position={pos} icon={goldIcon}>
        <Popup>
          <strong>{SITE.name}</strong>
          <br />
          {SITE.address.street}
          <br />
          {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
