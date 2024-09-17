import { SearchResponseWrapper, SearchService } from '@services';
import { toCompanyElement } from '@shared/utils';
import type { CompanyElement, SearchResponse } from '@shared/types';

export default class CompanyService {
    /**
     * Search for companies by their original and alternative names.
     * @param text content you want to search
     */
    public static async searchAsync(
        text: string,
    ): Promise<SearchResponseWrapper<CompanyElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        const response: SearchResponse<CompanyElement> =
            await SearchService.searchAsync('company', params);

        return new SearchResponseWrapper(response, toCompanyElement);
    }
}
