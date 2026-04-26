export type MarkerCategory =
  | "problem_zone"
  | "landmark"
  | "church"
  | "police"
  | "traffic"
  | "pickup"
  | "fuel";

export interface TacitMarker {
  id: string;
  lng: number;
  lat: number;
  category: MarkerCategory;
  en: {
    name: string;
    tacitNote: string;
  };
  am: {
    name: string;
    tacitNote: string;
  };
  reportedBy: string;
  date: string;
}

export const TACIT_MARKERS: TacitMarker[] = [
  {
    id: "m1",
    lng: 38.7636,
    lat: 9.0227,
    category: "police",
    en: {
      name: "Bole Road Police Checkpoint",
      tacitNote: "Traffic police are active here between 7–9 AM and 4–7 PM. Wait behind the red building on the right side to avoid being flagged for stopping in the no-stop zone.",
    },
    am: {
      name: "ቦሌ መንገድ የፖሊስ ምርመራ ቦታ",
      tacitNote: "ከጠዋቱ 1–3 እና ከቀኑ 10–1 ሰዓት ትራፊክ ፖሊስ ይሰራሉ። ቀይ ህንፃው ጀርባ ቆሙ — ያለ ቅጣት ደንበኛ ለመጠበቅ ያስችላል።",
    },
    reportedBy: "Yoseph K.",
    date: "2026-04-10",
  },
  {
    id: "m2",
    lng: 38.7469,
    lat: 9.0300,
    category: "problem_zone",
    en: {
      name: "Meskel Square Congestion Zone",
      tacitNote: "Severe congestion during evening rush (5–8 PM). Use the back road through Kazanchis to save 15–20 minutes. Avoid the roundabout entirely on Fridays after 4 PM.",
    },
    am: {
      name: "መስቀል አደባባይ የትራፊክ መጨናነቅ",
      tacitNote: "ከቀኑ 11–2 ሰዓት ከፍተኛ መጨናነቅ አለ። ካዛንቺስ ውስጥ ያለውን የጀርባ መንገድ ተጠቀሙ — 15–20 ደቂቃ ይቆጥባል። ዓርብ ከቀኑ 10 ሰዓት በኋላ ክብ መንገዱን ሙሉ ለሙሉ ያስወግዱ።",
    },
    reportedBy: "Dawit A.",
    date: "2026-04-08",
  },
  {
    id: "m3",
    lng: 38.7614,
    lat: 9.0105,
    category: "church",
    en: {
      name: "Bole Medhanialem Church",
      tacitNote: "Large crowds gather on Sundays from 6–10 AM and on Ethiopian Orthodox holidays. Expect road closures on the east side. Drop passengers at the side gate on the north road.",
    },
    am: {
      name: "ቦሌ መድኃኒዓለም ቤተ ክርስቲያን",
      tacitNote: "እሁድ ከጠዋቱ 12–4 ሰዓት እና በኦርቶዶክስ በዓላት ብዙ ሰዎች ይሰበሰባሉ። ምስራቅ ጎን መንገድ ሊዘጋ ይችላል። ሰሜን መንገዱ ላይ ባለው ጎን በር ደንበኛ አውርዱ።",
    },
    reportedBy: "Selam T.",
    date: "2026-03-22",
  },
  {
    id: "m4",
    lng: 38.7800,
    lat: 9.0350,
    category: "pickup",
    en: {
      name: "Bole International Airport — Best Pickup Spot",
      tacitNote: "Do not stop at the main departure entrance — traffic police will fine you. The safe pickup zone is the arrivals exit on the lower level. Passengers often call from inside; wait in the parking bay marked P2.",
    },
    am: {
      name: "ቦሌ ዓለም አቀፍ አውሮፕላን ማረፊያ — ምርጥ መጠበቂያ ቦታ",
      tacitNote: "በዋናው መግቢያ አትቁሙ — ትራፊክ ፖሊስ ይቀጣዎታል። ደህንነቱ የተጠበቀ ቦታ ታችኛው ፎቅ ላይ ያለው መውጫ ነው። ደንበኞች ብዙ ጊዜ ከውስጥ ይደውላሉ — P2 ምልክት ባለው ፓርኪንግ ይጠብቁ።",
    },
    reportedBy: "Eyerus G.",
    date: "2026-04-01",
  },
  {
    id: "m5",
    lng: 38.7530,
    lat: 9.0450,
    category: "traffic",
    en: {
      name: "Piassa Underpass — GPS Dead Zone",
      tacitNote: "GPS signal drops completely inside the Piassa underpass and in the surrounding dense buildings. Drivers report location freezing for 2–3 minutes. Advise passengers to share pin location before entering this area.",
    },
    am: {
      name: "ፒያሳ ዋሻ — GPS የሚቋረጥበት ቦታ",
      tacitNote: "ፒያሳ ዋሻ ውስጥ እና አካባቢው ባሉ ጥቅጥቅ ህንፃዎች GPS ሙሉ ለሙሉ ይቋረጣል። ሹፌሮች ቦታቸው ለ2–3 ደቂቃ ሲቀዘቅዝ ሪፖርት ያደርጋሉ። ደንበኞች ወደዚህ አካባቢ ከመግባታቸው በፊት ፒን ቦታቸውን እንዲያጋሩ ይምከሩ።",
    },
    reportedBy: "Yonas B.",
    date: "2026-03-15",
  },
  {
    id: "m6",
    lng: 38.7900,
    lat: 9.0150,
    category: "fuel",
    en: {
      name: "CMC Total Fuel Station",
      tacitNote: "This is the most reliable 24-hour fuel station on the CMC–Ayat corridor. The queue is shortest between 10 PM and 6 AM. The station also has a car wash and a small convenience store.",
    },
    am: {
      name: "CMC ቶታል ነዳጅ ጣቢያ",
      tacitNote: "ይህ በCMC–አያት መስመር ላይ ያለ ምርጥ 24 ሰዓት ነዳጅ ጣቢያ ነው። ከምሽቱ 4–12 ሰዓት ወረፋ አጭር ነው። ጣቢያው የመኪና ማጠቢያ እና ትንሽ ሱቅ አለው።",
    },
    reportedBy: "Kalkidan B.",
    date: "2026-04-12",
  },
  {
    id: "m7",
    lng: 38.7680,
    lat: 9.0550,
    category: "landmark",
    en: {
      name: "Arat Kilo Monument",
      tacitNote: "A common passenger confusion point — many riders say 'Arat Kilo' but mean different nearby locations. Always confirm: are they going to the university gate, the monument itself, or the road toward Entoto? Saves unnecessary back-and-forth.",
    },
    am: {
      name: "አራት ኪሎ ሐውልት",
      tacitNote: "ብዙ ደንበኞች 'አራት ኪሎ' ቢሉም የሚፈልጉት ቦታ ይለያያል። ሁልጊዜ ያረጋግጡ — ወደ ዩኒቨርሲቲ በር፣ ወደ ሐውልቱ ወይም ወደ እንጦጦ መንገድ? ይህ ሳይፈለግ ወደ ኋላ ከመመለስ ያድናል።",
    },
    reportedBy: "Selam T.",
    date: "2026-02-28",
  },
  {
    id: "m8",
    lng: 38.7420,
    lat: 9.0180,
    category: "problem_zone",
    en: {
      name: "Gerji Junction — Flooding Risk",
      tacitNote: "The low-lying section between Gerji and Ayat floods after heavy rain. Avoid this route after 6 PM during rainy season (June–September). The alternative is the elevated road through Megenagna.",
    },
    am: {
      name: "ገርጂ መስቀለኛ — የጎርፍ አደጋ",
      tacitNote: "ገርጂ እና አያት መካከል ያለው ዝቅተኛ ቦታ ከዝናብ በኋላ ይጥለቀለቃል። በዝናብ ወቅት (ሰኔ–መስከረም) ከምሽቱ 12 ሰዓት በኋላ ይህን መንገድ ያስወግዱ። አማራጩ መንገድ ሜገናኛ ውስጥ ያለው ከፍ ያለ መንገድ ነው።",
    },
    reportedBy: "Dawit A.",
    date: "2026-04-14",
  },
  {
    id: "m9",
    lng: 38.7560,
    lat: 9.0080,
    category: "police",
    en: {
      name: "Edna Mall Speed Camera",
      tacitNote: "There is a fixed speed camera 200 metres before Edna Mall on the Bole road. Speed limit is 50 km/h. Many drivers have been fined here. Slow down before the Edna Mall overpass.",
    },
    am: {
      name: "ኤድና ሞል የፍጥነት ካሜራ",
      tacitNote: "ቦሌ መንገድ ላይ ኤድና ሞል ከ200 ሜትር በፊት ቋሚ የፍጥነት ካሜራ አለ። የፍጥነት ገደቡ 50 ኪ.ሜ/ሰዓት ነው። ብዙ ሹፌሮች እዚህ ተቀጥተዋል። ከኤድና ሞል ድልድይ በፊት ፍጥነትዎን ይቀንሱ።",
    },
    reportedBy: "Yoseph K.",
    date: "2026-04-05",
  },
  {
    id: "m10",
    lng: 38.7710,
    lat: 9.0400,
    category: "pickup",
    en: {
      name: "Kazanchis Business District — Peak Pickup Zone",
      tacitNote: "High demand zone between 8–10 AM and 5–7 PM on weekdays. Position near the Hilton Hotel side road for fastest pickup. Avoid the main Kazanchis roundabout during peak hours — use the back lane behind the commercial bank.",
    },
    am: {
      name: "ካዛንቺስ የንግድ ዞን — ከፍተኛ ፍላጎት ቦታ",
      tacitNote: "በሳምንት ቀናት ከጠዋቱ 2–4 እና ከቀኑ 11–1 ሰዓት ከፍተኛ ፍላጎት አለ። ለፈጣን ፒክ-አፕ ሂልተን ሆቴል ጎን መንገድ አካባቢ ቁሙ። ከፍተኛ ሰዓት ላይ ዋናውን ካዛንቺስ ክብ ያስወግዱ — ከኮሜርሻል ባንክ ጀርባ ያለውን ጎን መንገድ ተጠቀሙ።",
    },
    reportedBy: "Eyerus G.",
    date: "2026-04-11",
  },
];

// Simulated car route across Addis Ababa (lng/lat waypoints)
export const CAR_ROUTE: [number, number][] = [
  [38.7469, 9.0300],
  [38.7530, 9.0320],
  [38.7580, 9.0290],
  [38.7614, 9.0250],
  [38.7636, 9.0227],
  [38.7680, 9.0200],
  [38.7710, 9.0220],
  [38.7750, 9.0280],
  [38.7800, 9.0320],
  [38.7850, 9.0350],
  [38.7900, 9.0300],
  [38.7860, 9.0200],
  [38.7800, 9.0150],
  [38.7710, 9.0100],
  [38.7636, 9.0105],
  [38.7560, 9.0080],
  [38.7530, 9.0120],
  [38.7469, 9.0180],
  [38.7420, 9.0180],
  [38.7469, 9.0300],
];

export const KMS_MAP_MARKERS_KEY = "kms_map_markers";

function isMarkerCategory(value: unknown): value is MarkerCategory {
  return (
    value === "problem_zone" ||
    value === "landmark" ||
    value === "church" ||
    value === "police" ||
    value === "traffic" ||
    value === "pickup" ||
    value === "fuel"
  );
}

function isTacitMarker(value: unknown): value is TacitMarker {
  const m = value as TacitMarker;
  return !!m &&
    typeof m.id === "string" &&
    typeof m.lng === "number" &&
    typeof m.lat === "number" &&
    isMarkerCategory(m.category) &&
    !!m.en && typeof m.en.name === "string" && typeof m.en.tacitNote === "string" &&
    !!m.am && typeof m.am.name === "string" && typeof m.am.tacitNote === "string" &&
    typeof m.reportedBy === "string" &&
    typeof m.date === "string";
}

export function loadCustomMarkers(): TacitMarker[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KMS_MAP_MARKERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTacitMarker);
  } catch {
    return [];
  }
}

export function saveCustomMarkers(markers: TacitMarker[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KMS_MAP_MARKERS_KEY, JSON.stringify(markers));
}
