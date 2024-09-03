import { APIHandler, URLBuilder } from '@services';
import { toSearchPage } from '@shared/utils';
import type { SearchPage, SearchType } from '@shared/types';

export default class SearchService {
    public static async searchAsync<T>(
        type: SearchType,
        params: URLSearchParams,
    ): Promise<SearchPage<T>> {
        const url = URLBuilder.buildSearchURL(type, params);
        const json = await APIHandler.fetchJSON(url);
        return toSearchPage(json);
    }
}
