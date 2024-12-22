import type {
    Collection,
    Company,
    Credits,
    FeaturedMovie,
    Images,
    MediaElement,
    Movie,
    MovieElement,
    MultiMediaElement,
    Person,
    PersonElement,
    TvShowElement,
    Reviews,
    Review,
    Genre,
    TvShow,
    Network,
    Season,
    Episode,
    TPerson,
    MovieCredits,
    TvShowCredits,
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

export type EpisodeDetailScreenState = {
    episode: Episode | undefined;
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
    person: TPerson | undefined;
    movieCredits: MovieCredits | undefined;
    tvShowCredits: TvShowCredits | undefined;
    isModalVisible: boolean;
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
    trend: MultiMediaElement[];
    isLoading: boolean;
    backgroundImage: { uri: string } | undefined;
    selectedCategory: string;
};

export type LoginScreenState = {
    username: string;
    email: string;
    password: string;
    secureEntery: boolean;
    isLoading: boolean;
    errors: {
        username: boolean;
        password: boolean;
    };
    errorMessages: {
        username: string;
        password: string;
    };
};

export type SignupScreenState = {
    username: string;
    email: string;
    secureEntery: boolean;
    isLoading: boolean;
    password: string;
    passwordErrors: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        specialChar: boolean;
    };
    showPasswordErrors: boolean;
    errors: {
        username: boolean;
        email: boolean;
        password: boolean;
    };
    errorMessages: {
        username: string;
        email: string;
        password: string;
    };
    emailErrorMessage: string;
};

export type ResetPasswordScreenState = {
    secureEntery: boolean;
    password: string;
    passwordErrors: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        specialChar: boolean;
    };
    showPasswordErrors: boolean;
    matchPassword: boolean;
    resetError: string;
    confirmPassword: string;
    passwordMatchError: boolean;
};

export type ForgotPasswordScreenState = {
    email: string;
    emailEmptyError: boolean;
    emailNotFoundError: boolean;
    successMessage: string;
};

export type UserScreenState = {
    isLoading: boolean;
    favoriteTvShows: TvShowElement[];
    favoriteMovies: MovieElement[];
    favoritePerson: PersonElement[];
    watchListMovies: MovieElement[];
    watchListTvShows: TvShowElement[];
    username: string;
    login: boolean;
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

export type FavoriteListState = {
    showModal: boolean;
    isFavorite: boolean;
};

export type WatchListState = {
    showModal: boolean;
    isWatchList: boolean;
};

export type SeeAllMoviesState = {
    movies: MovieElement[];
    isLoading: boolean;
};

export type SeeAllTVState = {
    tv: TvShowElement[];
    isLoading: boolean;
};

export type SeeAllFavoriteState = {
    favoriteTvShows: TvShowElement[];
    favoriteMovies: MovieElement[];
    favoritePerson: PersonElement[];
    isLoading: boolean;
};

export type CommentState = {
    comment: string;
    comments: { username: string; comment: string; timestamp: string }[];
    isCommenting: boolean;
    messages: string;
    loadingComments: boolean;
};
