import type { Collection, CollectionElement } from '@shared/types';
import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import { toCollection, toCollectionElement } from '@shared/utils';

export default class CollectionService {
    /**
     * Search for collections by their original, translated and alternative names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<CollectionElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('collection', params);
        return await APIUtils.fetchPagination(url, toCollectionElement);
    }

    /**
     * Get the collection details by ID.
     * @param id collection id
     */
    public static async getDetailAsync(id: number): Promise<Collection> {
        const url = URLBuilder.buildDetailURL('collection', id);
        return await APIUtils.fetchSingleOne(url, toCollection);
    }
}
