import type {
    MovieCredits,
    PersonElement,
    TPerson,
    VideoType,
} from '@shared/types';
import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import { toMovieCredits, toPerson, toPersonElement } from '@shared/utils';

export default class PersonService {
    /**
     * Search for people by their name and also known as names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<PersonElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('person', params);
        return await APIUtils.fetchPagination(url, toPersonElement);
    }

    /**
     * Get the details of a person.
     * @param id person id
     */
    public static async getDetailAsync(id: number): Promise<TPerson> {
        const url = URLBuilder.buildDetailURL('person', id);
        return await APIUtils.fetchSingleOne(url, toPerson);
    }

    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     */
    public static async getCreditsAsync(
        type: VideoType,
        id: number,
    ): Promise<MovieCredits> {
        const url = URLBuilder.buildPersonCreditsURL(type, id);
        return await APIUtils.fetchSingleOne(url, toMovieCredits);
    }

    /**
     * Get a list ordered by popularity.
     * @param page page number
     */
    public static async getPopularListAsync(
        page: number = 1,
    ): Promise<PaginationResponseWrapper<PersonElement>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildPopularURL('person', params);
        return await APIUtils.fetchPagination(url, toPersonElement);
    }
}
