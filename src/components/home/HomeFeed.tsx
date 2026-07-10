import {
  getAllSeries,
  getBanners,
  getCanvas,
  getFeaturedSeries,
  getOriginals,
  getPopular,
} from "@/lib/data";
import { DailyList } from "./DailyList";
import { HeroBanner } from "./HeroBanner";
import { SeriesRow } from "./SeriesRow";

export function HomeFeed() {
  const banners = getBanners();
  const series = getAllSeries();
  const originals = getOriginals();
  const canvas = getCanvas();
  const popular = getPopular();
  const featured = getFeaturedSeries();

  return (
    <main className="bg-white">
      <HeroBanner banners={banners} />
      <DailyList series={series} />
      <SeriesRow title="Originals" series={originals} moreHref="/genres" />
      <SeriesRow title="Canvas" series={canvas} moreHref="/genres" />
      <SeriesRow title="Popular" series={popular} moreHref="/genres" />
      <SeriesRow title="New & Trending" series={featured} />
    </main>
  );
}
