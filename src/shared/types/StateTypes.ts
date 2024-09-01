import { CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[];
        companies?: CompanyElement[];
    };
    searchContent: string;
};

export type MovieDetailScreenState = {
    movie?: Movie;
};

export type ExpandableTextState = {
    isExpand: boolean;
};
