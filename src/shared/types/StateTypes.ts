import type {
    Collection,
    CollectionElement,
    Company,
    FeaturedMovie,
    FeaturedTvShow,
    KnownFor,
    MediaElement,
    Movie,
    MovieElement,
    Person,
    PersonImage,
    TvShowElement,
} from '@shared/types';
import { Animated } from 'react-native';

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
    personImages?: PersonImage[];
    isModalVisible: boolean;
    selectedImage: string | null;
    animations: Animated.Value[];
    introAnim: Animated.Value;
    labelsAnim: Animated.Value;
};

export type SeeAllPersonState = {
    people?: Person[] | undefined;
    scaleAnim: Animated.Value[];
    movies: FeaturedMovie[];
    isModalVisible: boolean;
    selectedPerson: string;
    scrollY: Animated.Value;
};

export type HomeScreenState = {
    movies: FeaturedMovie[];
    people: Person[];
    upcomingMovies: any[];
    tvShow: FeaturedTvShow[];
    topRated: FeaturedMovie[];
    trend: FeaturedMovie[];
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
    isModalVisible?: boolean;
    selectedMovieId?: number | null;
};

export type RecommendationState = {
    recommendItems: MediaElement[];
    isFetching: boolean;
};

export type TopRatedState = {
    movies: MovieElement[];
};
