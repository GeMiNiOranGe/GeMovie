import type { Collection, CollectionElement } from '@shared/types';
import { DetailService, SearchResponseWrapper, SearchService } from '@services';
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
    ): Promise<SearchResponseWrapper<CollectionElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        return await SearchService.searchAsync(
            'collection',
            params,
            toCollectionElement,
        );
    }

    /**
     * Get the collection details by ID.
     * @param id collection id
     */
    public static async getDetailAsync(id: number): Promise<Collection> {
        return await DetailService.getDetailAsync(
            id,
            'collection',
            toCollection,
        );
    }
}
