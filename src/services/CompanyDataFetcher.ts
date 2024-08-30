import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type { SearchPage } from '@shared/types';
import { toSearchPage } from '@shared/utils';

export default class CompanyDataFetcher {
    public static async searchAsync(text: string): Promise<SearchPage> {
        const params = new URLSearchParams({
            api_key: `${TMDB_API_KEY}`,
            query: text,
        });
        const url = `${TMDB_BASE_URL}/search/company?${params}`;

        const response: Response = await fetch(url);
        const json = await response.json();

        return toSearchPage(json);
    }
}
