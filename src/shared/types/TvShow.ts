export type TvShowElement = {
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    overview: string;
    popularity: number;
    posterPath: string;
    voteAverage: number;
    voteCount: number;
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
