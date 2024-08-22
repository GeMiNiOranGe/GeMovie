import { Movie, MovieItem } from './Movie';

export type SearchScreenState = {
    movies: MovieItem[];
    searchContent: string;
};

export type MovieDetailScreenState = {
    movie?: Movie;
};
