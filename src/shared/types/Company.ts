export type CompanyElement = {
    id: number;
    logoPath?: string | undefined;
    name: string;
    originCountry: string | undefined;
};

export type Company = {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logoPath?: string | undefined;
    name: string;
    originCountry: string | undefined;
    parentCompany?: ParentCompany | undefined;
};

export type ParentCompany = {
    name: string;
    id: number;
    logoPath?: string | undefined;
};
