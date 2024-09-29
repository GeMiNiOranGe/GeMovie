import { VideoElementBase } from '@shared/types';

export type TvShowElement = VideoElementBase & {
    originalName: string;
    name: string;
    firstAirDate: Date;
    originCountry: string[];
};

export type FeaturedTvShow = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
