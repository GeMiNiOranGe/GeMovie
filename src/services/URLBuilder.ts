import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import type { DetailType, SearchType } from '@shared/types';

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
    public static buildDetailURL(type: DetailType, id: number): string {
        return `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`;
    }

    /**
     * Build an image url.
     * @param size size of image
     * @param path image path
     */
    public static buildImageURL(
        size: keyof typeof imageSize,
        path: string | undefined,
    ): string {
        return `${TMDB_BASE_IMAGE_URL}/${imageSize[size]}${path}`;
    }

    /**
     * Build a genre list url
     * @param type `"movie"` | `"tv"`
     */
    public static buildGenreListURL(type: 'movie' | 'tv'): string {
        return `https://api.themoviedb.org/3/genre/${type}/list?api_key=${TMDB_API_KEY}`;
    }
}
