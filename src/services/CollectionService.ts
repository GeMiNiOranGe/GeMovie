import type { CollectionElement, SearchResponse } from '@shared/types';
import { SearchResponseWrapper, SearchService } from '@services';
import { toCollectionElement } from '@shared/utils';

export default class CollectionService {
    /**
     * Search for collections by their original, translated and alternative names.
     * @param text content you want to search
     */
    public static async searchAsync(
        text: string,
    ): Promise<SearchResponseWrapper<CollectionElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        const response: SearchResponse<CollectionElement> =
            await SearchService.searchAsync('collection', params);

        return new SearchResponseWrapper(response, toCollectionElement);
    }
}
