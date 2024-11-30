import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import type {
    DetailType,
    PopularType,
    SearchType,
    TimeWindow,
    TrendingType,
    VideoType,
} from '@shared/types';

export default class URLBuilder {
    /**
     * Build an image url.
     * @param size size of image
     * @param path image path
     */
    public static buildImageURL(
        size: keyof typeof imageSize,
        path: string | undefined,
    ): string {
        return `${TMDB_BASE_IMAGE_URL}/${imageSize[size]}${path}`;
    }

    /**
     * Find movies or tv using over 30 filters and sort options.
     * @param type movie, tv series, person, company, collection,...
     * @param params
     */
    public static buildDiscoverURL(
        type: VideoType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a search url string.
     * @param type movie, tv series, person, company, collection,...
     * @param params
     */
    public static buildSearchURL(
        type: SearchType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a detail url string to get detail information.
     * @param type movie, tv series, person, company, collection,...
     * @param id movie id, tv series id, person id,...
     * @param appendToResponse Fetch multiple requests, just comma separate the values, e.g: `"videos,images,keywords"`
     */
    public static buildDetailURL(
        type: DetailType,
        id: number | string,
        appendToResponse?: string,
    ): string {
        return `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}${
            appendToResponse ? `&append_to_response=${appendToResponse}` : ''
        }`;
    }

    /**
     * Build a recommendations url
     * @param type `"movie"` | `"tv"`
     * @param id movie id or tv series id
     * @param params
     */
    public static buildRecommendationsURL(
        type: VideoType,
        id: number,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/${type}/${id}/recommendations?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a reviews url
     * @param type `"movie"` | `"tv"`
     * @param id movie id or tv series id
     * @param params
     */
    public static buildReviewsURL(
        type: VideoType,
        id: number,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/${type}/${id}/reviews?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a credits url
     * @param type `"movie"` | `"tv"`
     * @param id movie id or tv series id
     */
    public static buildCreditsURL(type: VideoType, id: number): string {
        return `${TMDB_BASE_URL}/${type}/${id}/credits?api_key=${TMDB_API_KEY}`;
    }

    /**
     * Build a images url
     * @param type `"movie"` | `"tv"`
     * @param id movie id or tv series id
     */
    public static buildImagesURL(type: VideoType, id: number): string {
        return `${TMDB_BASE_URL}/${type}/${id}/images?api_key=${TMDB_API_KEY}`;
    }

    /**
     * Build popular list url
     * @param type `"movie"` | `"tv"` | `"person"`
     * @param params
     */
    public static buildPopularURL(
        type: PopularType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/${type}/popular?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a film rating list url
     * @param type `"movie"` | `"tv"` | `"person"`
     * @param params
     */
    public static buildTopRatedURL(
        type: VideoType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/${type}/top_rated?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build trending list url
     * @param type `"all"` | `"movie"` | `"tv"` | `"person"`
     * @param timeWindow `"day"` | `"week"`
     * @param params
     */
    public static buildTrendingURL(
        type: TrendingType,
        timeWindow: TimeWindow,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/trending/${type}/${timeWindow}?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build upcoming movies list url
     * @param params
     */
    public static buildUpcomingURL(params: URLSearchParams): string {
        return `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a genre list url
     * @param type `"movie"` | `"tv"`
     */
    public static buildGenreListURL(type: 'movie' | 'tv'): string {
        return `${TMDB_BASE_URL}/genre/${type}/list?api_key=${TMDB_API_KEY}`;
    }
}
