export interface Company {
    id?: string,
    name: string,
    email: string,
    password: string,
    cpassword: string,
    address: string,
    county: string,
    averageNumberOfEmployees: string,
    sector: string,
    parentCompanyAddress: string,
    ProviderCountry: string,
    parentCompanyName: string,
    parentCompanyCounty: string,
    soleTrader: boolean,
    companyId: number
}

export interface CountryResponse {
    data?: (DataEntity)[];
    message: string;
}
export interface DataEntity {
    name: string;
    code: string;
}

export interface ProviderTypesType {
    providerTypes?: (string)[] | null;
    message: string;
  }
  