export type CrowdLevel = "Low" | "Medium" | "High";
export type BestTime = "Sunrise" | "Sunset" | "Blue Hour" | "Night" | "Midday";

export interface Spot {
  id: string;
  name: string;
  area: string;
  whyPhotogenic: string;
  bestTimes: BestTime[];
  crowd: CrowdLevel;
  tips: string[];
  focalLength: string;
  settings: string;
  shotIdeas: string[];
  hidden?: boolean;
  gradient: string;
}

export interface City {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  gradient: string;
  spots: Spot[];
}

const g = {
  sunset: "linear-gradient(135deg,#ff7e5f 0%,#feb47b 50%,#86377b 100%)",
  night: "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
  rose: "linear-gradient(135deg,#ee9ca7 0%,#ffdde1 100%)",
  jade: "linear-gradient(135deg,#134e5e 0%,#71b280 100%)",
  rust: "linear-gradient(135deg,#c94b4b 0%,#4b134f 100%)",
  ocean: "linear-gradient(135deg,#1a2a6c 0%,#b21f1f 50%,#fdbb2d 100%)",
  forest: "linear-gradient(135deg,#0b3d2e 0%,#1f8a70 100%)",
  neon: "linear-gradient(135deg,#7f00ff 0%,#e100ff 100%)",
  sand: "linear-gradient(135deg,#3e5151 0%,#decba4 100%)",
};

export const CITIES: City[] = [
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tagline: "Neon-drenched alleys and quiet shrines",
    gradient: g.neon,
    spots: [
      {
        id: "tokyo-shibuya",
        name: "Shibuya Scramble Crossing",
        area: "Shibuya",
        whyPhotogenic: "The most iconic intersection on Earth — a rhythmic burst of humanity under neon billboards.",
        bestTimes: ["Blue Hour", "Night"],
        crowd: "High",
        tips: [
          "Shoot from Mag's Park or the Shibuya Sky deck for elevation.",
          "Time bursts of 8–10s to capture full crossing cycles.",
        ],
        focalLength: "24–70mm (wide to short tele)",
        settings: "ISO 400, f/8, 1/4s on a tripod for motion blur",
        shotIdeas: ["Wide cinematic", "Top-down geometric", "Street portrait with neon bokeh"],
        gradient: g.neon,
      },
      {
        id: "tokyo-shinjuku",
        name: "Omoide Yokocho",
        area: "Shinjuku",
        whyPhotogenic: "Tight lantern-lit alleys with smoke, warm tungsten, and silhouettes.",
        bestTimes: ["Blue Hour", "Night"],
        crowd: "Medium",
        tips: ["Embrace tungsten — don't auto-correct.", "Wait for a single passerby to anchor depth."],
        focalLength: "35mm prime",
        settings: "ISO 1600, f/2, 1/60s handheld",
        shotIdeas: ["Atmospheric street", "Backlit silhouette", "Tight food detail"],
        gradient: g.rust,
      },
      {
        id: "tokyo-teamlab",
        name: "Rooftop above Golden Gai",
        area: "Kabukichō",
        whyPhotogenic: "An unmarked stairwell leads to a balcony framing the entire Kabukichō skyline.",
        bestTimes: ["Blue Hour"],
        crowd: "Low",
        tips: ["Arrive 30 min before blue hour.", "Bring a small clamp tripod — railings are narrow."],
        focalLength: "24mm wide",
        settings: "ISO 200, f/8, 2s exposure",
        shotIdeas: ["Cityscape wide", "Long exposure with car trails"],
        hidden: true,
        gradient: g.night,
      },
    ],
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Lantern light, temple gates, and quiet bamboo",
    gradient: g.rose,
    spots: [
      {
        id: "kyoto-fushimi",
        name: "Fushimi Inari Taisha",
        area: "Fushimi",
        whyPhotogenic: "Endless vermilion torii gates layered into a tunnel of color.",
        bestTimes: ["Sunrise"],
        crowd: "High",
        tips: ["Arrive before 6am to shoot the lower gates empty.", "Climb 20 min up — crowds thin dramatically."],
        focalLength: "35–85mm",
        settings: "ISO 800, f/4, 1/125s",
        shotIdeas: ["Symmetrical tunnel", "Subject walking away", "Tight color detail"],
        gradient: g.rust,
      },
      {
        id: "kyoto-arashiyama",
        name: "Arashiyama Bamboo Grove",
        area: "Arashiyama",
        whyPhotogenic: "Soft green light filters through towering bamboo, painterly and quiet.",
        bestTimes: ["Sunrise"],
        crowd: "High",
        tips: ["Look up — vertical compositions sing here.", "Use a polarizer to deepen the greens."],
        focalLength: "16–35mm wide",
        settings: "ISO 400, f/5.6, 1/60s",
        shotIdeas: ["Vertical wide", "Subject in red kimono for contrast"],
        gradient: g.forest,
      },
      {
        id: "kyoto-pontocho",
        name: "Pontochō Alley",
        area: "Nakagyō",
        whyPhotogenic: "Lantern-lit wooden façades reflect onto wet stone after rain.",
        bestTimes: ["Blue Hour", "Night"],
        crowd: "Medium",
        tips: ["Shoot just after a drizzle for reflections.", "Respect privacy — no faces of guests."],
        focalLength: "35mm",
        settings: "ISO 1600, f/2, 1/80s",
        shotIdeas: ["Wet street reflection", "Lantern detail", "Geisha silhouette (be respectful)"],
        hidden: true,
        gradient: g.rust,
      },
    ],
  },
  {
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    tagline: "Old quarter chaos and lake-side calm",
    gradient: g.jade,
    spots: [
      {
        id: "hanoi-trainstreet",
        name: "Train Street",
        area: "Old Quarter",
        whyPhotogenic: "A working rail line threads inches from café tables and laundry lines.",
        bestTimes: ["Sunset", "Blue Hour"],
        crowd: "Medium",
        tips: ["Check the train schedule.", "Wide aperture isolates locals from the rails."],
        focalLength: "24mm + 50mm",
        settings: "ISO 800, f/2.8, 1/250s",
        shotIdeas: ["Train rushing past", "Café life detail", "Wide compressed alley"],
        gradient: g.rust,
      },
      {
        id: "hanoi-hoankiem",
        name: "Hoan Kiem Lake",
        area: "Hoan Kiem",
        whyPhotogenic: "Mist rises off the water at dawn around the red Huc Bridge.",
        bestTimes: ["Sunrise"],
        crowd: "Low",
        tips: ["Locals do tai chi at 5:30am — beautiful candid material."],
        focalLength: "35–85mm",
        settings: "ISO 400, f/4, 1/125s",
        shotIdeas: ["Bridge reflection", "Candid morning ritual"],
        gradient: g.jade,
      },
      {
        id: "hanoi-cafe",
        name: "Rooftop above St. Joseph's",
        area: "Old Quarter",
        whyPhotogenic: "A tiny café roof frames the gothic cathedral against tangled wires.",
        bestTimes: ["Sunset"],
        crowd: "Low",
        tips: ["Order the egg coffee — earns you the seat."],
        focalLength: "50mm",
        settings: "ISO 400, f/5.6, 1/200s",
        shotIdeas: ["Cathedral framed", "Cable-cluttered foreground"],
        hidden: true,
        gradient: g.sand,
      },
    ],
  },
  {
    slug: "da-nang",
    name: "Da Nang",
    country: "Vietnam",
    tagline: "Marble mountains, dragon bridges, and coastline",
    gradient: g.ocean,
    spots: [
      {
        id: "danang-goldenbridge",
        name: "Golden Bridge",
        area: "Ba Na Hills",
        whyPhotogenic: "Giant stone hands cradle a golden walkway above the clouds.",
        bestTimes: ["Sunrise"],
        crowd: "High",
        tips: ["First cable car up — beat the crowds by an hour."],
        focalLength: "16–35mm",
        settings: "ISO 200, f/8, 1/250s",
        shotIdeas: ["Wide hands frame", "Subject mid-bridge"],
        gradient: g.sunset,
      },
      {
        id: "danang-dragon",
        name: "Dragon Bridge",
        area: "Hai Chau",
        whyPhotogenic: "Fire-breathing dragon over the Han River on weekend nights.",
        bestTimes: ["Night"],
        crowd: "High",
        tips: ["Saturday/Sunday 9pm for the fire show.", "East bank gives best dragon profile."],
        focalLength: "70–200mm",
        settings: "ISO 1600, f/4, 1/400s for fire bursts",
        shotIdeas: ["Fire breath action", "Long exposure river reflection"],
        gradient: g.rust,
      },
      {
        id: "danang-mykhe",
        name: "My Khe Beach Pier",
        area: "Son Tra",
        whyPhotogenic: "Round bamboo fishing boats line the shore at dawn.",
        bestTimes: ["Sunrise"],
        crowd: "Low",
        tips: ["Walk south of the main pier — fewer tourists, more boats."],
        focalLength: "35mm",
        settings: "ISO 200, f/8, 1/500s",
        shotIdeas: ["Boat patterns top-down", "Fisherman silhouette"],
        hidden: true,
        gradient: g.ocean,
      },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    country: "India",
    tagline: "Garden city colour, café culture, and palace light",
    gradient: g.rose,
    spots: [
      {
        id: "blr-cubbon",
        name: "Cubbon Park Bandstand",
        area: "Central",
        whyPhotogenic: "Dappled jacaranda light hits a Victorian bandstand at golden hour.",
        bestTimes: ["Sunrise", "Sunset"],
        crowd: "Medium",
        tips: ["Shoot Tuesdays — quieter than weekends."],
        focalLength: "50mm",
        settings: "ISO 400, f/2.8, 1/250s",
        shotIdeas: ["Backlit portrait", "Architectural detail"],
        gradient: g.forest,
      },
      {
        id: "blr-vidhana",
        name: "Vidhana Soudha at dusk",
        area: "Sampangi Rama Nagar",
        whyPhotogenic: "Floodlit neo-Dravidian façade glows against deep blue sky.",
        bestTimes: ["Blue Hour"],
        crowd: "Low",
        tips: ["Saturday nights it's fully lit.", "Shoot from across the road, telephoto."],
        focalLength: "70–200mm",
        settings: "ISO 200, f/8, 2s tripod",
        shotIdeas: ["Compressed façade", "Symmetry"],
        gradient: g.sunset,
      },
      {
        id: "blr-malleshwaram",
        name: "Malleshwaram lanes",
        area: "Malleshwaram",
        whyPhotogenic: "Old-Bangalore flower markets and tile-roofed houses at dawn.",
        bestTimes: ["Sunrise"],
        crowd: "Low",
        tips: ["8th cross has the most colour.", "Be respectful — ask before close portraits."],
        focalLength: "35mm",
        settings: "ISO 800, f/4, 1/200s",
        shotIdeas: ["Flower market colour", "Street portrait"],
        hidden: true,
        gradient: g.rust,
      },
    ],
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Rice terraces, sea temples, and volcanic dawn",
    gradient: g.jade,
    spots: [
      {
        id: "bali-tegalalang",
        name: "Tegalalang Rice Terraces",
        area: "Ubud",
        whyPhotogenic: "Sculpted green steps catch low side-light at sunrise.",
        bestTimes: ["Sunrise"],
        crowd: "Medium",
        tips: ["Pay the small entry — go past the first viewpoint."],
        focalLength: "24–70mm",
        settings: "ISO 200, f/8, 1/250s",
        shotIdeas: ["Layered wide", "Worker for scale"],
        gradient: g.forest,
      },
      {
        id: "bali-tanahlot",
        name: "Tanah Lot",
        area: "Beraban",
        whyPhotogenic: "A sea temple silhouetted as waves explode at sunset.",
        bestTimes: ["Sunset", "Blue Hour"],
        crowd: "High",
        tips: ["10-stop ND for milky water at golden hour."],
        focalLength: "24–105mm",
        settings: "ISO 100, f/11, 4s with ND",
        shotIdeas: ["Silhouette sunset", "Long exposure water"],
        gradient: g.sunset,
      },
      {
        id: "bali-batur",
        name: "Mount Batur summit",
        area: "Kintamani",
        whyPhotogenic: "Cloud layer below the rim catches first light over the caldera.",
        bestTimes: ["Sunrise"],
        crowd: "Medium",
        tips: ["Start 3am hike with a guide.", "Pack warm — it's cold at the top."],
        focalLength: "24mm + 70–200mm",
        settings: "ISO 400, f/8, 1/125s",
        shotIdeas: ["Cloud sea wide", "Tight sunburst"],
        hidden: true,
        gradient: g.sunset,
      },
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug.toLowerCase());
}

export function searchCity(query: string): City | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  return (
    CITIES.find((c) => c.slug === q) ||
    CITIES.find((c) => c.name.toLowerCase() === q) ||
    CITIES.find((c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
  );
}

export function getAllSpots(): Array<Spot & { citySlug: string; cityName: string }> {
  return CITIES.flatMap((c) =>
    c.spots.map((s) => ({ ...s, citySlug: c.slug, cityName: c.name })),
  );
}

export function findSpot(id: string) {
  return getAllSpots().find((s) => s.id === id);
}