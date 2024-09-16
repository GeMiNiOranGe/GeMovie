import { DetailService, SearchService } from '@services';
import type { Company, CompanyElement, SearchPage } from '@shared/types';
import { toCompany } from '@shared/utils';

export default class CompanyService {
    public static async searchAsync(
        text: string,
    ): Promise<SearchPage<CompanyElement>> {
        const params = new URLSearchParams({
            query: text,
        });
        return await SearchService.searchAsync('company', params);
    }

    public static async getDetailAsync(id: number): Promise<Company> {
        return await DetailService.getDetailAsync(id, 'company', toCompany);
    }
}
