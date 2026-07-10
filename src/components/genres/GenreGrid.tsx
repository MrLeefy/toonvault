import Link from "next/link";
import { getGenres } from "@/lib/data";
import type { Genre } from "@/lib/types";

const tileColors = [
  "bg-amber-50 text-amber-900",
  "bg-rose-50 text-rose-900",
  "bg-sky-50 text-sky-900",
  "bg-emerald-50 text-emerald-900",
  "bg-orange-50 text-orange-900",
  "bg-cyan-50 text-cyan-900",
  "bg-lime-50 text-lime-900",
  "bg-pink-50 text-pink-900",
  "bg-teal-50 text-teal-900",
  "bg-red-50 text-red-900",
];

export function GenreGrid() {
  const genres = getGenres() as Genre[];

  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      {genres.map((genre, index) => (
        <Link
          key={genre}
          href={`/genres/${encodeURIComponent(genre)}`}
          className={`rounded-xl px-4 py-5 text-sm font-bold ${tileColors[index % tileColors.length]}`}
        >
          {genre}
        </Link>
      ))}
    </div>
  );
}
