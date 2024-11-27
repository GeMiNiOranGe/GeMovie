import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import type { TvShowElement } from '@shared/types';
import { addDays, getISODate, toTvShowElement } from '@shared/utils';

export default class TvShowService {
    /**
     * Search for TV shows by their original, translated and also known as names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<TvShowElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('tv', params);
        return await APIUtils.fetchPagination(url, toTvShowElement);
    }

    /**
     * Get the details of a TV show.
     * @param id tv show id
     */
    public static async getDetailAsync(id: number): Promise<TvShowElement> {
        const url = URLBuilder.buildDetailURL('tv', id);
        return await APIUtils.fetchSingleOne(url, toTvShowElement);
    }

    /**
     * Get a list of TV shows that air in the next 28 days by genre.
     * @param genreIds genre ids
     * @param page page number
     */
    public static async getOnTheAirByGenreAsync(
        genreIds: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<TvShowElement>> {
        const numberOfdays = 28;
        const currentDate = new Date();
        const nextDate = addDays(currentDate, numberOfdays);

        const params = new URLSearchParams({
            'first_air_date.gte': getISODate(currentDate),
            'first_air_date.lte': getISODate(nextDate),
            with_genres: genreIds,
            page: `${page}`,
        });
        const url = URLBuilder.buildDiscoverURL('tv', params);

        return await APIUtils.fetchPagination(url, toTvShowElement);
    }
}
