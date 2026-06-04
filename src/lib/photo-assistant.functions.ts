import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const GEAR_OPTIONS = ["Smartphone", "Fujifilm", "Sony", "Canon", "DJI"] as const;
export type Gear = (typeof GEAR_OPTIONS)[number];

const InputSchema = z.object({
  spotName: z.string().min(1).max(200),
  cityName: z.string().min(1).max(120),
  area: z.string().min(1).max(120),
  whyPhotogenic: z.string().min(1).max(600),
  bestTimes: z.array(z.string().max(40)).max(8),
  gear: z.enum(GEAR_OPTIONS),
});

export interface AssistantPlan {
  bestLighting: string;
  composition: string[];
  cameraSettings: string;
  beginnerTips: string[];
  fujifilmRecipe: string;
  instagramChecklist: string[];
  gearNote: string;
}

const tool = {
  type: "function" as const,
  function: {
    name: "photo_plan",
    description: "Photography plan tailored to a specific spot and gear.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        bestLighting: { type: "string" },
        composition: { type: "array", items: { type: "string" } },
        cameraSettings: { type: "string" },
        beginnerTips: { type: "array", items: { type: "string" } },
        fujifilmRecipe: { type: "string" },
        instagramChecklist: { type: "array", items: { type: "string" } },
        gearNote: { type: "string" },
      },
      required: [
        "bestLighting",
        "composition",
        "cameraSettings",
        "beginnerTips",
        "fujifilmRecipe",
        "instagramChecklist",
        "gearNote",
      ],
    },
  },
};

export const generatePhotoPlan = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<AssistantPlan> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const system = `You are an expert travel photography assistant. Produce concise, actionable, location-specific advice. Adapt all recommendations to the user's gear. Avoid generic platitudes. Keep each list item under ~18 words.`;

    const user = `Spot: ${data.spotName}
Area: ${data.area}, ${data.cityName}
Why photogenic: ${data.whyPhotogenic}
Known best times: ${data.bestTimes.join(", ") || "any"}
User gear: ${data.gear}

Return a structured plan with:
- bestLighting: ideal time-of-day + lighting direction for this spot
- composition: 4 composition ideas specific to this spot
- cameraSettings: one-line recommendation tuned to ${data.gear} (focal length / aperture / shutter / ISO; for Smartphone use mode names + lens choice; for DJI use drone altitude + angle + ND if relevant)
- beginnerTips: 3 short, beginner-friendly tips
- fujifilmRecipe: a named Fujifilm film-sim recipe (sim + key settings) that suits this scene — ALWAYS include this regardless of user gear
- instagramChecklist: 5 punchy must-get shots for a great Instagram set here
- gearNote: one sentence on how to get the most out of ${data.gear} at this exact spot`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "photo_plan" } },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Rate limit reached — please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted for this workspace.");
      console.error("AI gateway error", res.status, text);
      throw new Error("AI assistant is unavailable right now.");
    }

    const json = await res.json();
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    const argsRaw = call?.function?.arguments;
    if (!argsRaw) throw new Error("Empty AI response");
    const parsed = typeof argsRaw === "string" ? JSON.parse(argsRaw) : argsRaw;
    return parsed as AssistantPlan;
  });