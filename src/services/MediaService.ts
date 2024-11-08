import type {
    TimeWindow,
    PaginationResponse,
    TrendingType,
} from '@shared/types';
import { toPaginationResponse } from '@shared/utils';
import { APIHandler, PaginationResponseWrapper, URLBuilder } from '@services';

export default class MediaService {
    /**
     * Get a list of movies ordered by rating.
     * @param type `"all"` | `"movie"` | `"tv"` | `"person"`
     * @param page page number
     */
    public static async getTrendingAsync<T>(
        type: TrendingType,
        timeWindow: TimeWindow,
        elementConvertFn: (val: any) => T,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });

        const url = URLBuilder.buildTrendingURL(type, timeWindow, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }
}
