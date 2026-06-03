import { useLocalStorage } from "@/lib/use-local-storage";
import {
  CAMERAS,
  SKILLS,
  STYLES,
  DEFAULT_PREFS,
  type Preferences,
  type CameraType,
  type SkillLevel,
  type PhotoStyle,
} from "@/lib/preferences";

export function usePreferences() {
  return useLocalStorage<Preferences>("photospot:prefs", DEFAULT_PREFS);
}

interface Props {
  prefs: Preferences;
  onChange: (p: Preferences) => void;
  compact?: boolean;
}

export function PreferencesCard({ prefs, onChange, compact }: Props) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur ${compact ? "" : "sm:p-6"}`}>
      {!compact && (
        <>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Personalize</p>
          <h2 className="mt-1 font-display text-xl font-semibold">Tune the AI to your style</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll tailor every spot's lens, settings, and shot ideas to your kit.
          </p>
        </>
      )}

      <div className={`grid gap-4 ${compact ? "mt-0 sm:grid-cols-3" : "mt-5"}`}>
        <Group<CameraType>
          label="Camera"
          options={CAMERAS}
          value={prefs.camera}
          onSelect={(v) => onChange({ ...prefs, camera: v, completed: true })}
        />
        <Group<SkillLevel>
          label="Skill"
          options={SKILLS}
          value={prefs.skill}
          onSelect={(v) => onChange({ ...prefs, skill: v, completed: true })}
        />
        <Group<PhotoStyle>
          label="Style"
          options={STYLES}
          value={prefs.style}
          onSelect={(v) => onChange({ ...prefs, style: v, completed: true })}
        />
      </div>
    </div>
  );
}

function Group<T extends string>({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/50 text-foreground/80 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}