import {
    APIHandler,
    APIUtils,
    type PaginationResponseWrapper,
    URLBuilder,
} from '@services';
import { toCredits, toImages, toReviews } from '@shared/utils';
import type {
    Credits,
    ElementConvertFn,
    Images,
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
        elementConvertFn: ElementConvertFn<T>,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildRecommendationsURL(type, id, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
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
     * Get the user reviews
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
        elementConvertFn: ElementConvertFn<T>,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildPopularURL(type, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
    }

    /**
     * Get a list of videos ordered by rating.
     * @param type `"movie"` | `"tv"`
     * @param page page number
     */
    public static async getTopRatedAsync<T>(
        type: VideoType,
        elementConvertFn: ElementConvertFn<T>,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildTopRatedURL(type, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
    }
}
