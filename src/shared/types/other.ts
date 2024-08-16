import { Movie } from './movie';

export type SearchPage = {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
};

export type ImageSizeType = {
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
