export type CompanyElement = {
    id: number;
    logoPath: string | undefined;
    name: string;
    originCountry: string;
};

export type Company = {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logoPath: string | undefined;
    name: string;
    originCountry: string;
    parentCompany: ParentCompany | undefined;
};

export type ParentCompany = {
    name: string;
    id: number;
    logoPath: string | undefined;
};
