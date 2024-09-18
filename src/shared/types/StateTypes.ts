import { Route } from 'react-native-tab-view';

import { Company, CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';
import { Celebrity, KnownFor } from './Celebrity';

export type SearchScreenState = {
    results: {
        movies?: MovieElement[] | undefined;
        companies?: CompanyElement[] | undefined;
    };
    searchContent: string;
    index: number;
    routes: Route[];
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
