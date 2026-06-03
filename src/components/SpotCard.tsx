import { Bookmark, BookmarkCheck, Clock, Users, Camera, Aperture, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/lib/use-local-storage";
import type { Spot } from "@/lib/photospot-data";

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
  const isSaved = hydrated && saved.includes(spot.id);

  const toggle = () => {
    setSaved((prev) =>
      prev.includes(spot.id) ? prev.filter((x) => x !== spot.id) : [...prev, spot.id],
    );
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)] transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative h-40 overflow-hidden" style={{ background: spot.gradient }}>
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        {spot.hidden && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" /> Hidden Gem
          </span>
        )}
        <button
          onClick={toggle}
          aria-label={isSaved ? "Remove from saved" : "Save spot"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-background"
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">{cityName} · {spot.area}</p>
          <h3 className="mt-0.5 font-display text-xl font-semibold leading-tight text-white">
            {spot.name}
          </h3>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{spot.whyPhotogenic}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {spot.bestTimes.join(" · ")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Users className={`h-3.5 w-3.5 ${crowdColor[spot.crowd]}`} />
            {spot.crowd} crowd
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-xl bg-muted/40 p-3 text-xs">
          <Row icon={<Camera className="h-3.5 w-3.5" />} label="Lens" value={spot.focalLength} />
          <Row icon={<Aperture className="h-3.5 w-3.5" />} label="Settings" value={spot.settings} />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Shot ideas</p>
          <div className="flex flex-wrap gap-1.5">
            {spot.shotIdeas.map((idea) => (
              <span key={idea} className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/90">
                {idea}
              </span>
            ))}
          </div>
        </div>

        <details className="group/d">
          <summary className="cursor-pointer text-xs font-medium text-primary hover:underline">
            Photography tips
          </summary>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
            {spot.tips.map((t) => (
              <li key={t} className="flex gap-2"><span className="text-primary">·</span>{t}</li>
            ))}
          </ul>
        </details>
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