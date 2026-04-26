"use client";
import { memo, useEffect, useRef, useState } from "react";
import MapView, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useT } from "../lang-context";
import {
  KMS_MAP_MARKERS_KEY,
  TACIT_MARKERS,
  TacitMarker,
  MarkerCategory,
  loadCustomMarkers,
  saveCustomMarkers,
} from "./markers";

// Static category config — labels translated dynamically in render via t.map.cats
const CAT_CONFIG: Record<MarkerCategory, { icon: string; color: string }> = {
  police:       { icon: "🚔", color: "#dc2626" },
  problem_zone: { icon: "⚠️",  color: "#f59e0b" },
  church:       { icon: "⛪", color: "#7c3aed" },
  traffic:      { icon: "📡", color: "#0891b2" },
  pickup:       { icon: "📍", color: "#16a34a" },
  fuel:         { icon: "⛽", color: "#ea580c" },
  landmark:     { icon: "🏛️", color: "#2563eb" },
};

const BASE_MARKER_IDS = new Set(TACIT_MARKERS.map(m => m.id));

const btn: React.CSSProperties = {
  padding: "7px 12px", borderRadius: 9, border: "1px solid #e2e8f0",
  background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600,
  whiteSpace: "nowrap" as const,
};

// ── Memoised pin ──────────────────────────────────────────────────────────────
const TacitPin = memo(function TacitPin({
  marker, onClick,
}: { marker: TacitMarker; onClick: (m: TacitMarker) => void }) {
  const cfg = CAT_CONFIG[marker.category];
  return (
    <Marker longitude={marker.lng} latitude={marker.lat} anchor="bottom"
      onClick={e => { e.originalEvent.stopPropagation(); onClick(marker); }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: "#fff",
        border: `2px solid ${cfg.color}`, display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", boxShadow: `0 2px 8px ${cfg.color}55`,
      }}>
        {cfg.icon}
      </div>
    </Marker>
  );
});

// ── Update note modal ─────────────────────────────────────────────────────────
function ReportModal({ marker, lang, onClose, onSave }: {
  marker: TacitMarker; lang: "en" | "am";
  onClose: () => void; onSave: (id: string, note: string) => void;
}) {
  const [note, setNote] = useState(marker[lang].tacitNote);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 520, padding: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>
          {lang === "en" ? "Update Tacit Note" : "ዘዴያዊ ማስታወሻ አዘምን"}
        </h3>
        <textarea rows={5} value={note} onChange={e => setNote(e.target.value)}
          style={{ width: "100%", borderRadius: 8, border: "1px solid #e2e8f0", padding: 10, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button style={btn} onClick={onClose}>{lang === "en" ? "Cancel" : "ሰርዝ"}</button>
          <button style={{ ...btn, background: "#0f172a", color: "#fff", border: "none" }}
            onClick={() => { onSave(marker.id, note); onClose(); }}>
            {lang === "en" ? "Save" : "አስቀምጥ"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add intelligence modal ────────────────────────────────────────────────────
function AddIntelligenceModal({ lang, coords, onClose, onSave }: {
  lang: "en" | "am"; coords: [number, number] | null;
  onClose: () => void; onSave: (m: TacitMarker) => void;
}) {
  const [category, setCategory] = useState<MarkerCategory>("problem_zone");
  const [enName, setEnName] = useState("");
  const [enNote, setEnNote] = useState("");
  const [amName, setAmName] = useState("");
  const [amNote, setAmNote] = useState("");
  const [reportedBy, setReportedBy] = useState("");

  if (!coords) return null;
  const canSave = (enName.trim() || amName.trim()) && (enNote.trim() || amNote.trim());

  const CAT_LABELS: Record<MarkerCategory, string> = {
    police:       lang === "en" ? "Police / Camera"  : "ፖሊስ / ካሜራ",
    problem_zone: lang === "en" ? "Problem Zone"     : "የችግር ዞን",
    church:       lang === "en" ? "Church"           : "ቤተ ክርስቲያን",
    traffic:      lang === "en" ? "GPS Dead Zone"    : "GPS የሚቋረጥበት ቦታ",
    pickup:       lang === "en" ? "Best Pickup"      : "ምርጥ ፒክ-አፕ",
    fuel:         lang === "en" ? "Fuel Station"     : "ነዳጅ ጣቢያ",
    landmark:     lang === "en" ? "Landmark"         : "አነቃፊ ቦታ",
  };

  function submit() {
    if (!canSave || !coords) return;
    onSave({
      id: `custom-${Date.now()}`,
      lng: coords[0], lat: coords[1], category,
      en: { name: enName.trim() || amName.trim(), tacitNote: enNote.trim() || amNote.trim() },
      am: { name: amName.trim() || enName.trim(), tacitNote: amNote.trim() || enNote.trim() },
      reportedBy: reportedBy.trim() || (lang === "en" ? "Staff" : "ሰራተኛ"),
      date: new Date().toISOString().slice(0, 10),
    });
    onClose();
  }

  const inp: React.CSSProperties = { border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", fontSize: 13, width: "100%", boxSizing: "border-box" as const, fontFamily: "inherit" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 560, padding: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>
            ➕ {lang === "en" ? "Add Intelligence" : "አዲስ መረጃ ጨምር"}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>
            📍 {coords[1].toFixed(5)}, {coords[0].toFixed(5)}
          </div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <select value={category} onChange={e => setCategory(e.target.value as MarkerCategory)} style={inp}>
            {(Object.keys(CAT_CONFIG) as MarkerCategory[]).map(cat => (
              <option key={cat} value={cat}>{CAT_CONFIG[cat].icon} {CAT_LABELS[cat]}</option>
            ))}
          </select>
          <input value={reportedBy} onChange={e => setReportedBy(e.target.value)}
            placeholder={lang === "en" ? "Reported by (your name)" : "ሪፖርት አቅራቢ (ስምዎ)"} style={inp} />
          <input value={enName} onChange={e => setEnName(e.target.value)}
            placeholder={lang === "en" ? "English title *" : "እንግሊዝኛ ርዕስ *"} style={inp} />
          <textarea rows={3} value={enNote} onChange={e => setEnNote(e.target.value)}
            placeholder={lang === "en" ? "English tacit note *" : "እንግሊዝኛ ዘዴያዊ ማስታወሻ *"} style={inp} />
          <input value={amName} onChange={e => setAmName(e.target.value)}
            placeholder={lang === "en" ? "Amharic title (አማርኛ ርዕስ)" : "አማርኛ ርዕስ"} style={inp} />
          <textarea rows={3} value={amNote} onChange={e => setAmNote(e.target.value)}
            placeholder={lang === "en" ? "Amharic tacit note (አማርኛ ማስታወሻ)" : "አማርኛ ዘዴያዊ ማስታወሻ"} style={inp} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button style={btn} onClick={onClose}>{lang === "en" ? "Cancel" : "ሰርዝ"}</button>
          <button style={{ ...btn, background: canSave ? "#fbbf24" : "#e2e8f0", color: canSave ? "#78350f" : "#94a3b8", border: "none", cursor: canSave ? "pointer" : "not-allowed" }}
            onClick={submit} disabled={!canSave}>
            {lang === "en" ? "Save Intelligence" : "መረጃ አስቀምጥ"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MapClient({ mode = "staff" }: { mode?: "staff" | "driver" }) {
  const { lang, t } = useT();
  const mapLang = lang as "en" | "am";
  const isStaff = mode === "staff";

  const [markers, setMarkers] = useState<TacitMarker[]>(TACIT_MARKERS);
  const [selected, setSelected] = useState<TacitMarker | null>(null);
  const [reportMarker, setReportMarker] = useState<TacitMarker | null>(null);
  const [filterCat, setFilterCat] = useState<MarkerCategory | "all">("all");
  const [viewState, setViewState] = useState({ longitude: 38.7636, latitude: 9.0227, zoom: 13 });
  const [addMode, setAddMode] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [carPos, setCarPos] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Category labels — translated
  const CAT_LABELS: Record<MarkerCategory, string> = {
    police:       t.map.cats.police,
    problem_zone: t.map.cats.problem_zone,
    church:       t.map.cats.church,
    traffic:      t.map.cats.traffic,
    pickup:       t.map.cats.pickup,
    fuel:         t.map.cats.fuel,
    landmark:     t.map.cats.landmark,
  };

  // Real GPS tracking
  useEffect(() => {
    if (!liveMode) {
      if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; }
      setCarPos(null); setAccuracy(null); setLocationError(null);
      return;
    }
    if (!navigator.geolocation) {
      setLocationError(t.map.noGeo);
      setLiveMode(false); return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      pos => {
        const lng = pos.coords.longitude; const lat = pos.coords.latitude;
        setCarPos([lng, lat]); setAccuracy(Math.round(pos.coords.accuracy));
        setViewState(v => ({ ...v, longitude: lng, latitude: lat }));
      },
      () => { setLocationError(t.map.noLocation); setLiveMode(false); },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );
    return () => { if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; } };
  }, [liveMode, t.map.noGeo, t.map.noLocation]);

  // Load custom markers
  useEffect(() => {
    const custom = loadCustomMarkers();
    if (!custom.length) return;
    const byId = new Map<string, TacitMarker>();
    [...TACIT_MARKERS, ...custom].forEach(m => byId.set(m.id, m));
    setMarkers(Array.from(byId.values()));
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KMS_MAP_MARKERS_KEY) return;
      const custom = loadCustomMarkers();
      const byId = new Map<string, TacitMarker>();
      [...TACIT_MARKERS, ...custom].forEach(m => byId.set(m.id, m));
      setMarkers(Array.from(byId.values()));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function persistCustom(all: TacitMarker[]) {
    saveCustomMarkers(all.filter(m => !BASE_MARKER_IDS.has(m.id)));
  }

  function handleSaveNote(id: string, note: string) {
    setMarkers(prev => { const next = prev.map(m => m.id === id ? { ...m, [mapLang]: { ...m[mapLang], tacitNote: note } } : m); persistCustom(next); return next; });
  }

  function handleAddMarker(marker: TacitMarker) {
    setMarkers(prev => { const next = [...prev, marker]; persistCustom(next); return next; });
  }

  function handleRecenter() {
    if (carPos) { setViewState(v => ({ ...v, longitude: carPos[0], latitude: carPos[1], zoom: Math.max(v.zoom, 14) })); return; }
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => setViewState(v => ({ ...v, longitude: pos.coords.longitude, latitude: pos.coords.latitude, zoom: Math.max(v.zoom, 14) })));
  }

  const filtered = filterCat === "all" ? markers : markers.filter(m => m.category === filterCat);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Staff-only header */}
      {isStaff && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
              🧠 {t.map.title}
            </h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>{t.map.staffMode}</p>
          </div>
          <button style={{ ...btn, background: addMode ? "#f59e0b" : "#0f172a", color: "#fff", border: "none", padding: "9px 16px" }}
            onClick={() => setAddMode(v => !v)}>
            {addMode ? t.map.addBtnActive : t.map.addBtn}
          </button>
        </div>
      )}

      {/* Status banners */}
      {locationError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#dc2626" }}>
          ⚠️ {locationError}
        </div>
      )}
      {liveMode && carPos && accuracy !== null && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#16a34a" }}>
          📡 {t.map.tracking} ±{accuracy}m
        </div>
      )}
      {liveMode && !carPos && !locationError && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#92400e" }}>
          ⏳ {t.map.waiting}
        </div>
      )}

      {/* Filter pills + Live + Recenter — all in one row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={() => setFilterCat("all")} style={{ ...btn, background: filterCat === "all" ? "#0f172a" : "#fff", color: filterCat === "all" ? "#fff" : "#0f172a", border: filterCat === "all" ? "none" : "1px solid #e2e8f0" }}>
          {t.map.allFilter}
        </button>
        {(Object.keys(CAT_CONFIG) as MarkerCategory[]).map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} style={{ ...btn, background: filterCat === cat ? "#0f172a" : "#fff", color: filterCat === cat ? "#fff" : "#0f172a", border: filterCat === cat ? "none" : "1px solid #e2e8f0" }}>
            {CAT_CONFIG[cat].icon} {CAT_LABELS[cat]}
          </button>
        ))}
        <div style={{ width: 1, height: 24, background: "#e2e8f0", margin: "0 4px" }} />
        <button style={{ ...btn, background: liveMode ? "#16a34a" : "#fff", color: liveMode ? "#fff" : "#0f172a", border: liveMode ? "none" : "1px solid #e2e8f0" }}
          onClick={() => setLiveMode(v => !v)}>
          📡 {liveMode ? t.map.liveOn : t.map.liveTracking}
        </button>
        <button style={btn} onClick={handleRecenter}>
          🎯 {t.map.recenter}
        </button>
      </div>

      {/* Map */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", position: "relative", height: 520 }}>
        <MapView
          {...viewState}
          onMove={e => setViewState(e.viewState)}
          onClick={e => {
            if (!isStaff || !addMode) return;
            setPendingCoords([e.lngLat.lng, e.lngLat.lat]);
            setShowAddModal(true);
            setAddMode(false);
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          cursor={isStaff && addMode ? "crosshair" : "grab"}
        >
          <NavigationControl position="top-right" />
          {filtered.map(m => <TacitPin key={m.id} marker={m} onClick={setSelected} />)}
          {carPos && (
            <Marker longitude={carPos[0]} latitude={carPos[1]} anchor="center">
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#15803d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 0 0 8px rgba(22,163,74,0.2)" }}>🚗</div>
            </Marker>
          )}
          {selected && (
            <Popup longitude={selected.lng} latitude={selected.lat} anchor="bottom"
              onClose={() => setSelected(null)} closeButton={false} maxWidth="300px">
              <div style={{ minWidth: 240, padding: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>{CAT_CONFIG[selected.category].icon}</span>
                      <span style={{ background: CAT_CONFIG[selected.category].color + "18", color: CAT_CONFIG[selected.category].color, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
                        {CAT_LABELS[selected.category]}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", lineHeight: 1.3 }}>{selected[mapLang].name}</div>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 6, width: 22, height: 22, cursor: "pointer", fontSize: 13, color: "#64748b", marginLeft: 8, flexShrink: 0 }}>×</button>
                </div>
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "9px 11px", marginBottom: 9 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", marginBottom: 3, textTransform: "uppercase" }}>
                    💡 {t.map.tacitNote}
                  </div>
                  <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6 }}>{selected[mapLang].tacitNote}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isStaff ? 9 : 0 }}>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>
                    {t.map.by}: <strong style={{ color: "#64748b" }}>{selected.reportedBy}</strong>
                  </span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{selected.date}</span>
                </div>
                {isStaff && (
                  <button onClick={() => { setReportMarker(selected); setSelected(null); }}
                    style={{ ...btn, width: "100%", textAlign: "center" }}>
                    ✏️ {t.map.reportBtn}
                  </button>
                )}
              </div>
            </Popup>
          )}
        </MapView>

        {liveMode && carPos && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, background: "rgba(22,163,74,0.92)", color: "#fff", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, pointerEvents: "none" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
            {t.map.liveLabel}
          </div>
        )}
        {isStaff && addMode && (
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", zIndex: 10, background: "rgba(245,158,11,0.95)", color: "#fff", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, pointerEvents: "none" }}>
            {t.map.addBtnActive}
          </div>
        )}
        <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 10, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "8px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #f1f5f9", display: "flex", gap: 16, pointerEvents: "none" }}>
          {[
            { label: t.map.markers, value: markers.length, color: "#2563eb" },
            { label: t.map.warnings, value: markers.filter(m => m.category === "problem_zone" || m.category === "police").length, color: "#dc2626" },
            { label: t.map.pickups, value: markers.filter(m => m.category === "pickup").length, color: "#16a34a" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {isStaff && reportMarker && (
        <ReportModal marker={reportMarker} lang={mapLang} onClose={() => setReportMarker(null)} onSave={handleSaveNote} />
      )}
      {isStaff && showAddModal && (
        <AddIntelligenceModal lang={mapLang} coords={pendingCoords}
          onClose={() => { setShowAddModal(false); setPendingCoords(null); }}
          onSave={handleAddMarker} />
      )}

      <style>{`
        .maplibregl-popup-content { border-radius: 12px !important; padding: 12px !important; box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; border: 1px solid #f1f5f9 !important; }
        .maplibregl-popup-tip { display: none !important; }
      `}</style>
    </div>
  );
}
