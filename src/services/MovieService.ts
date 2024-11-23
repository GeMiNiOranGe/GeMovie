import {
    APIHandler,
    PaginationResponseWrapper,
    SearchService,
    URLBuilder,
} from '@services';
import {
    addDays,
    toMovie,
    toMovieElement,
    toPaginationResponse,
} from '@shared/utils';
import type { Movie, MovieElement, PaginationResponse } from '@shared/types';

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
        return await SearchService.searchAsync('movie', params, toMovieElement);
    }

    /**
     * Get the top level details of a movie by ID.
     * @param id movie id
     */
    public static async getDetailAsync(id: number): Promise<Movie> {
        const url =
            URLBuilder.buildDetailURL('movie', id) +
            '&append_to_response=keywords';
        const json = await APIHandler.fetchJSON(url);
        return toMovie(json);
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
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<MovieElement> =
            toPaginationResponse(json);

        return new PaginationResponseWrapper(response, toMovieElement);
    }

    /**
     * Get a list of movies that are being released soon by genre.
     * @param genreIds genre ids
     * @param page page number
     */
    public static async getUpcomingByGenreAsync(
        genreIds: string,
        page: number = 1,
    ): Promise<PaginationResponseWrapper<MovieElement>> {
        const numberOfdays = 28;
        const currentDate = new Date();
        const nextDate = addDays(currentDate, numberOfdays);
        const params = new URLSearchParams({
            'primary_release_date.gte': currentDate
                .toLocaleDateString()
                .replaceAll(/\//g, '-'),
            'primary_release_date.lte': nextDate
                .toLocaleDateString()
                .replaceAll(/\//g, '-'),
            with_genres: genreIds,
            page: `${page}`,
        });
        const url = URLBuilder.buildDiscoverURL('movie', params);
        const json = await APIHandler.fetchJSON(url);
        const response: PaginationResponse<MovieElement> =
            toPaginationResponse(json);

        return new PaginationResponseWrapper(response, toMovieElement);
    }
}
