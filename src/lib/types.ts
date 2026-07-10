export type Weekday =
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | "SUN"
  | "COMPLETED";

export type Genre =
  | "Drama"
  | "Romance"
  | "Action"
  | "Fantasy"
  | "Thriller"
  | "Comedy"
  | "Horror"
  | "Sci-Fi"
  | "Slice of Life"
  | "Supernatural";

export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  publishedAt: string;
  likes: number;
  /** Vertical panel image URLs (top → bottom) */
  panels: string[];
  isNew?: boolean;
  isFree?: boolean;
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  author: string;
  synopsis: string;
  cover: string;
  banner: string;
  genres: Genre[];
  weekday: Weekday;
  status: "ongoing" | "completed" | "hiatus";
  views: string;
  subscribers: string;
  rating: number;
  ageRating: "All" | "12+" | "15+" | "18+";
  isOriginal: boolean;
  isCanvas: boolean;
  featured?: boolean;
  episodes: Episode[];
}

export interface BannerSlide {
  id: string;
  seriesSlug: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
}
