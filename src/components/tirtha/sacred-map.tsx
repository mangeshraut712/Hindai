"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { MapMarker, SacredTradition } from "@/lib/data/sacred-geography";
import { GEOGRAPHY_AUDIT_NOTE, projectSouthAsia } from "@/lib/data/sacred-geography";
import {
  MAP_VIEW,
  SOUTH_ASIA_LAND_PATH,
  SOUTH_ASIA_NEIGHBORS_PATH,
} from "@/lib/data/south-asia-basemap";
import { STORY_TRAILS, markersForTradition, trailMarkers } from "@/lib/data/tirtha-map";

const TRADITION_FILTERS: Array<{ id: SacredTradition | "all"; label: string }> = [
  { id: "all", label: "All gods" },
  { id: "shaiva", label: "Shiva" },
  { id: "shakta", label: "Devi" },
  { id: "vaishnava", label: "Vishnu" },
  { id: "ganapatya", label: "Ganesha" },
];

const FULL_VIEW = `0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`;

/** True GPS projection — no tradition-based fake offsets. */
function geoPoint(marker: MapMarker): { x: number; y: number } {
  return projectSouthAsia(marker);
}

/**
 * When two living temples share a complex (Puri/Vimala, Kashi/Vishalakshi,
 * Rameswaram Shaiva+Vaishnava), nudge a few tenths of a map unit so both stay clickable
 * without leaving the shrine locality.
 */
function placeMarkers(markers: MapMarker[]): Array<MapMarker & { x: number; y: number }> {
  const placed: Array<MapMarker & { x: number; y: number }> = [];
  for (const marker of markers) {
    const base = geoPoint(marker);
    let { x, y } = base;
    let collisions = 0;
    for (const other of placed) {
      const dx = other.x - x;
      const dy = other.y - y;
      if (dx * dx + dy * dy < 1.35 * 1.35) {
        collisions += 1;
      }
    }
    if (collisions > 0) {
      const angle = collisions * 2.1;
      x += Math.cos(angle) * 1.05 * collisions;
      y += Math.sin(angle) * 1.05 * collisions;
    }
    placed.push({ ...marker, x, y });
  }
  return placed;
}

function viewBoxForMarkers(markers: Array<{ x: number; y: number }>): string {
  if (markers.length === 0) {
    return FULL_VIEW;
  }
  const xs = markers.map((point) => point.x);
  const ys = markers.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = Math.max(maxX - minX, 10);
  const height = Math.max(maxY - minY, 10);
  const pad = Math.max(width, height) * 0.38 + 5;
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const w = Math.min(MAP_VIEW.width - x, width + pad * 2);
  const h = Math.min(MAP_VIEW.height - y, height + pad * 2);
  return `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
}

function pinFill(tradition: SacredTradition): string {
  switch (tradition) {
    case "shaiva":
      return "#f59e0b";
    case "shakta":
      return "#fb7185";
    case "vaishnava":
      return "#60a5fa";
    case "ganapatya":
      return "#fbbf24";
    default: {
      const _exhaustive: never = tradition;
      return _exhaustive;
    }
  }
}

export function SacredMap({
  tradition = "all",
  highlightId,
  showFilters = true,
}: {
  tradition?: SacredTradition | "all";
  highlightId?: string;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<SacredTradition | "all">(tradition);
  const [trailId, setTrailId] = useState<string>("");
  const [activeId, setActiveId] = useState<string>(highlightId ?? "");

  const markers = useMemo(() => {
    return trailId ? trailMarkers(trailId) : markersForTradition(filter);
  }, [filter, trailId]);

  const placed = useMemo(() => placeMarkers(markers), [markers]);

  useEffect(() => {
    if (highlightId) {
      setActiveId(highlightId);
      return;
    }
    if (!markers.some((item) => item.id === activeId)) {
      setActiveId(markers[0]?.id ?? "");
    }
  }, [markers, activeId, highlightId]);

  const active = markers.find((item) => item.id === activeId) ?? markers[0];
  const activeTrail = STORY_TRAILS.find((item) => item.id === trailId);
  const mapViewBox = trailId ? viewBoxForMarkers(placed) : FULL_VIEW;
  const viewWidth = Number(mapViewBox.split(" ")[2] ?? String(MAP_VIEW.width));
  const pinScale = Math.min(1.6, Math.max(0.32, viewWidth / MAP_VIEW.width));
  const line = placed.map((item) => `${item.x},${item.y}`).join(" ");

  return (
    <div className="tirtha-map-shell">
      {showFilters ? (
        <div className="mb-5 space-y-3">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Tradition
            </p>
            <div className="flex flex-wrap gap-2">
              {TRADITION_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`rounded-full border px-3 py-2 text-sm ${
                    filter === item.id && !trailId
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                  onClick={() => {
                    setFilter(item.id);
                    setTrailId("");
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Story trail
            </p>
            <div className="flex flex-wrap gap-2">
              {STORY_TRAILS.map((trail) => (
                <button
                  key={trail.id}
                  type="button"
                  className={`rounded-full border px-3 py-2 text-sm ${
                    trailId === trail.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                  onClick={() => {
                    setTrailId(trail.id);
                    setFilter(trail.tradition);
                  }}
                >
                  {trail.title}
                </button>
              ))}
            </div>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: pinFill("shaiva") }} />
              Shiva
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: pinFill("shakta") }} />
              Devi
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ background: pinFill("vaishnava") }}
              />
              Vishnu
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ background: pinFill("ganapatya") }}
              />
              Ganesha
            </li>
          </ul>
        </div>
      ) : null}

      {activeTrail ? (
        <p className="mb-4 max-w-3xl text-sm leading-6 text-muted-foreground">{activeTrail.note}</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.85fr)]">
        <div className="tirtha-map-stage">
          <svg
            viewBox={mapViewBox}
            className="tirtha-map"
            role="img"
            aria-label="South Asia sacred geography map with living temple coordinates"
          >
            <defs>
              <linearGradient id="tirtha-sea" x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" className="tirtha-sea-stop-a" />
                <stop offset="100%" className="tirtha-sea-stop-b" />
              </linearGradient>
              <clipPath id="tirtha-frame">
                <rect x="0" y="0" width={MAP_VIEW.width} height={MAP_VIEW.height} />
              </clipPath>
            </defs>
            <g clipPath="url(#tirtha-frame)">
              <rect width={MAP_VIEW.width} height={MAP_VIEW.height} fill="url(#tirtha-sea)" />
              <path className="tirtha-map-neighbors" d={SOUTH_ASIA_NEIGHBORS_PATH} />
              <path className="tirtha-map-land" d={SOUTH_ASIA_LAND_PATH} />
              <text className="tirtha-map-label" x="18" y="72">
                Arabian Sea
              </text>
              <text className="tirtha-map-label" x="88" y="68">
                Bay of Bengal
              </text>
              <text className="tirtha-map-label" x="52" y="14">
                Himalaya
              </text>
              {trailId && line ? (
                <polyline
                  className="tirtha-map-trail"
                  points={line}
                  fill="none"
                  strokeWidth={0.55 * pinScale}
                />
              ) : null}
              {placed.map((marker, index) => {
                const selected = active?.id === marker.id;
                return (
                  <g key={marker.id}>
                    {selected ? (
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r={4 * pinScale}
                        fill="none"
                        stroke={pinFill(marker.tradition)}
                        strokeOpacity={0.4}
                        strokeWidth={0.7 * pinScale}
                      />
                    ) : null}
                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r={(selected ? 2.4 : 1.55) * pinScale}
                      fill={pinFill(marker.tradition)}
                      stroke="hsl(var(--background))"
                      strokeWidth={0.35 * pinScale}
                      className="tirtha-map-pin"
                      role="button"
                      tabIndex={0}
                      aria-label={`${marker.name}, ${marker.locationLabel}`}
                      onClick={() => setActiveId(marker.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveId(marker.id);
                        }
                      }}
                    />
                    {trailId ? (
                      <text
                        x={marker.x + 2.1 * pinScale}
                        y={marker.y - 1.5 * pinScale}
                        className="tirtha-map-num"
                        style={{ fontSize: `${2.4 * pinScale}px` }}
                      >
                        {index + 1}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </g>
          </svg>
          <p className="tirtha-map-count">
            {markers.length} place{markers.length === 1 ? "" : "s"} · Natural Earth coastline ·
            shrine GPS
          </p>
        </div>

        <aside className="surface-panel rounded-2xl p-5">
          {active ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {active.tradition} · {active.kind}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">{active.name}</h3>
              <p className="font-devanagari text-primary">{active.sanskrit}</p>
              <p className="mt-2 text-sm text-muted-foreground">{active.locationLabel}</p>
              <p className="mt-1 text-[11px] tabular-nums text-muted-foreground">
                {active.lat.toFixed(3)}°N, {active.lng.toFixed(3)}°E
              </p>
              {active.listStatus === "major-yatra" ? (
                <p className="mt-3 text-xs text-amber-800 dark:text-amber-200">
                  Living yatra — not counted as a secure Puranic peetha here
                </p>
              ) : null}
              {active.listStatus === "peetha-disputed" ? (
                <p className="mt-3 text-xs text-amber-800 dark:text-amber-200">
                  List assignment is disputed; the pin is the living temple
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-foreground/90">{active.storyBeat}</p>
              <Link
                href={active.href}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                data-testid="tirtha-open-place"
              >
                Open the place page →
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Choose a pin.</p>
          )}
          <p className="mt-6 text-xs leading-5 text-muted-foreground">{GEOGRAPHY_AUDIT_NOTE}</p>
        </aside>
      </div>
    </div>
  );
}

export function MiniPlaceMap({ marker }: { marker: MapMarker }) {
  const { x, y } = geoPoint(marker);
  const pad = 14;
  const left = Math.max(0, x - pad);
  const top = Math.max(0, y - pad);
  const view = `${left} ${top} ${pad * 2} ${pad * 2}`;
  return (
    <svg viewBox={view} className="tirtha-map tirtha-map-mini" aria-hidden="true">
      <rect x={left} y={top} width={pad * 2} height={pad * 2} className="tirtha-map-sea" />
      <path className="tirtha-map-neighbors" d={SOUTH_ASIA_NEIGHBORS_PATH} />
      <path className="tirtha-map-land" d={SOUTH_ASIA_LAND_PATH} />
      <circle
        cx={x}
        cy={y}
        r={2.8}
        fill={pinFill(marker.tradition)}
        stroke="hsl(var(--background))"
        strokeWidth={0.4}
      />
    </svg>
  );
}
