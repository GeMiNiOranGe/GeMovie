import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import { toMovie, toMovieElement } from '@shared/utils';
import type { Movie, MovieElement, SearchResponse } from '@shared/types';

export default class MovieService {
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

    public static async getDetailAsync(id: number): Promise<Movie> {
        return await DetailService.getDetailAsync(id, 'movie', toMovie);
    }
}
