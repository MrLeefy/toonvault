"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReadingProgress = Record<
  string,
  {
    episodeId: string;
    updatedAt: string;
  }
>;

interface LibraryStore {
  subscribedSlugs: string[];
  likedEpisodeIds: string[];
  readingProgress: ReadingProgress;
  recentlyViewed: string[];
  toggleSubscribe: (slug: string) => void;
  isSubscribed: (slug: string) => boolean;
  toggleLikeEpisode: (episodeId: string) => void;
  isLiked: (episodeId: string) => boolean;
  setProgress: (slug: string, episodeId: string) => void;
  getProgress: (slug: string) => ReadingProgress[string] | undefined;
  addRecent: (slug: string) => void;
  clearLibrary: () => void;
}

const initialState = {
  subscribedSlugs: [] as string[],
  likedEpisodeIds: [] as string[],
  readingProgress: {} as ReadingProgress,
  recentlyViewed: [] as string[],
};

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleSubscribe: (slug) => {
        set((state) => ({
          subscribedSlugs: state.subscribedSlugs.includes(slug)
            ? state.subscribedSlugs.filter((currentSlug) => currentSlug !== slug)
            : [...state.subscribedSlugs, slug],
        }));
      },
      isSubscribed: (slug) => get().subscribedSlugs.includes(slug),
      toggleLikeEpisode: (episodeId) => {
        set((state) => ({
          likedEpisodeIds: state.likedEpisodeIds.includes(episodeId)
            ? state.likedEpisodeIds.filter((currentId) => currentId !== episodeId)
            : [...state.likedEpisodeIds, episodeId],
        }));
      },
      isLiked: (episodeId) => get().likedEpisodeIds.includes(episodeId),
      setProgress: (slug, episodeId) => {
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [slug]: { episodeId, updatedAt: new Date().toISOString() },
          },
        }));
      },
      getProgress: (slug) => get().readingProgress[slug],
      addRecent: (slug) => {
        set((state) => ({
          recentlyViewed: [
            slug,
            ...state.recentlyViewed.filter((currentSlug) => currentSlug !== slug),
          ].slice(0, 20),
        }));
      },
      clearLibrary: () => set(initialState),
    }),
    {
      name: "toonvault-library",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
