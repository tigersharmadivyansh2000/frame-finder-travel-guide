import { Link } from "@tanstack/react-router";
import { Camera, Bookmark, MapPin } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-7 w-7 place-items-center rounded-md" style={{ background: "var(--gradient-sunset)" }}>
            <Camera className="h-4 w-4 text-background" strokeWidth={2.5} />
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            PhotoSpot<span className="text-primary"> AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            <span className="hidden sm:inline">Discover</span>
            <MapPin className="h-4 w-4 sm:hidden" />
          </Link>
          <Link
            to="/saved"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            activeProps={{ className: "text-foreground" }}
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}