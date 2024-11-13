import { APIHandler, PaginationResponseWrapper, URLBuilder } from '@services';
import {
    toCredits,
    toImages,
    toPaginationResponse,
    toReviews,
} from '@shared/utils';
import type {
    Credits,
    Images,
    PaginationResponse,
    Reviews,
    VideoType,
} from '@shared/types';

export default class VideoService {
    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     * @param page page number
     */
    public static async getRecommendationsAsync<T>(
        type: VideoType,
        id: number,
        elementConvertFn: (val: any) => T,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildRecommendationsURL(type, id, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }

    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     */
    public static async getCreditsAsync(
        type: VideoType,
        id: number,
    ): Promise<Credits> {
        const url = URLBuilder.buildCreditsURL(type, id);
        const json = await APIHandler.fetchJSON(url);
        return toCredits(json);
    }

    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     */
    public static async getImagesAsync(
        type: VideoType,
        id: number,
    ): Promise<Images> {
        const url = URLBuilder.buildImagesURL(type, id);
        const json = await APIHandler.fetchJSON(url);
        return toImages(json);
    }

    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     * @param page page number
     */
    public static async getReviewsAsync(
        type: VideoType,
        id: number,
        page: number = 1,
    ): Promise<Reviews> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildReviewsURL(type, id, params);
        const json = await APIHandler.fetchJSON(url);
        return toReviews(json);
    }

    /**
     * Get a list ordered by popularity.
     * @param type `"movie"` | `"tv"`
     * @param page page number
     */
    public static async getPopularListAsync<T>(
        type: VideoType,
        elementConvertFn: (val: any) => T,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });

        const url = URLBuilder.buildPopularURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }

    /**
     * Get a list of movies ordered by rating.
     * @param type `"movie"` | `"tv"`
     * @param page page number
     */
    public static async getTopRatedAsync<T>(
        type: VideoType,
        elementConvertFn: (val: any) => T,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });

        const url = URLBuilder.buildTopRatedURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }
}
