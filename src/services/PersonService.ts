import type { PersonElement } from '@shared/types';
import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import { toPersonElement } from '@shared/utils';

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
