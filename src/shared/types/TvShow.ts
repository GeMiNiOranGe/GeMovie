import { VideoElementBase, VideoGenreIds } from '@shared/types';

export type TvShowElementBase = VideoElementBase & {
    originalName: string;
    name: string;
    firstAirDate: Date;
    originCountry: string[];
};

export type TvShowElement = TvShowElementBase & VideoGenreIds;

export type FeaturedTvShow = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
