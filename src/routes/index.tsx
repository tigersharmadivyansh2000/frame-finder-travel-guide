import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PreferencesCard, usePreferences } from "@/components/PreferencesCard";
import { CITIES, searchCity } from "@/lib/photospot-data";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhotoSpot AI — Find the world's best photo spots" },
      {
        name: "description",
        content:
          "Discover the best photography locations in any city with AI-personalized recommendations: lens, settings, best light, and hidden gems.",
      },
      { property: "og:title", content: "PhotoSpot AI" },
      {
        property: "og:description",
        content: "Find the best photo spots in any city — personalized to your camera and style.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { value: prefs, setValue: setPrefs } = usePreferences();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = searchCity(query) ?? CITIES[0];
    navigate({ to: "/city/$slug", params: { slug: city.slug } });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="mx-auto max-w-3xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" /> AI-personalized
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Find the world's most
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-sunset)" }}>
              photogenic places.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Search any city. Get the spot, the light, the lens, and the shot — tuned to your camera and style.
          </p>

          <form onSubmit={onSearch} className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card/80 p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur">
            <Search className="ml-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try Tokyo, Kyoto, Bali…"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-sunset)" }}
            >
              Explore <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Preferences */}
      <section className="mx-auto -mt-4 max-w-3xl px-4 sm:px-6">
        <PreferencesCard prefs={prefs} onChange={setPrefs} />
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Curated cities</p>
            <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Start with a destination</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              to="/city/$slug"
              params={{ slug: city.slug }}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border/60"
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: city.gradient }} />
              <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">{city.country}</p>
                <h3 className="mt-0.5 font-display text-2xl font-semibold text-white">{city.name}</h3>
                <p className="mt-1 text-sm text-white/80 line-clamp-2">{city.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  {city.spots.length} spots <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Built for photographers · v1 with sample cities
      </footer>
    </div>
  );
}
