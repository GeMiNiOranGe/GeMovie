import { DetailService, SearchService } from '@services';
import { toMovie } from '@shared/utils';
import type { Movie, MovieElement, SearchPage } from '@shared/types';

export default class MovieService {
    public static async searchAsync(
        text: string,
    ): Promise<SearchPage<MovieElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        return await SearchService.searchAsync('movie', params);
    }

    public static async getDetailAsync(id: number): Promise<Movie> {
        return await DetailService.getDetailAsync(id, 'movie', toMovie);
    }
}
