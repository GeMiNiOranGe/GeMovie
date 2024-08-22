import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type { Movie, SearchPage } from '@shared/types';
import { toMovie } from '@shared/utils';

export default class MovieDataFetcher {
    static async searchAsync(text: string): Promise<SearchPage> {
        const params = new URLSearchParams({
            api_key: `${TMDB_API_KEY}`,
            query: text,
        });
        const url = `${TMDB_BASE_URL}/search/movie?${params}`;

        const response: Response = await fetch(url);
        const json = await response.json();

        return {
            page: json.page,
            results: json.results,
            totalPages: json.total_pages,
            totalResults: json.total_results,
        };
    }

    static async getDetailAsync(id: number): Promise<Movie> {
        const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;

        const response: Response = await fetch(url);
        const json = await response.json();

        return toMovie(json);
    }
}
