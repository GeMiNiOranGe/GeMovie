import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import type { TvShowElement } from '@shared/types';
import { toTvShowElement } from '@shared/utils';

export default class TvShowService {
    /**
     * Search for TV shows by their original, translated and also known as names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<SearchResponseWrapper<TvShowElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        return await SearchService.searchAsync('tv', params, toTvShowElement);
    }

    public static async getDetailAsync(id: number): Promise<TvShowElement> {
        return await DetailService.getDetailAsync(id, 'tv', toTvShowElement);
    }
}
