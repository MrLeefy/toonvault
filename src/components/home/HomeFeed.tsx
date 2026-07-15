import {
  getAllSeries,
  getBanners,
  getCanvas,
  getOriginals,
  getPopular,
} from "@/lib/data";
import { DailyList } from "./DailyList";
import { HeroBanner } from "./HeroBanner";
import { SeriesRow } from "./SeriesRow";
import { TrendingList } from "./TrendingList";

export function HomeFeed() {
  const banners = getBanners();
  const series = getAllSeries();
  const originals = getOriginals();
  const canvas = getCanvas();
  const popular = getPopular();

  return (
    <main className="bg-white pb-2">
      <HeroBanner banners={banners} />
      <DailyList series={series} />
      <TrendingList series={popular} />
      <SeriesRow title="Originals" series={originals} moreHref="/genres" showRank />
      <SeriesRow title="Canvas" series={canvas} moreHref="/genres" />
      <SeriesRow title="New & Trending" series={popular.slice(0, 10)} />
    </main>
  );
}
