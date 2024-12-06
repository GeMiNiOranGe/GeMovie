import type { ConvertFn, TimeWindow, TrendingType } from '@shared/types';
import {
    APIUtils,
    type PaginationResponseWrapper,
    URLBuilder,
} from '@services';

export default class MediaService {
    /**
     * Get a list of movies ordered by rating.
     * @param type `"all"` | `"movie"` | `"tv"` | `"person"`
     * @param page page number
     */
    public static async getTrendingAsync<E>(
        type: TrendingType,
        timeWindow: TimeWindow,
        elementConvertFn: ConvertFn<E>,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<E>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });

        const url = URLBuilder.buildTrendingURL(type, timeWindow, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
    }
}
