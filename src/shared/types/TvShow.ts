import { VideoBase, VideoElementBase, VideoGenreIds } from '@shared/types';

export type TvShowBase = VideoElementBase & {
    originalName: string;
    name: string;
    firstAirDate: Date;
    originCountry: string[];
};

export type TvShowElement = TvShowBase & VideoGenreIds;

export type TvShow = TvShowBase &
    VideoBase & {
        createdBy: CreatedBy[];
        episodeRunTime: number[];
        inProduction: boolean;
        languages: string[];
        lastAirDate: Date;
        lastEpisodeToAir: EpisodeToAir;
        nextEpisodeToAir: EpisodeToAir | undefined;
        networks: NetworkElement[];
        numberOfEpisodes: number;
        numberOfSeasons: number;
        seasons: SeasonElement[];
        type: string;
    };

export type CreatedBy = {
    id: number;
    creditId: string;
    name: string;
    originalName: string;
    gender: number;
    profilePath: string | undefined;
};

export type EpisodeToAir = {
    id: number;
    name: string;
    overview: string;
    voteAverage: number;
    voteCount: number;
    airDate: Date;
    episodeNumber: number;
    episodeType: string;
    productionCode: string;
    runtime: number;
    seasonNumber: number;
    showId: number;
    stillPath: string | undefined;
};

export type NetworkElement = {
    id: number;
    logoPath: string | undefined;
    name: string;
    originCountry: string;
};

export type SeasonElement = {
    airDate: Date;
    episodeCount: number;
    id: number;
    name: string;
    overview: string;
    posterPath: string | undefined;
    seasonNumber: number;
    voteAverage: number;
};

export type FeaturedTvShow = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
