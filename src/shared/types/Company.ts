import type { Optional } from '@shared/types';

export type CompanyElement = {
    id: number;
    logoPath: Optional<string>;
    name: string;
    originCountry: Optional<string>;
};

export type Company = CompanyElement & {
    description: string;
    headquarters: string;
    homepage: string;
    parentCompany: Optional<ParentCompany>;
};

export type ParentCompany = {
    name: string;
    id: number;
    logoPath: Optional<string>;
};
