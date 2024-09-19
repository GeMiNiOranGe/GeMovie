import { CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';
import { TvShowElement } from './TvShow';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[] | undefined;
    };
    searchContent: string;
};

export type TvShowSearchResultsTopTabState = {
    tvShows?: TvShowElement[] | undefined;
};

export type CompanySearchResultsTopTabState = {
    companies?: CompanyElement[] | undefined;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type ExpandableTextState = {
    isExpand: boolean;
};
