import Link from "next/link";
import { GenreGrid } from "@/components/genres/GenreGrid";
import { GenreSeriesList } from "@/components/genres/GenreSeriesList";
import { getPopular } from "@/lib/data";

export default function GenresPage() {
  return (
    <section className="pb-8">
      <header className="px-5 pb-5 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">Discover</h1>
        <p className="mt-1 text-sm text-tv-muted">Find your next favorite story.</p>
      </header>
      <GenreGrid />
      <div className="mt-9">
        <div className="mb-4 flex items-center justify-between px-5">
          <h2 className="text-lg font-bold">Popular now</h2>
          <Link href="/" className="text-sm font-medium text-tv-green-dark">
            See all
          </Link>
        </div>
        <GenreSeriesList series={getPopular()} />
      </div>
    </section>
  );
}
