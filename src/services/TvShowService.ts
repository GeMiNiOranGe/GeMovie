import {
    APIHandler,
    DetailService,
    PaginationResponseWrapper,
    SearchService,
    URLBuilder,
} from '@services';
import type { PaginationResponse, TvShow, TvShowElement } from '@shared/types';
import {
    addDays,
    getISODate,
    toPaginationResponse,
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
        return await SearchService.searchAsync('tv', params, toTvShowElement);
    }

    public static async getDetailAsync(id: number): Promise<TvShowElement> {
        return await DetailService.getDetailAsync(id, 'tv', toTvShowElement);
    }

    public static async getFullDetailAsync(id: number): Promise<TvShow> {
        const data = await DetailService.getDetailAsync(id, 'tv', toTvShow);
        return data;
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
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<TvShowElement> =
            toPaginationResponse(json);

        return new PaginationResponseWrapper(response, toTvShowElement);
    }
}
