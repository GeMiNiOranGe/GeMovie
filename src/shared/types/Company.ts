export type CompanyElement = {
    id: number;
    logoPath: string | undefined;
    name: string;
    originCountry: string | undefined;
};

export type Company = CompanyElement & {
    description: string;
    headquarters: string;
    homepage: string;
    parentCompany: ParentCompany | undefined;
};

export type ParentCompany = {
    name: string;
    id: number;
    logoPath: string | undefined;
};
