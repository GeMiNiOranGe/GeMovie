import { CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';
import { TvShowElement } from './TvShow';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[] | undefined;
        tvShows?: TvShowElement[] | undefined;
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
