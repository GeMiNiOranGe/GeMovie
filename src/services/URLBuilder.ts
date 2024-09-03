import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type { SearchType } from '@shared/types';

export default class URLBuilder {
    public static buildSearchURL(
        type: SearchType,
        params: URLSearchParams,
    ): string {
        return `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&${params}`;
    }

    public static buildDetailURL(type: SearchType, id: number): string {
        return `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`;
    }
}
