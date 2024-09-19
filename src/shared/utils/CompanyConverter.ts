import { Company, CompanyElement, ParentCompany } from '@shared/types';

export function toCompanyElement(val: any): CompanyElement {
    return {
        id: val.id,
        logoPath: val['logo_path'] ?? undefined,
        name: val.name,
        originCountry: val['origin_country'],
    };
}

export function toCompany(val: any): Company {
    return {
        description: val.description,
        headquarters: val.headquarters,
        homepage: val.homepage,
        id: val.id,
        logoPath: val['logo_path'] ?? undefined,
        name: val.name,
        originCountry: val['origin_country'],
        parentCompany: toParentCompany(val.parent_company),
    };
}

export function toParentCompany(val: any): ParentCompany | undefined {
    if (!val) {
        return undefined;
    }

    return {
        name: val.name,
        id: val.id,
        logoPath: val['logo_path'] ?? undefined,
    };
}
