import type {
    Collection,
    CollectionElement,
    Company,
    Credits,
    FeaturedMovie,
    FeaturedTvShow,
    Images,
    KnownFor,
    MediaElement,
    Movie,
    MovieElement,
    Person,
    PersonElement,
    TvShowElement,
} from '@shared/types';

export type SearchScreenState = {
    searchContent: string;
};

export type SearchResultsTopTabBaseState<T> = {
    results: T[];
    isFetchingNextPage: boolean;
};

export type ContentListScreenState = {
    results: MediaElement[];
    error: Error | undefined;
};

export type MovieDetailScreenState = {
    movie?: Movie | undefined;
};

export type CollectionSearchResultsTopTabState = {
    collections?: CollectionElement[] | undefined;
};
export type CollectionDetailState = {
    collection?: Collection | undefined;
};

export type TvShowDetailScreenState = {
    tv?: TvShowElement | undefined;
    modalVisible: boolean;
    isloading: boolean;
};

export type ExpandableTextState = {
    isExpand: boolean;
    isShowReadButton: boolean;
};

export type CompanyDetailScreenState = {
    company?: Company | undefined;
    movies?: FeaturedMovie[] | undefined;
};

export type PersonDetailScreenState = {
    person?: Person | undefined;
    movies: KnownFor[];
};

export type HomeScreenState = {
    movies: MovieElement[];
    people: PersonElement[];
    upcomingMovies: any[];
    tvShows: TvShowElement[];
    topRated: FeaturedMovie[];
    trend: FeaturedMovie[];
    isLoading: boolean;
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
    isModalVisible?: boolean;
    selectedMovieId?: number | null;
};

export type RecommendationState = {
    recommendItems: MediaElement[];
    isFetching: boolean;
    error: Error | undefined;
};

export type CreditState = {
    credits: Credits | undefined;
    isFetching: boolean;
    error: Error | undefined;
};

export type PhotoState = {
    images: Images | undefined;
    isFetching: boolean;
    error: Error | undefined;
};

export type TopRatedState = {
    movies: MovieElement[];
};
