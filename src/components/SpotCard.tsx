import { Bookmark, Clock, Users, Camera, Aperture, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";
import type { Spot } from "@/lib/photospot-data";
import { cityImage } from "@/lib/city-images";

const crowdColor: Record<Spot["crowd"], string> = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-rose-400",
};

interface Props {
  spot: Spot;
  citySlug: string;
  cityName: string;
}

export function SpotCard({ spot, citySlug, cityName }: Props) {
  const { value: saved, setValue: setSaved, hydrated } = useLocalStorage<string[]>(
    "photospot:saved",
    [],
  );
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const isSaved = hydrated && saved.includes(spot.id);
  const img = cityImage(citySlug);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPop(false);
    requestAnimationFrame(() => setPop(true));
    setSaved((prev) =>
      prev.includes(spot.id) ? prev.filter((x) => x !== spot.id) : [...prev, spot.id],
    );
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/5 bg-card shadow-[var(--shadow-elegant)] transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={spot.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: spot.gradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {spot.hidden ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-primary backdrop-blur-md ring-1 ring-white/10">
              <Sparkles className="h-3 w-3" /> Hidden Gem
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md ring-1 ring-white/10">
              {spot.bestTimes[0]}
            </span>
          )}
          <button
            onClick={toggle}
            aria-label={isSaved ? "Remove from saved" : "Save spot"}
            className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md ring-1 ring-white/10 transition hover:bg-black/60 active:scale-90"
          >
            <Bookmark
              className={`h-4 w-4 transition-all duration-300 ${
                isSaved ? "fill-primary text-primary" : ""
              } ${pop ? "animate-pop" : ""}`}
            />
          </button>
        </div>

        {/* Bottom title */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/65">
            {cityName} · {spot.area}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold leading-[1.05] text-white">
            {spot.name}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-primary" />
              {spot.bestTimes.join(" · ")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className={`h-3 w-3 ${crowdColor[spot.crowd]}`} />
              {spot.crowd}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{spot.whyPhotogenic}</p>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-secondary/40 p-3 text-xs ring-1 ring-white/5">
          <Row icon={<Camera className="h-3.5 w-3.5" />} label="Lens" value={spot.focalLength} />
          <Row icon={<Aperture className="h-3.5 w-3.5" />} label="Settings" value={spot.settings} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Shot ideas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {spot.shotIdeas.map((idea) => (
              <span
                key={idea}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-foreground/85"
              >
                {idea}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between text-xs font-medium text-primary"
        >
          <span>Photography tips</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <ul className="min-h-0 overflow-hidden space-y-1.5 text-xs text-muted-foreground leading-relaxed">
            {spot.tips.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-primary">·</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="sr-only">{citySlug}</span>
    </article>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div className="min-w-0">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <p className="text-foreground/90 leading-snug">{value}</p>
      </div>
    </div>
  );
}