import type {
    Genre,
    ImageDimensions,
    MediaElement,
    Media,
    MovieElement,
    MultiMediaElement,
    ProductionCountryElement,
    PaginationResponse,
    Language,
    TvShowElement,
    Images,
    MediaImage,
    Keyword,
    PersonElement,
    PersonElementBase,
    ReviewElement,
    AuthorDetails,
    Reviews,
    Review,
} from '@shared/types';
import {
    toMovieElement,
    toTvShowElement,
    toPersonElement,
} from '@shared/utils';
import { toPersonElementBase } from './PersonConverter';

export function addDays(date: Date, numberOfdays: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + numberOfdays);
    return result;
}

export function getISODate(date: Date) {
    return date.toISOString().slice(0, 10);
}

export function getFormattedDate(date?: Date): string {
    if (!date) {
        return 'Unknown';
    }

    return date.toDateString() === 'Invalid Date'
        ? 'Unknown'
        : date.toDateString();
}

export function getFormattedFullYear(date?: Date): string {
    if (!date) {
        return 'Unknown';
    }

    return date.toString() === 'Invalid Date'
        ? 'Unknown'
        : `${date.getFullYear()}`;
}

export function getFormattedVoteAverage(voteAverage?: number): string {
    if (!voteAverage) {
        return '0.0';
    }

    return voteAverage === 10 ? voteAverage.toString() : voteAverage.toFixed(1);
}

export function getFormattedMoney(amount?: number): string {
    return amount ? `${amount.toLocaleString()} USD` : '-';
}

export function getFormattedRuntime(
    runtime?: number,
    timeUnit: 'hour' | 'minute' = 'hour',
): string {
    if (!runtime) {
        return '-';
    }

    if (timeUnit === 'hour') {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }
    if (timeUnit === 'minute') {
        return runtime === 1 ? `${runtime} minute` : `${runtime} minutes`;
    }
    return 'Invalid time unit';
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

export function getFormattedGenres(
    genreIds: number[],
    genres: Genre[],
): (string | undefined)[] {
    if (genreIds.length === 0) {
        return ['Unknown'];
    }

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

export function normalizeMarkdown(text: string): string {
    const italicPattern = /<em>|<\/em>/gm;

    return text.replaceAll(italicPattern, '_');
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

export function isMovieElement(
    element: MediaElement,
): element is MovieElement & Media;

export function isMovieElement(
    element: MultiMediaElement,
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
    element: MultiMediaElement,
): element is TvShowElement & Media {
    return element?.mediaType === 'tv';
}

export function isPersonElement(
    element: MultiMediaElement,
): element is PersonElement & Media {
    return element?.mediaType === 'person' && 'knownFor' in element;
}

export function isPersonElementBase(
    element: MultiMediaElement,
): element is PersonElementBase & Media {
    return element?.mediaType === 'person';
}

export function toPaginationResponse<T>(val: any): PaginationResponse<T> {
    return {
        page: val.page,
        results: val.results,
        totalPages: val['total_pages'],
        totalResults: val['total_results'],
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

export function toLanguage(val: any): Language {
    return {
        englishName: val['english_name'],
        iso_639_1: val['iso_639_1'],
        name: val.name,
    };
}

export function toMediaElement(val: any): MediaElement {
    const elementValue: MovieElement | TvShowElement =
        val['media_type'] === 'movie'
            ? toMovieElement(val)
            : toTvShowElement(val);
    return {
        mediaType: val['media_type'],
        ...elementValue,
    };
}

export function toMultiMediaElement(val: any): MultiMediaElement {
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
    if (val['media_type'] === 'person' && 'known_for' in val) {
        return {
            mediaType: val['media_type'],
            ...toPersonElement(val),
        };
    }
    return {
        mediaType: val['media_type'],
        ...toPersonElementBase(val),
    };
}

export function toImages(val: any): Images {
    return {
        id: val.id,
        backdrops: Array.from(val.backdrops).map(element =>
            toMediaImage(element),
        ),
        logos: Array.from(val.logos).map(element => toMediaImage(element)),
        posters: Array.from(val.posters).map(element => toMediaImage(element)),
    };
}

export function toMediaImage(val: any): MediaImage {
    return {
        aspectRatio: val['aspect_ratio'],
        height: val.height,
        iso_639_1: val['iso_639_1'] ?? undefined,
        filePath: val['file_path'],
        voteAverage: val['vote_average'],
        voteCount: val['vote_count'],
        width: val.width,
    };
}

export function toKeyword(val: any): Keyword {
    return {
        id: val.id,
        name: val.name,
    };
}

export function toAuthorDetails(val: any): AuthorDetails {
    return {
        name: val.name,
        username: val.username,
        avatarPath: val['avatar_path'] ?? undefined,
        rating: val.rating ?? undefined,
    };
}

export function toReviews(val: any): Reviews {
    return {
        id: val.id,
        page: val.page,
        results: Array.from(val.results).map(element =>
            toReviewElement(element),
        ),
        totalPages: val['total_pages'],
        totalResults: val['total_results'],
    };
}

export function toReviewElement(val: any): ReviewElement {
    return {
        id: val.id,
        author: val.author,
        authorDetails: toAuthorDetails(val['author_details']),
        content: val.content,
        createdAt: new Date(val['created_at']),
        updatedAt: new Date(val['updated_at']),
        url: val.url,
    };
}

export function toReview(val: any): Review {
    return {
        id: val.id,
        author: val.author,
        authorDetails: toAuthorDetails(val['author_details']),
        content: val.content,
        createdAt: new Date(val['created_at']),
        updatedAt: new Date(val['updated_at']),
        url: val.url,
        iso_639_1: val['iso_639_1'],
        mediaId: val['media_id'],
        mediaTitle: val['media_title'],
        mediaType: val['media_type'],
    };
}

export * from './CollectionConverter';
export * from './CompanyConverter';
export * from './MovieConverter';
export * from './PersonConverter';
export * from './TvShowConverter';
