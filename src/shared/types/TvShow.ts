export type TvShowElement = {
    media_type: string;
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    id: number;
    originCountry: string[];
    originalLanguage: string;
    originalName: string;
    overview: string;
    popularity: number;
    posterPath: string;
    firstAirDate: Date;
    name: string;
    voteAverage: number;
    voteCount: number;
};

export type FeaturedTvShow = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
