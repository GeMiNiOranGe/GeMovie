import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import { toMovie, toMovieElement } from '@shared/utils';
import type { Movie, MovieElement, SearchResponse } from '@shared/types';

export default class MovieService {
    /**
     * Search for movies by their original, translated and alternative titles.
     * @param text content you want to search
     */
    public static async searchAsync(
        text: string,
    ): Promise<SearchResponseWrapper<MovieElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        const response: SearchResponse<MovieElement> =
            await SearchService.searchAsync('movie', params);

        return new SearchResponseWrapper(response, toMovieElement);
    }

    /**
     * Get the top level details of a movie by ID.
     * @param id movie id
     */
    public static async getDetailAsync(id: number): Promise<Movie> {
        return await DetailService.getDetailAsync(id, 'movie', toMovie);
    }
}
