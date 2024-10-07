import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import type { FeaturedTvShow, TvShowElement } from '@shared/types';
import { toTvShowElement } from '@shared/utils';

export default class TvShowService {
    /**
     * Search for TV shows by their original, translated and also known as names.
     * @param text content you want to search
     */
    public static async searchAsync(
        text: string,
    ): Promise<SearchResponseWrapper<TvShowElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        return await SearchService.searchAsync('tv', params, toTvShowElement);
    }

    public static async getDetailAsync(id: number): Promise<TvShowElement> {
        return await DetailService.getDetailAsync(id, 'tv', toTvShowElement);
    }
}
