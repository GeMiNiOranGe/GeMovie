import type {
    Collection,
    Company,
    Credits,
    FeaturedMovie,
    FeaturedTvShow,
    Images,
    KnownFor,
    MediaElement,
    Movie,
    MovieElement,
    MultiMediaElement,
    Person,
    PersonImage,
    PersonElement,
    TvShowElement,
    Reviews,
    Review,
    Genre,
    TvShow,
    Network,
    Season,
} from '@shared/types';
import { Animated } from 'react-native';

export type SearchScreenState = {
    searchContent: string;
};

export type SearchSuggestionScreenState = {
    movieGenres: Genre[];
    tvShowGenres: Genre[];
    isLoading: boolean;
};

export type SearchResultsTopTabBaseState<T> = {
    results: T[] | undefined;
    isFetchingNextPage: boolean;
};

export type ContentListScreenState = {
    results: MediaElement[];
    error: Error | undefined;
};

export type ReviewDetailScreenState = {
    review: Review | undefined;
};

export type GenreDetailScreenState = {
    popularMovies: MovieElement[];
    popularTvShows: TvShowElement[];
    topRatedMovies: MovieElement[];
    topRatedTvShows: TvShowElement[];
    upcomingMovies: MovieElement[];
    onTheAirTvShow: TvShowElement[];
    isLoading: boolean;
};

export type NetworkDetailScreenState = {
    network: Network | undefined;
    popularTvShows: TvShowElement[];
    topRatedTvShows: TvShowElement[];
    totalTvShows: number;
};

export type SeasonDetailScreenState = {
    season: Season | undefined;
};

export type MovieDetailScreenState = {
    movie: Movie | undefined;
    modalVisible: boolean;
};

export type CollectionDetailState = {
    collection: Collection | undefined;
};

export type TvShowDetailScreenState = {
    tvShow: TvShow | undefined;
    modalVisible: boolean;
    isloading: boolean;
    animatedOpacity: Animated.Value;
    animatedTranslateY: Animated.Value;
    animatedOpacityImage: Animated.Value;
    animatedTranslateYImage: Animated.Value;
};

export type ExpandableTextState = {
    isExpand: boolean;
    isShowReadButton: boolean;
};

export type CompanyDetailScreenState = {
    company: Company | undefined;
    popularMovies: MovieElement[];
    popularTvShows: TvShowElement[];
    topRatedMovies: MovieElement[];
    topRatedTvShows: TvShowElement[];
    totalTvShows: number;
    totalMovies: number;
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
    movies: MovieElement[];
    people: PersonElement[];
    upcomingMovies: MovieElement[];
    tvShows: TvShowElement[];
    topRated: MovieElement[];
    trend: MultiMediaElement[];
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

export type ReviewState = {
    reviews: Reviews | undefined;
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
