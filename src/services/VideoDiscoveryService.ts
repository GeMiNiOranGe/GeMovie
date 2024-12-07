import {
    APIUtils,
    type PaginationResponseWrapper,
    URLBuilder,
} from '@services';
import type { ElementConvertFn, SortBy, VideoType } from '@shared/types';

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
        elementConvertFn: ElementConvertFn<T>,
        sortBy: SortBy = 'popularity.desc',
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            with_companies: companyIds,
            sort_by: sortBy,
            page: `${page}`,
        });

        const url = URLBuilder.buildDiscoverURL(type, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
    }

    /**
     * Get a list of videos by genre.
     * @param type `"movie"` | `"tv"`
     * @param genreIds genre ids
     * @param page page number
     */
    public static async getVideoByGenreAsync<T>(
        type: VideoType,
        genreIds: string,
        elementConvertFn: ElementConvertFn<T>,
        sortBy: SortBy = 'popularity.desc',
        page: number = 1,
    ): Promise<PaginationResponseWrapper<T>> {
        const params = new URLSearchParams({
            with_genres: genreIds,
            sort_by: sortBy,
            page: `${page}`,
        });

        const url = URLBuilder.buildDiscoverURL(type, params);
        return await APIUtils.fetchPagination(url, elementConvertFn);
    }
}
