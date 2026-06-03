import tokyo from "@/assets/city-tokyo.jpg";
import kyoto from "@/assets/city-kyoto.jpg";
import hanoi from "@/assets/city-hanoi.jpg";
import danang from "@/assets/city-danang.jpg";
import bengaluru from "@/assets/city-bengaluru.jpg";
import bali from "@/assets/city-bali.jpg";

export const CITY_IMAGES: Record<string, string> = {
  tokyo,
  kyoto,
  hanoi,
  "da-nang": danang,
  bengaluru,
  bali,
};

export function cityImage(slug: string): string | undefined {
  return CITY_IMAGES[slug];
}