import { CompanyElement } from '@shared/types';

export function toCompanyElement(val: any): CompanyElement {
    return {
        id: val.id,
        logoPath: val.logo_path ?? undefined,
        name: val.name,
        originCountry: val.origin_country,
    };
}
