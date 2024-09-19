import type { ImageDimensions } from '@shared/types';

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

export * from './CompanyConverter';
export * from './Converter';
export * from './MovieConverter';
export * from './TvShowConverter';
