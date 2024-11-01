import { APIHandler, PaginationResponseWrapper, URLBuilder } from '@services';
import { toPaginationResponse } from '@shared/utils';
import type { PaginationResponse, SearchType } from '@shared/types';

export default class SearchService {
    /**
     * Search for everything that can be passed in the `type` and `params` parameters.
     * @param type movie, tv series, person, company, collection,...
     * @param params
     * @param elementConvertFn `toMovieElement`, `toTvShowElement`, `toPersonElement`, `toCompanyElement`, `toCollectionElement`,...
     */
    public static async searchAsync<T>(
        type: SearchType,
        params: URLSearchParams,
        elementConvertFn: (val: any) => T,
    ): Promise<PaginationResponseWrapper<T>> {
        const url = URLBuilder.buildSearchURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<T> = toPaginationResponse(json);

        return new PaginationResponseWrapper(response, elementConvertFn);
    }
}
