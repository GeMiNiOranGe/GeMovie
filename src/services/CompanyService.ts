import { DetailService, SearchResponseWrapper, SearchService } from '@services';
import { toCompany, toCompanyElement } from '@shared/utils';
import type { Company, CompanyElement } from '@shared/types';

export default class CompanyService {
    /**
     * Search for companies by their original and alternative names.
     * @param text content you want to search
     * @param page page number
     */
    public static async searchAsync(
        text: string,
        page: number = 1,
    ): Promise<SearchResponseWrapper<CompanyElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        return await SearchService.searchAsync(
            'company',
            params,
            toCompanyElement,
        );
    }

    /**
     * Get the company details by ID.
     * @param id company id
     */
    public static async getDetailAsync(id: number): Promise<Company> {
        return await DetailService.getDetailAsync(id, 'company', toCompany);
    }
}
