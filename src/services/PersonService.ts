import type { PaginationResponse, PersonElement } from '@shared/types';
import {
    APIHandler,
    PaginationResponseWrapper,
    SearchService,
    URLBuilder,
} from '@services';
import { toPaginationResponse, toPersonElement } from '@shared/utils';

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
        return await SearchService.searchAsync(
            'person',
            params,
            toPersonElement,
        );
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
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<PersonElement> =
            toPaginationResponse(json);

        return new PaginationResponseWrapper(response, toPersonElement);
    }
}
