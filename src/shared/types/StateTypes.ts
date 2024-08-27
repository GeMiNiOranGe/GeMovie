import { Movie, MovieElement } from './Movie';

export type SearchScreenState = {
    movies: MovieElement[];
    searchContent: string;
};

export type MovieDetailScreenState = {
    movie?: Movie;
};

export type ExpandableTextState = {
    isExpand: boolean;
};
