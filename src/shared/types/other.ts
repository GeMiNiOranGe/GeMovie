import { Movie } from './movie';

export type SearchPage = {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
};
