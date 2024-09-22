import type {
    CollectionElement,
    Company,
    CompanyElement,
    KnownFor,
    Movie,
    MovieElement,
    Person,
    TvShowElement,
} from '@shared/types';

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
    companies: CompanyElement[];
    isFetchingNextPage: boolean;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type CollectionSearchResultsTopTabState = {
    collections?: CollectionElement[] | undefined;
};

export type ExpandableTextState = {
    isExpand: boolean;
};

export type CompanyDetailScreenState = {
    company?: Company | undefined;
    movies?: Movie[] | undefined;
    randomMovie?: Movie | undefined;
};

export type PersonDetailScreenState = {
    person?: Person | undefined;
    movies: KnownFor[];
};
