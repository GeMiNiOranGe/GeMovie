import type {
    CollectionElement,
    Company,
    FeaturedMovie,
    FeaturedTvShow,
    KnownFor,
    Movie,
    Person,
    TvShowElement,
} from '@shared/types';

export type SearchScreenState = {
    searchContent: string;
};

export type SearchResultsTopTabBaseState<T> = {
    results: T[];
    isFetchingNextPage: boolean;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type CollectionSearchResultsTopTabState = {
    collections?: CollectionElement[] | undefined;
};

export type TvShowDetailScreenState = {
    tv?: TvShowElement | undefined;
    modalVisible: boolean;
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

export type HomeScreenState = {
    movies: FeaturedMovie[];
    people: Person[];
    upcomingMovies: any[];
    tvShow: FeaturedTvShow[];
    isLoading: boolean;
    backgroundImageIndex: number;
};

export type TrendScreenState = {
    trendingMovies: FeaturedMovie[];
    trendingTvShows: FeaturedTvShow[];
    isLoading: boolean;
    backgroundImage: { uri: string } | undefined;
    selectedCategory: string;
};

export type YoutubeState = {
    videoKey: string | null;
    loading: boolean;
};

export type SlideshowState = {
    currentIndex: number;
    isAutoplay: boolean;
};
