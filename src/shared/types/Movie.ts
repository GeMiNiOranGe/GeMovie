export type MovieItem = {
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
};

export type Movie = {
    adult: boolean;
    backdropPath: string;
    belongsToCollection: BelongsToCollectionItem;
    budget: number;
    genres: GenreItem[];
    homepage: string;
    id: number;
    imdbId: string;
    originCountry: string[];
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    productionCompanies: ProductionCompanyItem[];
    productionCountries: ProductionCountryItem[];
    releaseDate: Date;
    revenue: number;
    runtime: number;
    spokenLanguages: SpokenLanguageItem[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
};

export type BelongsToCollectionItem = {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
};

export type GenreItem = {
    id: number;
    name: string;
};

export type ProductionCompanyItem = {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
};

export type ProductionCountryItem = {
    iso_3166_1: string;
    name: string;
};

export type SpokenLanguageItem = {
    englishName: string;
    iso_639_1: string;
    name: string;
};
