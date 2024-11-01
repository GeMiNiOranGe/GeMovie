import { APIHandler, PaginationResponseWrapper, URLBuilder } from '@services';
import { toPaginationResponse } from '@shared/utils';
import type { PaginationResponse, VideoType } from '@shared/types';

export default class VideoService {
    /**
     * @param type `"movie"` | `"tv"`
     * @param id movie id
     * @param page page number
     */
    public static async getRecommendationsAsync<T>(
        type: VideoType,
        id: number,
        elementConvertFn: (val: any) => T,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildRecommendationsURL(type, id, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }
}
