import { SearchService } from '@services';
import type { CompanyElement, SearchPage } from '@shared/types';

export default class CompanyService {
    public static async searchAsync(
        text: string,
    ): Promise<SearchPage<CompanyElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        return await SearchService.searchAsync('company', params);
    }
}
