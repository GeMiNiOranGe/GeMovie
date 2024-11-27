import {
    type PaginationResponseWrapper,
    APIUtils,
    URLBuilder,
} from '@services';
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
    ): Promise<PaginationResponseWrapper<CompanyElement>> {
        const params = new URLSearchParams({
            query: text,
            page: `${page}`,
        });
        const url = URLBuilder.buildSearchURL('company', params);
        return await APIUtils.fetchPagination(url, toCompanyElement);
    }

    /**
     * Get the company details by ID.
     * @param id company id
     */
    public static async getDetailAsync(id: number): Promise<Company> {
        const url = URLBuilder.buildDetailURL('company', id);
        return await APIUtils.fetchSingleOne(url, toCompany);
    }
}
