import type { ImageDimensions } from '@shared/types';

export function getFormattedDate(date?: Date): string | undefined {
    return date?.toDateString() === 'Invalid Date'
        ? 'unknown'
        : date?.toDateString();
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
