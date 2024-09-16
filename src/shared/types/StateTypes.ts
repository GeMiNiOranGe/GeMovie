import { CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[] | undefined;
        companies?: CompanyElement[] | undefined;
    };
    searchContent: string;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type ExpandableTextState = {
    isExpand: boolean;
};
