import {
    APIUtils,
    type PaginationResponseWrapper,
    URLBuilder,
} from '@services';
import type {
    ConvertFn,
    SortBy,
    TvShowElement,
    VideoType,
} from '@shared/types';
import { toTvShowElement } from '@shared/utils';

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
        elementConvertFn: ConvertFn<T>,
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
        elementConvertFn: ConvertFn<T>,
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

    /**
     * Get a list of tv shows by network.
     * @param type `"movie"` | `"tv"`
     * @param networkIds genre ids
     * @param page page number
     */
    public static async getTvShowByNetworkAsync(
        networkIds: string,
        sortBy: SortBy = 'popularity.desc',
        page: number = 1,
    ): Promise<PaginationResponseWrapper<TvShowElement>> {
        const params = new URLSearchParams({
            with_networks: networkIds,
            sort_by: sortBy,
            page: `${page}`,
        });

        const url = URLBuilder.buildDiscoverURL('tv', params);
        return await APIUtils.fetchPagination(url, toTvShowElement);
    }
}
