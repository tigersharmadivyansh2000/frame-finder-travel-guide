export type CameraType = "Phone" | "Fujifilm" | "Sony" | "Canon" | "DJI" | "Other";
export type SkillLevel = "Beginner" | "Intermediate" | "Pro";
export type PhotoStyle = "Street" | "Travel" | "Portrait" | "Landscape" | "Cinematic";

export interface Preferences {
  camera: CameraType;
  skill: SkillLevel;
  style: PhotoStyle;
  completed: boolean;
}

export const DEFAULT_PREFS: Preferences = {
  camera: "Phone",
  skill: "Beginner",
  style: "Travel",
  completed: false,
};

export const CAMERAS: CameraType[] = ["Phone", "Fujifilm", "Sony", "Canon", "DJI", "Other"];
export const SKILLS: SkillLevel[] = ["Beginner", "Intermediate", "Pro"];
export const STYLES: PhotoStyle[] = ["Street", "Travel", "Portrait", "Landscape", "Cinematic"];

export function personalizedTip(prefs: Preferences): string {
  const cam = prefs.camera === "Phone" ? "your phone" : `your ${prefs.camera}`;
  const styleVerb: Record<PhotoStyle, string> = {
    Street: "candid moments and reactive framing",
    Travel: "sense of place and environmental wides",
    Portrait: "shallow depth and warm skin tones",
    Landscape: "leading lines and layered depth",
    Cinematic: "anamorphic-style 2.39:1 crops and motion",
  };
  const skillNote: Record<SkillLevel, string> = {
    Beginner: "Stick to one focal length per spot — fewer choices, sharper instincts.",
    Intermediate: "Bracket exposures during golden hour — you'll thank yourself in edit.",
    Pro: "Pre-visualise the final crop before raising the camera.",
  };
  return `Recommendations tuned for ${cam}, leaning into ${styleVerb[prefs.style]}. ${skillNote[prefs.skill]}`;
}