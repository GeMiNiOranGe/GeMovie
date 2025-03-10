import type {
    Keyword,
    Optional,
    SimpleCollection,
    VideoBase,
    VideoElementBase,
    VideoGenreIds,
} from '@shared/types';

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
    vote_average?: number;
    vote_count?: number;
};

export type Movie = VideoBase &
    MovieBase & {
        originCountry: string[];
        imdbId: Optional<string>;
        belongsToCollection: Optional<SimpleCollection>;
        budget: number;
        revenue: number;
        runtime: number;
        keywords: {
            keywords: Keyword[];
        };
    };
