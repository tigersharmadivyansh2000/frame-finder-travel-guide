import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, CalendarDays, List, Map as MapIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SpotCard } from "@/components/SpotCard";
import { PreferencesCard, usePreferences } from "@/components/PreferencesCard";
import { getCity, type City, type Spot } from "@/lib/photospot-data";
import { cityImage } from "@/lib/city-images";
import { personalizedTip } from "@/lib/preferences";

export const Route = createFileRoute("/city/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    return { city } as { city: City };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.city.name} photo spots — PhotoSpot AI` },
          {
            name: "description",
            content: `Best photography locations in ${loaderData.city.name}, ${loaderData.city.country}: ${loaderData.city.tagline}.`,
          },
          { property: "og:title", content: `${loaderData.city.name} photo spots` },
          { property: "og:description", content: loaderData.city.tagline },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-muted-foreground">Couldn't load city: {error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">City not in our atlas yet</h1>
        <p className="mt-2 text-muted-foreground">We're adding new destinations every week.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to discover
        </Link>
      </div>
    </div>
  ),
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useLoaderData();
  const { value: prefs, setValue: setPrefs } = usePreferences();
  const [view, setView] = useState<"list" | "map">("list");
  const img = cityImage(city.slug);

  const main = city.spots.filter((s: Spot) => !s.hidden);
  const hidden = city.spots.filter((s: Spot) => s.hidden);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Cinematic hero */}
      <section className="relative h-[68svh] min-h-[440px] w-full overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={city.name}
            className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: city.gradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-5 pt-6 pb-10 sm:px-8 sm:pb-14">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md ring-1 ring-white/10 hover:bg-black/60 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All cities
          </Link>

          <div className="animate-fade-up">
            <p className="text-[10px] uppercase tracking-[0.28em] text-primary">{city.country}</p>
            <h1 className="mt-2 font-display text-5xl font-semibold tracking-[-0.02em] text-white sm:text-7xl">
              {city.name}
            </h1>
            <p className="mt-3 max-w-md text-white/80 sm:text-lg">{city.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/itinerary/$slug"
                params={{ slug: city.slug }}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
                style={{ background: "var(--gradient-sunset)" }}
              >
                <CalendarDays className="h-4 w-4" />
                1-day itinerary
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-4 py-2.5 text-sm text-white backdrop-blur-md ring-1 ring-white/10">
                <MapPin className="h-4 w-4 text-primary" />
                {city.spots.length} spots
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 space-y-10">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/90">
          <span className="font-medium text-primary">AI tuning · </span>
          {personalizedTip(prefs)}
        </div>

        <PreferencesCard prefs={prefs} onChange={setPrefs} compact />

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Top spots</h2>
          <div className="inline-flex rounded-full border border-white/10 bg-card p-1 text-xs">
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <MapIcon className="h-3.5 w-3.5" /> Map
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger">
            {main.map((s: Spot) => (
              <SpotCard key={s.id} spot={s} citySlug={city.slug} cityName={city.name} />
            ))}
          </div>
        ) : (
          <MapStub spots={city.spots} cityName={city.name} />
        )}

        {hidden.length > 0 && (
          <section className="pt-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px flex-1 bg-white/10" />
              <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-primary">
                <Sparkles className="h-3 w-3" /> Hidden gems
              </p>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger">
              {hidden.map((s: Spot) => (
                <SpotCard key={s.id} spot={s} citySlug={city.slug} cityName={city.name} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MapStub({ spots, cityName }: { spots: { id: string; name: string; area: string; gradient: string }[]; cityName: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] w-full" style={{ background: "var(--gradient-night)" }}>
        {/* faux map grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {spots.map((s, i) => {
          const x = 12 + ((i * 73) % 76);
          const y = 15 + ((i * 41) % 65);
          return (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="rounded-md border border-border bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur">
                  {s.name}
                </div>
                <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--color-primary)]" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        Map preview for {cityName} · live map coming with Google Maps integration
      </div>
    </div>
  );
}