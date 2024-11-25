import { APIHandler, PaginationResponseWrapper, URLBuilder } from '@services';
import type { PaginationResponse, SortBy, VideoType } from '@shared/types';
import { toPaginationResponse } from '@shared/utils';

export default class VideoDiscoveryService {
    /**
     * Get a list of videos by company.
     * @param type `"movie"` | `"tv"`
     * @param companyIds company ids
     * @param page page number
     */
    public static async getVideoByCompanyAsync<T>(
        type: VideoType,
        companyIds: string,
        elementConvertFn: (val: any) => T,
        sortBy: SortBy = 'popularity.desc',
        page: number = 1,
    ) {
        const params = new URLSearchParams({
            with_companies: companyIds,
            sort_by: sortBy,
            page: `${page}`,
        });

        const url = URLBuilder.buildDiscoverURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }
}
