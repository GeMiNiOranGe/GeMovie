import type { CompanyElement } from './Company';

export type MovieElement = {
    media_type: string;
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: Date;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
};
export type FeaturedMovie = {
    media_type: string;
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
};
export type Movie = {
    adult: boolean;
    backdropPath?: string | undefined;
    belongsToCollection?: BelongsToCollection | undefined;
    budget: number;
    genres: GenreElement[];
    homepage: string;
    id: number;
    imdbId?: string | undefined;
    originCountry: string[];
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath?: string | undefined;
    productionCompanies: CompanyElement[];
    productionCountries: ProductionCountryElement[];
    releaseDate: Date;
    revenue: number;
    runtime: number;
    spokenLanguages: SpokenLanguageElement[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
};

export type BelongsToCollection = {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
};

export type GenreElement = {
    id: number;
    name: string;
};

export type ProductionCountryElement = {
    iso_3166_1: string;
    name: string;
};

export type SpokenLanguageElement = {
    englishName: string;
    iso_639_1: string;
    name: string;
};
