import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { SpotCard } from "@/components/SpotCard";
import { useLocalStorage } from "@/lib/use-local-storage";
import { getAllSpots } from "@/lib/photospot-data";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved spots — PhotoSpot AI" },
      { name: "description", content: "Your saved photography locations." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { value: savedIds, hydrated } = useLocalStorage<string[]>("photospot:saved", []);
  const spots = getAllSpots().filter((s) => savedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-primary">Your collection</p>
        <h1 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">Saved spots</h1>
        <p className="mt-2 text-muted-foreground">Bookmarked locations across every city you've explored.</p>

        <div className="mt-8">
          {!hydrated ? null : spots.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
              <Bookmark className="mx-auto h-8 w-8 text-muted-foreground" />
              <h2 className="mt-4 font-display text-xl font-semibold">Nothing saved yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tap the bookmark on any spot to keep it here.</p>
              <Link to="/" className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Browse cities
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {spots.map((s) => (
                <SpotCard key={s.id} spot={s} citySlug={s.citySlug} cityName={s.cityName} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}