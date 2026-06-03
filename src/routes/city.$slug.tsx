import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, CalendarDays, List, Map as MapIcon } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SpotCard } from "@/components/SpotCard";
import { PreferencesCard, usePreferences } from "@/components/PreferencesCard";
import { getCity } from "@/lib/photospot-data";
import { personalizedTip } from "@/lib/preferences";

export const Route = createFileRoute("/city/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    return { city };
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

  const main = city.spots.filter((s) => !s.hidden);
  const hidden = city.spots.filter((s) => s.hidden);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: city.gradient, opacity: 0.85 }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> All cities
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">{city.country}</p>
              <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {city.name}
              </h1>
              <p className="mt-2 max-w-xl text-white/85">{city.tagline}</p>
            </div>
            <Link
              to="/itinerary/$slug"
              params={{ slug: city.slug }}
              className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground backdrop-blur hover:bg-background"
            >
              <CalendarDays className="h-4 w-4 text-primary" />
              1-day itinerary
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/90">
          <span className="font-medium text-primary">AI tuning · </span>
          {personalizedTip(prefs)}
        </div>

        <PreferencesCard prefs={prefs} onChange={setPrefs} compact />

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Top spots</h2>
          <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs">
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <MapIcon className="h-3.5 w-3.5" /> Map
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {main.map((s) => (
              <SpotCard key={s.id} spot={s} citySlug={city.slug} cityName={city.name} />
            ))}
          </div>
        ) : (
          <MapStub spots={city.spots} cityName={city.name} />
        )}

        {hidden.length > 0 && (
          <section className="pt-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px flex-1 bg-border" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary">Hidden gems</p>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hidden.map((s) => (
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