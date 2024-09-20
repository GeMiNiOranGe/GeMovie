import type { Company, CompanyElement } from './Company';
import type { Movie, MovieElement } from './Movie';
import type { TvShowElement } from './TvShow';
import type { Celebrity, KnownFor } from './Celebrity';

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

export type CompanyDetailScreenState = {
    company?: Company | undefined;
    movies?: Movie[] | undefined;
    randomMovie?: Movie | undefined;
};

export type CelebrityDetailScreenState = {
    celebrity?: Celebrity | undefined;
    movies: KnownFor[];
};
