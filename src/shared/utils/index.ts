import type {
    BelongsToCollection,
    GenreElement,
    ImageDimensions,
    KnownForElement,
    MovieElement,
    ProductionCountryElement,
    SearchResponse,
    SpokenLanguageElement,
    TvShowElement,
} from '@shared/types';
import { toMovieElement, toTvShowElement } from '@shared/utils';

export function getFormattedDate(date?: Date): string | undefined {
    return date?.toDateString() === 'Invalid Date'
        ? 'unknown'
        : date?.toDateString();
}

export function getFormattedFullYear(date?: Date): string | number | undefined {
    return date?.toString() === 'Invalid Date'
        ? 'unknown'
        : date?.getFullYear();
}

export function getFormattedVoteAverage(voteAverage: number): string | number {
    return voteAverage === 10 ? voteAverage : voteAverage.toFixed(1);
}

export function calculateImageDimensions(
    pixel: number,
    horizontalRatio: number = 1,
    verticalRatio: number = 1,
): ImageDimensions {
    return {
        width: pixel,
        height: (pixel / horizontalRatio) * verticalRatio,
    };
}

export function toSearchResponse<T>(val: any): SearchResponse<T> {
    return {
        page: val.page,
        results: val.results,
        totalPages: val['total_pages'],
        totalResults: val['total_results'],
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
        posterPath: val['poster_path'],
        backdropPath: val['backdrop_path'],
    };
}

export function toGenreElement(val: any): GenreElement {
    return {
        id: val.id,
        name: val.name,
    };
}

export function toProductionCountryElement(val: any): ProductionCountryElement {
    return {
        iso_3166_1: val['iso_3166_1'],
        name: val.name,
    };
}

export function toSpokenLanguageElement(val: any): SpokenLanguageElement {
    return {
        englishName: val['english_name'],
        iso_639_1: val['iso_639_1'],
        name: val.name,
    };
}

export function toKnownForElement(val: any): KnownForElement {
    const elementValue: MovieElement | TvShowElement =
        val['media_type'] === 'movie'
            ? toMovieElement(val)
            : toTvShowElement(val);
    return {
        mediaType: val['media_type'],
        ...elementValue,
    };
}

export * from './CollectionConverter';
export * from './CompanyConverter';
export * from './MovieConverter';
export * from './PersonConverter';
export * from './TvShowConverter';
