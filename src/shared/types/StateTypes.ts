import { Route } from 'react-native-tab-view';

import { Company, CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';
import { Celebrity, KnownFor } from './Celebrity';
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

export type CompanyDetailScreenState = {
    company?: Company | undefined;
    movies?: Movie[] | undefined;
    randomMovie?: Movie | undefined;
};

export type CelebrityDetailScreenState = {
    celebrity?: Celebrity | undefined;
    movies: KnownFor[];
};
