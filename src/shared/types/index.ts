import type { ColorValue } from 'react-native';
import type { DebouncedFunc } from 'lodash';

import type { PaginationResponseWrapper } from '@services';
import type {
    CompanyElement,
    PersonElementBase,
    MovieElement,
    TvShowElement,
    SeasonElement,
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
    | 'keyword'
    | 'review'
    | 'network';

export type VideoType = 'movie' | 'tv';

export type PopularType = 'movie' | 'tv' | 'person';

export type TrendingType = 'all' | 'movie' | 'tv' | 'person';

export type TimeWindow = 'day' | 'week';

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
) => Promise<PaginationResponseWrapper<T>>;

export type DebouncedSearch = DebouncedFunc<(content: string) => Promise<void>>;

// TODO: add `null` if needed
export type Optional<T> = T | undefined;

export type ConvertFn<T> = (val: any) => T;

export type PropsComponent =
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

export type OnEndReached =
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;

export type SortBy =
    | 'original_title.asc'
    | 'original_title.desc'
    | 'popularity.asc'
    | 'popularity.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'title.asc'
    | 'title.desc'
    | 'primary_release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';

export type Media = {
    mediaType: string;
};

export type PaginationResponse<E> = {
    page: number;
    results: E[];
    totalPages: number;
    totalResults: number;
};

export type CardElement =
    | MediaElementBase
    | PersonElementBase
    | CompanyElement
    | SeasonElement;

export type MediaElementBase = {
    adult: boolean;
    backdropPath: Optional<string>;
    id: number;
    originalLanguage: string;
    overview: string;
    posterPath: Optional<string>;
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

export type MultiMediaElement = (VideoElementBase | PersonElementBase) & Media;

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

export type Images = {
    id: number;
    backdrops: MediaImage[];
    logos: MediaImage[];
    posters: MediaImage[];
};

export type MediaImage = {
    aspectRatio: number;
    height: number;
    iso_639_1: Optional<string>;
    filePath: string;
    voteAverage: number;
    voteCount: number;
    width: number;
};

export type Keyword = {
    id: number;
    name: string;
};

export type AuthorDetails = {
    name: string;
    username: string;
    avatarPath: Optional<string>;
    rating: Optional<number>;
};

export type ReviewElement = {
    id: string;
    author: string;
    authorDetails: AuthorDetails;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
};

export type Reviews = PaginationResponse<ReviewElement> & {
    id: number;
};

export type Review = ReviewElement & {
    iso_639_1: string;
    mediaId: number;
    mediaTitle: string;
    mediaType: string;
};

export * from './PropsTypes';
export * from './StateTypes';
export * from './Movie';
export * from './TvShow';
export * from './Company';
export * from './Collection';
export * from './Person';
