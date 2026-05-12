"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { PolygonLayer } from "@deck.gl/layers";

interface FacilityMarker {
  name: string;
  lat: number;
  lng: number;
  heading?: number;
  type?: "church";
  width?: number;
  height?: number;
  elevation?: number;
}

interface SatelliteMapProps {
  lat: number;
  lng: number;
  zoom: number;
  markers?: FacilityMarker[];
}

function rectAround(lat: number, lng: number, widthMeters: number, heightMeters: number): [number, number][] {
  const dLat = heightMeters / 2 / 111320;
  const dLng = widthMeters / 2 / (111320 * Math.cos((lat * Math.PI) / 180));
  return [
    [lng - dLng, lat - dLat],
    [lng + dLng, lat - dLat],
    [lng + dLng, lat + dLat],
    [lng - dLng, lat + dLat],
    [lng - dLng, lat - dLat],
  ];
}

export default function SatelliteMap({ lat, lng, zoom, markers = [] }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [missingToken, setMissingToken] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<FacilityMarker | null>(null);
  const apiKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey) {
      setMissingToken(true);
      return;
    }
    apiKeyRef.current = apiKey;

    setOptions({ key: apiKey, v: "weekly" });

    let cancelled = false;

    Promise.all([importLibrary("maps"), importLibrary("marker")])
      .then(([{ Map }, { AdvancedMarkerElement }]) => {
        if (cancelled || !containerRef.current) return;

        const map = new Map(containerRef.current, {
          center: { lat, lng },
          zoom,
          mapTypeId: "satellite",
          tilt: 45,
          heading: 0,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          rotateControl: true,
          scrollwheel: false,
          gestureHandling: "cooperative",
        });

        map.setTilt(45);
        map.setHeading(0);
        mapRef.current = map;

        const buildingLayer = new PolygonLayer({
          id: "buildings",
          data: markers.map((m) => ({
            ...m,
            polygon: rectAround(m.lat, m.lng, m.width ?? 18, m.height ?? 22),
            elevation: m.elevation ?? (m.type === "church" ? 14 : 10),
            color: m.type === "church" ? [232, 200, 130] : [220, 220, 220],
          })),
          getPolygon: (d) => d.polygon,
          getElevation: (d) => d.elevation,
          getFillColor: (d) => [...d.color, 220],
          getLineColor: [40, 40, 40, 255],
          extruded: true,
          wireframe: true,
          lineWidthMinPixels: 1,
          pickable: true,
          onClick: (info) => {
            if (info.object) setSelected(info.object);
          },
        });

        const overlay = new GoogleMapsOverlay({ layers: [buildingLayer] });
        overlay.setMap(map);

        for (const m of markers) {
          const labelHtml =
            m.type === "church"
              ? `<div style="display:flex;flex-direction:column;align-items:center;">
                  <svg width="36" height="42" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));margin-bottom:4px;">
                    <rect x="22" y="2" width="4" height="14" fill="#fbbf24" />
                    <rect x="18" y="6" width="12" height="4" fill="#fbbf24" />
                  </svg>
                  <span style="background:rgba(0,0,0,0.75);color:#fff;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;padding:4px 10px;border-radius:9999px;border:1px solid rgba(255,255,255,0.25);white-space:nowrap;">${m.name}</span>
                </div>`
              : `<span style="background:rgba(0,0,0,0.75);color:#fff;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;padding:4px 10px;border-radius:9999px;border:1px solid rgba(255,255,255,0.25);white-space:nowrap;display:inline-block;">${m.name}</span>`;

          const marker = new AdvancedMarkerElement({
            position: { lat: m.lat, lng: m.lng },
            map,
            content: htmlToElement(labelHtml),
            title: m.name,
          });

          marker.addListener("click", () => setSelected(m));
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err?.message ?? "Failed to load Google Maps");
      });

    return () => {
      cancelled = true;
      mapRef.current = null;
    };
  }, [lat, lng, zoom, markers]);

  if (missingToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <div>
          <p className="font-medium">Google Maps key missing</p>
          <p className="mt-1">
            Add <code className="rounded bg-muted px-1.5 py-0.5">NEXT_PUBLIC_GOOGLE_MAPS_KEY</code> to <code className="rounded bg-muted px-1.5 py-0.5">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <div>
          <p className="font-medium">Google Maps failed to load</p>
          <p className="mt-1">{loadError}</p>
        </div>
      </div>
    );
  }

  const apiKey = apiKeyRef.current;
  const streetViewUrl =
    selected && apiKey
      ? `https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${selected.lat},${selected.lng}&heading=${selected.heading ?? 0}&pitch=10&fov=80&key=${apiKey}`
      : null;

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      {selected && streetViewUrl && (
        <div className="absolute right-4 top-4 z-10 w-64 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          <button
            onClick={() => setSelected(null)}
            className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            aria-label="Close"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={streetViewUrl} alt={selected.name} className="block w-full" />
          <div className="px-3 py-2 text-sm font-semibold">{selected.name}</div>
        </div>
      )}
    </>
  );
}

function htmlToElement(html: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild as HTMLElement;
}
