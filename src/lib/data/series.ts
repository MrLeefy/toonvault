import type { Episode, Genre, Series, Weekday } from "@/lib/types";

type SeriesSeed = {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  genres: Genre[];
  weekday: Weekday;
  status: Series["status"];
  views: string;
  subscribers: string;
  rating: number;
  ageRating: Series["ageRating"];
  isOriginal: boolean;
  featured?: boolean;
  episodeCount: number;
};

function makeEpisodes(seriesId: string, count: number): Episode[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const id = `${seriesId}-ep-${number}`;

    return {
      id,
      number,
      title: number === 1 ? "The Beginning" : `Chapter ${number}`,
      thumbnail: `https://picsum.photos/seed/${id}/720/480`,
      publishedAt: `2026-${String(((number + 1) % 6) + 1).padStart(2, "0")}-${String(
        4 + number,
      ).padStart(2, "0")}`,
      likes: 1200 + number * 837,
      panels: Array.from(
        { length: 6 + (index % 5) },
        (_, panelIndex) =>
          `https://picsum.photos/seed/${id}-${panelIndex + 1}/720/1200`,
      ),
      isNew: index === count - 1,
      isFree: index < 3,
    };
  });
}

function makeSeries(seed: SeriesSeed): Series {
  const slug = seed.id;

  return {
    id: `series-${slug}`,
    slug,
    title: seed.title,
    author: seed.author,
    synopsis: seed.synopsis,
    cover: `https://picsum.photos/seed/${slug}/400/600`,
    banner: `https://picsum.photos/seed/${slug}b/800/450`,
    genres: seed.genres,
    weekday: seed.weekday,
    status: seed.status,
    views: seed.views,
    subscribers: seed.subscribers,
    rating: seed.rating,
    ageRating: seed.ageRating,
    isOriginal: seed.isOriginal,
    isCanvas: !seed.isOriginal,
    featured: seed.featured,
    episodes: makeEpisodes(slug, seed.episodeCount),
  };
}

const SERIES_SEEDS: SeriesSeed[] = [
  {
    id: "clockwork-harbor",
    title: "Clockwork Harbor",
    author: "Mira Venn",
    synopsis:
      "A dock mechanic discovers that the city's tide engines are counting down to a future only she can see.",
    genres: ["Fantasy", "Drama"],
    weekday: "MON",
    status: "ongoing",
    views: "12.4M",
    subscribers: "890K",
    rating: 9.8,
    ageRating: "12+",
    isOriginal: true,
    featured: true,
    episodeCount: 8,
  },
  {
    id: "after-school-alchemy",
    title: "After-School Alchemy",
    author: "Juniper Hale",
    synopsis:
      "Two scholarship students turn their abandoned chemistry club into a tiny shop for impossible favors.",
    genres: ["Comedy", "Fantasy", "Slice of Life"],
    weekday: "MON",
    status: "ongoing",
    views: "2.8M",
    subscribers: "214K",
    rating: 9.1,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 5,
  },
  {
    id: "neon-quiet",
    title: "Neon Quiet",
    author: "R. K. Sol",
    synopsis:
      "A sound engineer in a sleepless megacity hears secret messages hidden in the power grid's hum.",
    genres: ["Sci-Fi", "Thriller"],
    weekday: "TUE",
    status: "ongoing",
    views: "9.7M",
    subscribers: "671K",
    rating: 9.6,
    ageRating: "15+",
    isOriginal: true,
    featured: true,
    episodeCount: 7,
  },
  {
    id: "bloom-on-platform-nine",
    title: "Bloom on Platform Nine",
    author: "Aya Mercer",
    synopsis:
      "A florist who works at a train station keeps meeting the same traveler in different versions of Monday.",
    genres: ["Romance", "Supernatural"],
    weekday: "TUE",
    status: "ongoing",
    views: "1.6M",
    subscribers: "142K",
    rating: 8.9,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 6,
  },
  {
    id: "the-ash-courier",
    title: "The Ash Courier",
    author: "Dante Ibarra",
    synopsis:
      "A disgraced messenger crosses a kingdom of volcanic roads carrying a letter that can end a civil war.",
    genres: ["Action", "Fantasy"],
    weekday: "WED",
    status: "ongoing",
    views: "15.9M",
    subscribers: "1.1M",
    rating: 9.9,
    ageRating: "12+",
    isOriginal: true,
    featured: true,
    episodeCount: 8,
  },
  {
    id: "small-gods-big-city",
    title: "Small Gods, Big City",
    author: "Pia Bloom",
    synopsis:
      "A weary barista learns the regulars in her corner cafe are minor deities with very human problems.",
    genres: ["Comedy", "Supernatural"],
    weekday: "WED",
    status: "ongoing",
    views: "3.4M",
    subscribers: "265K",
    rating: 9.2,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 5,
  },
  {
    id: "glass-bloodline",
    title: "Glass Bloodline",
    author: "Noah Quill",
    synopsis:
      "An apprentice glassblower inherits a family curse that turns every lie she tells into a living weapon.",
    genres: ["Drama", "Supernatural", "Thriller"],
    weekday: "THU",
    status: "ongoing",
    views: "8.3M",
    subscribers: "543K",
    rating: 9.5,
    ageRating: "15+",
    isOriginal: true,
    episodeCount: 7,
  },
  {
    id: "late-fee-spirits",
    title: "Late Fee Spirits",
    author: "K. P. Wren",
    synopsis:
      "A library clerk must return overdue books to their ghostly borrowers before the moon goes dark.",
    genres: ["Comedy", "Horror"],
    weekday: "THU",
    status: "ongoing",
    views: "980K",
    subscribers: "88K",
    rating: 8.7,
    ageRating: "12+",
    isOriginal: false,
    episodeCount: 4,
  },
  {
    id: "wild-orbit",
    title: "Wild Orbit",
    author: "Sora Keene",
    synopsis:
      "The sole gardener aboard a colony ship finds a forest growing in an airlock that should be empty.",
    genres: ["Sci-Fi", "Action"],
    weekday: "FRI",
    status: "ongoing",
    views: "11.2M",
    subscribers: "801K",
    rating: 9.7,
    ageRating: "12+",
    isOriginal: true,
    featured: true,
    episodeCount: 8,
  },
  {
    id: "borrowed-sunlight",
    title: "Borrowed Sunlight",
    author: "Emi Rojas",
    synopsis:
      "A night-shift baker and a dawn photographer trade notes through a shared rooftop garden.",
    genres: ["Romance", "Slice of Life"],
    weekday: "FRI",
    status: "ongoing",
    views: "2.1M",
    subscribers: "176K",
    rating: 9.0,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 6,
  },
  {
    id: "hollow-crown-academy",
    title: "Hollow Crown Academy",
    author: "Violet March",
    synopsis:
      "At a school for future monarchs, a servant's daughter uncovers why every graduating class forgets one name.",
    genres: ["Fantasy", "Thriller", "Drama"],
    weekday: "SAT",
    status: "ongoing",
    views: "7.6M",
    subscribers: "492K",
    rating: 9.4,
    ageRating: "12+",
    isOriginal: true,
    episodeCount: 7,
  },
  {
    id: "mecha-grandma",
    title: "Mecha Grandma",
    author: "Toby Kwan",
    synopsis:
      "A retiree builds a giant robot from thrift-store parts to protect her neighborhood's community garden.",
    genres: ["Comedy", "Sci-Fi", "Action"],
    weekday: "SAT",
    status: "ongoing",
    views: "1.3M",
    subscribers: "109K",
    rating: 8.8,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 5,
  },
  {
    id: "paper-moon-detective",
    title: "Paper Moon Detective",
    author: "Celeste Noh",
    synopsis:
      "A private investigator who can step into drawings follows a case that keeps erasing evidence from reality.",
    genres: ["Thriller", "Supernatural", "Drama"],
    weekday: "SUN",
    status: "ongoing",
    views: "10.1M",
    subscribers: "745K",
    rating: 9.6,
    ageRating: "15+",
    isOriginal: true,
    featured: true,
    episodeCount: 8,
  },
  {
    id: "sunday-soup-club",
    title: "Sunday Soup Club",
    author: "Harper Dae",
    synopsis:
      "Five strangers cook one pot of soup each week and slowly become the family they did not know they needed.",
    genres: ["Slice of Life", "Drama"],
    weekday: "SUN",
    status: "ongoing",
    views: "760K",
    subscribers: "64K",
    rating: 8.6,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 4,
  },
  {
    id: "last-light-lighthouse",
    title: "Last Light Lighthouse",
    author: "Maren Slate",
    synopsis:
      "A lighthouse keeper guides ships through storms while hiding the fact that the sea has begun calling her name.",
    genres: ["Horror", "Supernatural"],
    weekday: "COMPLETED",
    status: "completed",
    views: "6.8M",
    subscribers: "421K",
    rating: 9.3,
    ageRating: "15+",
    isOriginal: true,
    episodeCount: 6,
  },
  {
    id: "the-mapmakers-daughter",
    title: "The Mapmaker's Daughter",
    author: "Iris Vale",
    synopsis:
      "A young cartographer redraws her vanished father's maps and opens paths into places that no longer exist.",
    genres: ["Fantasy", "Action"],
    weekday: "COMPLETED",
    status: "completed",
    views: "5.5M",
    subscribers: "337K",
    rating: 9.2,
    ageRating: "All",
    isOriginal: true,
    episodeCount: 7,
  },
  {
    id: "zero-hour-choir",
    title: "Zero Hour Choir",
    author: "Malik Stern",
    synopsis:
      "Teen singers in a flooded city discover their harmonies can stabilize the failing weather barrier.",
    genres: ["Sci-Fi", "Drama"],
    weekday: "COMPLETED",
    status: "completed",
    views: "4.2M",
    subscribers: "289K",
    rating: 9.0,
    ageRating: "12+",
    isOriginal: false,
    episodeCount: 6,
  },
  {
    id: "kingside-cafe",
    title: "Kingside Cafe",
    author: "Lena Park",
    synopsis:
      "A chess prodigy hiding from fame takes a job at a neighborhood cafe and finds a rival worth staying for.",
    genres: ["Romance", "Drama", "Slice of Life"],
    weekday: "COMPLETED",
    status: "completed",
    views: "3.9M",
    subscribers: "302K",
    rating: 8.9,
    ageRating: "All",
    isOriginal: false,
    episodeCount: 5,
  },
];

export const SERIES: Series[] = SERIES_SEEDS.map(makeSeries);
