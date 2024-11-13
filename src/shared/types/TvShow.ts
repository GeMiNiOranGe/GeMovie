import {
    CompanyElement,
    Language,
    NetworkElement,
    VideoElementBase,
    VideoGenreIds,
} from '@shared/types';

export type TvShowElementBase = VideoElementBase & {
    originalName: string;
    name: string;
    firstAirDate: Date;
    originCountry: string[];
    homepage?: string;
    genres: any[];
    seasons?: Season[];
    productionCompanies: CompanyElement[];
    status?: string;
    spokenLanguages: Language[];
    networks?: NetworkElement[];
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

export type Season = {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
};
