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

export type Colors = {
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

export type FontSizes = {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    body: number;
    small: number;
    extraSmall: number;
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

export type CardElement = MediaElementBase | PersonElement | CompanyElement;

export type MediaElementBase = {
    adult: boolean;
    backdropPath?: string | undefined;
    id: number;
    originalLanguage: string;
    overview: string;
    posterPath?: string | undefined;
};

export type MediaElement = (TvShowElement | MovieElement) & Media;

export type VideoBase = {
    genres: Genre[];
    homepage: string;
    productionCompanies: CompanyElement[];
    productionCountries: ProductionCountryElement[];
    spokenLanguages: Language[];
    status: string;
    tagline: string;
};

export type VideoElementBase = MediaElementBase & {
    voteAverage: number;
    voteCount: number;
    popularity: number;
};

export type VideoGenreIds = {
    genreIds: number[];
};

export type VideoElement = VideoElementBase & VideoGenreIds;

export type MultiSearchElement = (
    | MovieElement
    | TvShowElement
    | PersonElement
) &
    Media;

export type Genre = {
    id: number;
    name: string;
};

export type Language = {
    englishName: string;
    iso_639_1: string;
    name: string;
};

export type ProductionCountryElement = {
    iso_3166_1: string;
    name: string;
};

export * from './PropsTypes';
export * from './StateTypes';
export * from './Movie';
export * from './TvShow';
export * from './Company';
export * from './Collection';
export * from './Person';
