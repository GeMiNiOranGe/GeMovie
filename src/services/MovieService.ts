import {
    APIHandler,
    PaginationResponseWrapper,
    SearchService,
    URLBuilder,
} from '@services';
import { toMovie, toMovieElement, toPaginationResponse } from '@shared/utils';
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
     * @param id movie id
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
}
