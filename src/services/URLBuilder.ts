import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
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

    public static buildImageURL(
        size: keyof typeof imageSize,
        path: string,
    ): string {
        return `${TMDB_BASE_IMAGE_URL}${imageSize[size]}${path}`;
    }
}
