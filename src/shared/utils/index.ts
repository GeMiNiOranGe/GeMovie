import { GenreService } from '@services';
import type {
    BelongsToCollection,
    Genre,
    ImageDimensions,
    KnownForElement,
    Media,
    MovieElement,
    MultiSearchElement,
    ProductionCountryElement,
    SearchResponse,
    SpokenLanguageElement,
    TvShowElement,
} from '@shared/types';
import {
    toMovieElement,
    toTvShowElement,
    toPersonElement,
} from '@shared/utils';

export function getFormattedDate(date?: Date): string | undefined {
    return date?.toDateString() === 'Invalid Date'
        ? 'Unknown'
        : date?.toDateString();
}

export function getFormattedFullYear(date?: Date): string | number | undefined {
    return date?.toString() === 'Invalid Date'
        ? 'Unknown'
        : date?.getFullYear();
}

export function getFormattedVoteAverage(voteAverage: number): string | number {
    return voteAverage === 10 ? voteAverage : voteAverage.toFixed(1);
}

export function getFormattedGender(genderNumber: number): string {
    if (genderNumber === 1) {
        return 'Female';
    }
    if (genderNumber === 2) {
        return 'Male';
    }
    if (genderNumber === 3) {
        return 'Non-binary';
    }
    return 'Not specified';
}

export function getFormattedGenres(genreIds: number[]): (string | undefined)[] {
    if (genreIds.length === 0) {
        return ['Unknown'];
    }

    const genres: Genre[] = GenreService.instance.getGenres();

    const genreTuples: [number, string][] = genres.map(genre => [
        genre.id,
        genre.name,
    ]);

    const genreMap = new Map(genreTuples);

    return genreIds.map(id => genreMap.get(id)).filter(Boolean);
}

export const getRandomHeight = (
    min: number = 150,
    max: number = 300,
): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

export function isMovieElement(
    element: KnownForElement,
): element is MovieElement & Media;

export function isMovieElement(
    element: MultiSearchElement,
): element is MovieElement & Media;

export function isMovieElement(
    element: unknown,
): element is MovieElement & Media {
    return (
        'mediaType' in (element as Media) &&
        (element as Media).mediaType === 'movie'
    );
}

export function isTvShowElement(
    element: MultiSearchElement,
): element is TvShowElement & Media {
    return element?.mediaType === 'tv';
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

export function toGenre(val: any): Genre {
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

export function toMultiSearchElement(val: any): MultiSearchElement {
    if (val['media_type'] === 'movie') {
        return {
            mediaType: val['media_type'],
            ...toMovieElement(val),
        };
    }
    if (val['media_type'] === 'tv') {
        return {
            mediaType: val['media_type'],
            ...toTvShowElement(val),
        };
    }
    return {
        mediaType: val['media_type'],
        ...toPersonElement(val),
    };
}

export * from './CollectionConverter';
export * from './CompanyConverter';
export * from './MovieConverter';
export * from './PersonConverter';
export * from './TvShowConverter';
