import { Movie, MovieElement } from './Movie';

export type SearchScreenState = {
    movies: MovieElement[];
    searchContent: string;
    isSearchBarOpen: boolean;
};

export type MovieDetailScreenState = {
    movie?: Movie;
};

export type ExpandableTextState = {
    isExpand: boolean;
};
