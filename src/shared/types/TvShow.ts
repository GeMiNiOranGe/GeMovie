import {
    Keyword,
    Optional,
    VideoBase,
    VideoElementBase,
    VideoGenreIds,
} from '@shared/types';

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
        lastEpisodeToAir: Optional<EpisodeToAir>;
        nextEpisodeToAir: Optional<EpisodeToAir>;
        networks: NetworkElement[];
        numberOfEpisodes: number;
        numberOfSeasons: number;
        seasons: SeasonElement[];
        type: string;
        keywords: {
            results: Keyword[];
        };
    };

export type CreatedBy = {
    id: number;
    creditId: string;
    name: string;
    originalName: string;
    gender: number;
    profilePath: Optional<string>;
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
    runtime: Optional<number>;
    seasonNumber: number;
    showId: number;
    stillPath: Optional<string>;
};

export type NetworkElement = {
    id: number;
    logoPath: Optional<string>;
    name: string;
    originCountry: string;
};

export type SeasonElement = {
    airDate: Date;
    episodeCount: number;
    id: number;
    name: string;
    overview: string;
    posterPath: Optional<string>;
    seasonNumber: number;
    voteAverage: number;
};

export type Network = NetworkElement & {
    headquarters: string;
    homepage: string;
};

export type FeaturedTvShow = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
