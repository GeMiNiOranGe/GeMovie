import type {
    BelongsToCollection,
    GenreElement,
    ImageDimensions,
    Movie,
    MovieElement,
    CompanyElement,
    ProductionCountryElement,
    SearchPage,
    SpokenLanguageElement,
} from '@shared/types';

export function toSearchPage(val: any): SearchPage {
    return {
        page: val.page,
        results: val.results,
        totalPages: val.total_pages,
        totalResults: val.total_results,
    };
}

export function toMovieElement(val: any): MovieElement {
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
        releaseDate: new Date(val.release_date),
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

export function toMovie(val: any): Movie {
    return {
        adult: val.adult,
        backdropPath: val.backdrop_path ?? undefined,
        belongsToCollection: toBelongsToCollection(val.belongs_to_collection),
        budget: val.budget,
        genres: val.genres,
        homepage: val.homepage,
        id: val.id,
        imdbId: val.imdb_id ?? undefined,
        originCountry: val.origin_country,
        originalLanguage: val.original_language,
        originalTitle: val.original_title,
        overview: val.overview,
        popularity: val.popularity,
        posterPath: val.poster_path ?? undefined,
        productionCompanies: Array.from(val.production_companies).map(element =>
            toCompanyElement(element),
        ),
        productionCountries: Array.from(val.production_countries).map(element =>
            toProductionCountryElement(element),
        ),
        releaseDate: new Date(val.release_date),
        revenue: val.revenue,
        runtime: val.runtime,
        spokenLanguages: Array.from(val.spoken_languages).map(element =>
            toSpokenLanguageElement(element),
        ),
        status: val.status,
        tagline: val.tagline,
        title: val.title,
        video: val.video,
        voteAverage: val.vote_average,
        voteCount: val.vote_count,
    };
}

export function toBelongsToCollection(
    val: any,
): BelongsToCollection | undefined {
    if (!val) {
        return undefined;
    }

    return {
        id: val.id,
        name: val.name,
        posterPath: val.poster_path,
        backdropPath: val.backdrop_path,
    };
}

export function toGenreElement(val: any): GenreElement {
    return {
        id: val.id,
        name: val.name,
    };
}

export function toCompanyElement(val: any): CompanyElement {
    return {
        id: val.id,
        logoPath: val.logo_path ?? undefined,
        name: val.name,
        originCountry: val.origin_country,
    };
}

export function toProductionCountryElement(val: any): ProductionCountryElement {
    return {
        iso_3166_1: val.iso_3166_1,
        name: val.name,
    };
}

export function toSpokenLanguageElement(val: any): SpokenLanguageElement {
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

export function calculateImageDimensions(
    pixel: number,
    horizontalRatio: number,
    verticalRatio: number,
): ImageDimensions {
    return {
        width: pixel,
        height: (pixel / horizontalRatio) * verticalRatio,
    };
}
