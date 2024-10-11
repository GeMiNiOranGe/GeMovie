import type { VideoBase, VideoElementBase, VideoGenreIds } from '@shared/types';

export type MovieBase = VideoElementBase & {
    originalTitle: string;
    title: string;
    releaseDate: Date;
    video: boolean;
};

export type MovieElement = MovieBase & VideoGenreIds;

export type FeaturedMovie = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};

export type Movie = VideoBase &
    MovieBase & {
        originCountry: string[];
        imdbId?: string | undefined;
        belongsToCollection?: BelongsToCollection | undefined;
        budget: number;
        revenue: number;
        runtime: number;
    };

export type BelongsToCollection = {
    id: number;
    name: string;
    posterPath?: string | undefined;
    backdropPath?: string | undefined;
};
