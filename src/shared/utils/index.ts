import type {
    BelongsToCollectionItem,
    GenreItem,
    Movie,
    MovieItem,
    ProductionCompanyItem,
    ProductionCountryItem,
    SpokenLanguageItem,
} from '@shared/types';

export function toMovieItem(val: any): MovieItem {
    return {
        adult: val.adult,
        backdropPath: val.backdrop_path,
        genreIds: val.genre_ids,
        id: val.id,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path,
        releaseDate: val.release_date,
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

export function toMovie(val: any): Movie {
    return {
        adult: val.adult,
        backdropPath: val.backdrop_path,
        belongsToCollection: val.belongs_to_collection,
        budget: val.budget,
        genres: val.genres,
        homepage: val.homepage,
        id: val.id,
        imdbId: val.imdb_id,
        originCountry: val.origin_country,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path,
        productionCompanies: val.production_companies,
        productionCountries: val.production_countries,
        releaseDate: new Date(val.release_date),
        revenue: val.revenue,
        runtime: val.runtime,
        spokenLanguages: val.spoken_languages,
        status: val.status,
        tagline: val.tagline,
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

export function toBelongsToCollectionItem(val: any): BelongsToCollectionItem {
    return {
        id: val.id,
        name: val.name,
        posterPath: val.poster_path,
        backdropPath: val.backdrop_path,
    };
}

export function toGenreItem(val: any): GenreItem {
    return {
        id: val.id,
        name: val.name,
    };
}

export function toProductionCompanyItem(val: any): ProductionCompanyItem {
    return {
        id: val.id,
        logoPath: val.logo_path,
        name: val.name,
        originCountry: val.origin_country,
    };
}

export function toProductionCountryItem(val: any): ProductionCountryItem {
    return {
        iso_3166_1: val.iso_3166_1,
        name: val.name,
    };
}

export function toSpokenLanguageItem(val: any): SpokenLanguageItem {
    return {
        englishName: val.english_name,
        iso_639_1: val.iso_639_1,
        name: val.name,
    };
}

export function getFormattedDate(date?: Date): string | undefined {
    return date?.toDateString() === 'Invalid Date'
        ? 'unknown'
        : date?.toDateString();
}
