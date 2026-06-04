import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, Sun, Camera, Aperture, Lightbulb, Film, Instagram, Check } from "lucide-react";
import {
  generatePhotoPlan,
  GEAR_OPTIONS,
  type Gear,
  type AssistantPlan,
} from "@/lib/photo-assistant.functions";
import type { Spot } from "@/lib/photospot-data";
import { useLocalStorage } from "@/lib/use-local-storage";

type Cache = Record<string, AssistantPlan>;

interface Props {
  spot: Spot;
  cityName: string;
}

export function AssistantPanel({ spot, cityName }: Props) {
  const call = useServerFn(generatePhotoPlan);
  const [gear, setGear] = useState<Gear>("Smartphone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { value: cache, setValue: setCache, hydrated } = useLocalStorage<Cache>(
    "photospot:ai-plans",
    {},
  );

  const key = `${spot.id}::${gear}`;
  const plan = hydrated ? cache[key] : undefined;

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await call({
        data: {
          spotName: spot.name,
          cityName,
          area: spot.area,
          whyPhotogenic: spot.whyPhotogenic,
          bestTimes: spot.bestTimes,
          gear,
        },
      });
      setCache((prev) => ({ ...prev, [key]: result }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent p-4 ring-1 ring-white/5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary">AI Assistant</p>
            <p className="text-xs text-muted-foreground">Personalized for your gear</p>
          </div>
        </div>
      </header>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {GEAR_OPTIONS.map((g) => {
          const active = g === gear;
          return (
            <button
              key={g}
              onClick={() => setGear(g)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-white/10 bg-white/[0.03] text-foreground/80 hover:bg-white/[0.06]"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {!plan && (
        <button
          onClick={generate}
          disabled={loading}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Composing your plan…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate AI plan
            </>
          )}
        </button>
      )}

      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

      {plan && (
        <div className="mt-4 space-y-3 text-xs">
          <Block icon={<Sun className="h-3.5 w-3.5" />} title="Best lighting">
            <p className="text-foreground/90 leading-relaxed">{plan.bestLighting}</p>
          </Block>

          <Block icon={<Camera className="h-3.5 w-3.5" />} title="Composition ideas">
            <List items={plan.composition} />
          </Block>

          <Block icon={<Aperture className="h-3.5 w-3.5" />} title={`Camera settings · ${gear}`}>
            <p className="text-foreground/90 leading-relaxed">{plan.cameraSettings}</p>
            <p className="mt-1.5 text-[11px] text-muted-foreground italic">{plan.gearNote}</p>
          </Block>

          <Block icon={<Lightbulb className="h-3.5 w-3.5" />} title="Beginner tips">
            <List items={plan.beginnerTips} />
          </Block>

          <Block icon={<Film className="h-3.5 w-3.5" />} title="Fujifilm recipe">
            <p className="text-foreground/90 leading-relaxed">{plan.fujifilmRecipe}</p>
          </Block>

          <Block icon={<Instagram className="h-3.5 w-3.5" />} title="Instagram shot checklist">
            <ul className="space-y-1.5">
              {plan.instagramChecklist.map((s) => (
                <li key={s} className="flex gap-2 text-foreground/90 leading-relaxed">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Block>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-1 text-[11px] font-medium text-primary hover:underline disabled:opacity-60"
          >
            {loading ? "Regenerating…" : "Regenerate"}
          </button>
        </div>
      )}
    </section>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-secondary/40 p-3 ring-1 ring-white/5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-foreground/90 leading-relaxed">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="text-primary">·</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}