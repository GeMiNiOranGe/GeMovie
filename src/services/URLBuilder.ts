import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type { SearchType } from '@shared/types';

export default class URLBuilder {
    /**
     * Build a search url string.
     * @param type movie, tv series, person, company, collection,...
     * @param params
     */
    public static buildSearchURL(
        type: SearchType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&${params}`;
    }

    /**
     * Build a detail url string to get detail information.
     * @param type movie, tv series, person, company, collection,...
     * @param id movie id, tv series id, person id,...
     */
    public static buildDetailURL(type: SearchType, id: number): string {
        return `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`;
    }
}
