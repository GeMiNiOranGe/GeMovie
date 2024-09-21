import { APIHandler, SearchResponseWrapper, URLBuilder } from '@services';
import { toSearchResponse } from '@shared/utils';
import type { SearchResponse, SearchType } from '@shared/types';

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
    ): Promise<SearchResponseWrapper<T>> {
        const url = URLBuilder.buildSearchURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        const searchResponse: SearchResponse<T> = toSearchResponse(json);

        return new SearchResponseWrapper(searchResponse, elementConvertFn);
    }
}
