import { APIHandler, SearchResponseWrapper, URLBuilder } from '@services';
import { toSearchResponse } from '@shared/utils';
import type { SearchResponse, VideoType } from '@shared/types';

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
    ): Promise<SearchResponseWrapper<T>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildRecommendationsURL(type, id, params);
        const json = await APIHandler.fetchJSON(url);
        const searchResponse: SearchResponse<T> = toSearchResponse(json);

        return new SearchResponseWrapper(searchResponse, elementConvertFn);
    }
}
