import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import { toCompanyElement } from '@shared/utils';
import type { Company, CompanyElement, SearchResponse } from '@shared/types';
import { toCompany } from '@shared/utils';

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

    public static async getDetailAsync(id: number): Promise<Company> {
        return await DetailService.getDetailAsync(id, 'company', toCompany);
    }
}
