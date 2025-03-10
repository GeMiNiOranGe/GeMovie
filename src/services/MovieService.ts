import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
import {
    getISODateRangeFromToday,
    toMovie,
    toMovieElement,
} from '@shared/utils';
import type { Movie, MovieElement } from '@shared/types';
import { upcomingVideoDays } from '@shared/constants';

export default class MovieService {
    /**
     * Search for movies by their original, translated and alternative titles.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<MovieElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('movie', params);
        return await APIUtils.fetchPagination(url, toMovieElement);
    }

    /**
     * Get the top level details of a movie by ID.
     * @param id movie id
     */
    public static async getDetailAsync(id: number): Promise<Movie> {
        const url = URLBuilder.buildDetailURL('movie', id, 'keywords');
        return await APIUtils.fetchSingleOne(url, toMovie);
    }

    /**
     * Get a list of movies that are being released soon.
     * @param page page number
     */
    public static async getUpcomingAsync(
        page: number = 1,
    ): Promise<PaginationResponseWrapper<MovieElement>> {
        const params = new URLSearchParams({
            page: `${page}`,
        });
        const url = URLBuilder.buildUpcomingURL(params);
        return await APIUtils.fetchPagination(url, toMovieElement);
    }

    /**
     * Get a list of movies that are being released soon in the next 28 days by genre.
     * @param genreIds genre ids
     * @param page page number
     */
    public static async getUpcomingByGenreAsync(
        genreIds: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<MovieElement>> {
        const [currentDate, nextDate] =
            getISODateRangeFromToday(upcomingVideoDays);

        const params = new URLSearchParams({
            'primary_release_date.gte': currentDate,
            'primary_release_date.lte': nextDate,
            with_genres: genreIds,
            page: `${page}`,
        });
        const url = URLBuilder.buildDiscoverURL('movie', params);
        return await APIUtils.fetchPagination(url, toMovieElement);
    }
}
