import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import { upcomingVideoDays } from '@shared/constants';
import type { TvShow, TvShowElement } from '@shared/types';
import {
    getISODateRangeFromToday,
    toTvShow,
    toTvShowElement,
} from '@shared/utils';

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
    public static async getDetailAsync(id: number): Promise<TvShow> {
        const url = URLBuilder.buildDetailURL('tv', id, 'keywords');
        return await APIUtils.fetchSingleOne(url, toTvShow);
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
        const [currentDate, nextDate] =
            getISODateRangeFromToday(upcomingVideoDays);

        const params = new URLSearchParams({
            'first_air_date.gte': currentDate,
            'first_air_date.lte': nextDate,
            with_genres: genreIds,
            page: `${page}`,
        });
        const url = URLBuilder.buildDiscoverURL('tv', params);

        return await APIUtils.fetchPagination(url, toTvShowElement);
    }
}
