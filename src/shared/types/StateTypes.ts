import { Route } from 'react-native-tab-view';

import { CompanyElement } from './Company';
import { Movie, MovieElement } from './Movie';

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
