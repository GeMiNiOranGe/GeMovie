import { MovieItem } from './Movie';

export type SearchPage = {
    page: number;
    results: MovieItem[];
    totalPages: number;
    totalResults: number;
};

export type ImageSize = {
    w45: string;
    w92: string;
    w154: string;
    w185: string;
    w300: string;
    w342: string;
    w500: string;
    w780: string;
    w1280: string;
    original: string;
    h632: string;
};

export type Spacing = {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
};
