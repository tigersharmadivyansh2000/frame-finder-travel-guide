import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sunrise, Sun, Sunset, Moon, Camera, Clock } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { getCity, type Spot, type City } from "@/lib/photospot-data";
import { cityImage } from "@/lib/city-images";
import { usePreferences } from "@/components/PreferencesCard";
import { personalizedTip } from "@/lib/preferences";

export const Route = createFileRoute("/itinerary/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    return { city } as { city: City };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.city.name} 1-day photo itinerary — PhotoSpot AI` },
          {
            name: "description",
            content: `A dawn-to-dusk photography itinerary for ${loaderData.city.name}.`,
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-muted-foreground">
      Couldn't load itinerary: {error instanceof Error ? error.message : String(error)}
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-10 text-center">City not found.</div>
  ),
  component: ItineraryPage,
});

const SLOTS = [
  { key: "Sunrise", icon: Sunrise, time: "05:30 – 07:30", label: "Golden dawn" },
  { key: "Midday", icon: Sun, time: "11:00 – 14:00", label: "High light & detail" },
  { key: "Sunset", icon: Sunset, time: "17:00 – 19:00", label: "Last light" },
  { key: "Blue Hour", icon: Moon, time: "19:00 – 20:30", label: "Blue & neon" },
] as const;

function pickForSlot(spots: Spot[], slot: typeof SLOTS[number]["key"]): Spot {
  const direct = spots.find((s) => s.bestTimes.includes(slot as Spot["bestTimes"][number]));
  if (direct) return direct;
  // fallback ordering
  return spots[0];
}

function ItineraryPage() {
  const { city } = Route.useLoaderData();
  const { value: prefs } = usePreferences();
  const img = cityImage(city.slug);

  const used = new Set<string>();
  const plan = SLOTS.map((slot) => {
    const candidates = city.spots.filter((s: Spot) => !used.has(s.id));
    const spot = pickForSlot(candidates.length ? candidates : city.spots, slot.key);
    used.add(spot.id);
    return { slot, spot };
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative h-[42svh] min-h-[280px] overflow-hidden">
        {img && (
          <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col justify-between px-5 sm:px-8 pt-6 pb-8">
          <Link
            to="/city/$slug"
            params={{ slug: city.slug }}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md ring-1 ring-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {city.name}
          </Link>
          <div className="animate-fade-up">
            <p className="text-[10px] uppercase tracking-[0.28em] text-primary">One perfect day</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] text-white sm:text-6xl">
              {city.name} in 24h
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
        <p className="text-muted-foreground max-w-xl">
          A photographer's itinerary chasing light from dawn to neon.
        </p>

        <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/90">
          <span className="font-medium text-primary">For you · </span>
          {personalizedTip(prefs)}
        </div>

        <ol className="mt-10 relative space-y-6 border-l border-border pl-6">
          {plan.map(({ slot, spot }) => {
            const Icon = slot.icon;
            return (
              <li key={slot.key} className="relative">
                <span className="absolute -left-[34px] top-1 grid h-6 w-6 place-items-center rounded-full border border-primary/60 bg-background">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary">{slot.label}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {slot.time}
                  </p>
                </div>
                <div className="mt-2 rounded-2xl border border-border/60 bg-card overflow-hidden">
                  <div className="h-24 relative" style={{ background: spot.gradient }}>
                    <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{spot.area}</p>
                      <h3 className="font-display text-lg font-semibold text-white">{spot.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{spot.whyPhotogenic}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-foreground/90">
                        <Camera className="h-3.5 w-3.5 text-primary" /> {spot.focalLength}
                      </span>
                      <span className="text-muted-foreground">{spot.settings}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
          Want a tighter loop or a 3-day plan? Live AI itinerary generation arrives in the next release.
        </div>
      </div>
    </div>
  );
}