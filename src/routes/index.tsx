import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Sparkles, ChevronDown, MapPin } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PreferencesCard, usePreferences } from "@/components/PreferencesCard";
import { CITIES, searchCity } from "@/lib/photospot-data";
import { cityImage } from "@/lib/city-images";
import heroImg from "@/assets/hero-mobile.jpg";

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
  const [scrolled, setScrolled] = useState(false);
  const { value: prefs, setValue: setPrefs } = usePreferences();
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = searchCity(query) ?? CITIES[0];
    navigate({ to: "/city/$slug", params: { slug: city.slug } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating header */}
      <div className="fixed inset-x-0 top-0 z-50 transition-all duration-500">
        <div
          className={`transition-all duration-500 ${
            scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5" : ""
          }`}
        >
          <AppHeader />
        </div>

        {/* Floating search — appears on scroll */}
        <div
          className={`mx-auto max-w-md px-4 transition-all duration-500 ${
            scrolled ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <form
            onSubmit={onSearch}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-card/90 p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur-xl"
          >
            <Search className="ml-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any city…"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-primary-foreground"
              style={{ background: "var(--gradient-sunset)" }}
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Full-screen cinematic hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Photographer at sunrise over a tropical landscape"
          width={1280}
          height={1920}
          className="absolute inset-0 -z-10 h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="relative z-10 flex h-full flex-col px-5 pt-32 pb-10 sm:px-8">
          <div className="flex-1 flex flex-col justify-end animate-fade-up">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur">
              <Sparkles className="h-3 w-3" /> AI-personalized
            </span>
            <h1 className="mt-5 font-display text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.02em] text-white sm:text-7xl">
              Chase the
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-sunset)" }}
              >
                perfect light.
              </span>
            </h1>
            <p className="mt-5 max-w-sm text-base text-white/75 leading-relaxed sm:text-lg">
              The world's most photogenic places — the spot, the lens, the moment. Tuned to your camera.
            </p>

            <form
              onSubmit={onSearch}
              className="mt-7 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur-xl"
            >
              <Search className="ml-3 h-4 w-4 text-white/70" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tokyo, Kyoto, Bali…"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
                style={{ background: "var(--gradient-sunset)" }}
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <button
            onClick={() => railRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            aria-label="Scroll to destinations"
            className="mx-auto mt-8 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
          >
            Discover
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Destinations rail — Instagram travel feed style */}
      <section ref={railRef} className="relative pt-14 pb-10 sm:pt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Featured</p>
              <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Cities in light
              </h2>
            </div>
            <Link to="/saved" className="hidden sm:inline text-xs text-muted-foreground hover:text-foreground transition-colors">
              View saved →
            </Link>
          </div>
        </div>

        {/* Horizontal scroll rail on mobile, grid on lg */}
        <div className="lg:hidden">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 stagger">
            {CITIES.map((city) => (
              <CityCard key={city.slug} city={city} variant="rail" />
            ))}
            <div className="shrink-0 w-1" />
          </div>
        </div>

        <div className="hidden lg:block mx-auto max-w-6xl px-8">
          <div className="grid grid-cols-3 gap-5 stagger">
            {CITIES.map((city) => (
              <CityCard key={city.slug} city={city} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-10 animate-fade-up">
        <PreferencesCard prefs={prefs} onChange={setPrefs} />
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-muted-foreground">
        <p className="font-display text-base text-foreground/80">PhotoSpot AI</p>
        <p className="mt-1">Chase light. Save spots. Plan the perfect day.</p>
      </footer>
    </div>
  );
}

function CityCard({
  city,
  variant,
}: {
  city: (typeof CITIES)[number];
  variant: "rail" | "grid";
}) {
  const img = cityImage(city.slug);
  const sizing =
    variant === "rail"
      ? "w-[78vw] max-w-[320px] shrink-0 snap-start aspect-[3/4]"
      : "aspect-[3/4]";
  return (
    <Link
      to="/city/$slug"
      params={{ slug: city.slug }}
      className={`group relative block overflow-hidden rounded-[28px] ring-1 ring-white/5 shadow-[var(--shadow-elegant)] ${sizing}`}
    >
      {img && (
        <img
          src={img}
          alt={city.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md ring-1 ring-white/10">
          <MapPin className="h-3 w-3" /> {city.country}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-3xl font-semibold leading-[0.95] tracking-tight text-white drop-shadow">
          {city.name}
        </h3>
        <p className="mt-2 text-sm text-white/75 line-clamp-2">{city.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            {city.spots.length} spots
          </span>
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-primary-foreground transition-transform group-hover:translate-x-0.5"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
