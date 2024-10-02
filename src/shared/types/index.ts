import type { ColorValue } from 'react-native';
import type { DebouncedFunc } from 'lodash';

import type { SearchResponseWrapper } from '@services';
import type {
    CompanyElement,
    PersonElement,
    MovieElement,
    TvShowElement,
} from '@shared/types';

export type ImageSize = {
    w45: string;
    w92: string;
    w154: string;
    w185: string;
    w300: string;
    w342: string;
    w500: string;
    w780: string;
    w1280: string;
    original: string;
    h632: string;
};

export type ImageDimensions = {
    width: number;
    height: number;
};

export type Spacing = {
    tiny: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    huge: number;
    extraHuge: number;
};

export type ThemeColor = {
    primary: ColorValue;
    secondary: ColorValue;
    accent: {
        light: ColorValue;
        dark: ColorValue;
    };
    background: ColorValue;
    text: ColorValue;
    subtext: ColorValue;
    neutral: ColorValue;
};

export type SearchType =
    | 'multi'
    | 'movie'
    | 'tv'
    | 'person'
    | 'company'
    | 'collection'
    | 'keyword';

export type DetailType =
    | 'movie'
    | 'tv'
    | 'person'
    | 'company'
    | 'collection'
    | 'keyword';

export type Variant =
    | 'Linear'
    | 'Outline'
    | 'Broken'
    | 'Bold'
    | 'Bulk'
    | 'TwoTone';

export type SearchAsync<T> = (
    content: string,
    page?: number,
) => Promise<SearchResponseWrapper<T>>;

export type DebouncedSearch = DebouncedFunc<(content: string) => Promise<void>>;

export type Media = {
    mediaType: string;
};

export type SearchResponse<T> = {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
};

export type SearchElement = MediaElement | PersonElement | CompanyElement;

export type MediaElement = {
    adult: boolean;
    backdropPath?: string | undefined;
    id: number;
    originalLanguage: string;
    overview: string;
    posterPath?: string | undefined;
};

export type VideoElementBase = MediaElement & {
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
};

export type MultiSearchElement = (
    | MovieElement
    | TvShowElement
    | PersonElement
) &
    Media;

export * from './PropsTypes';
export * from './StateTypes';
export * from './Movie';
export * from './TvShow';
export * from './Company';
export * from './Collection';
export * from './Person';
