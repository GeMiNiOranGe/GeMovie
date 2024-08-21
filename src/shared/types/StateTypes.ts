import { MovieItem } from './Movie';

export type SearchScreenState = {
    movies: MovieItem[];
    searchContent: string;
};
