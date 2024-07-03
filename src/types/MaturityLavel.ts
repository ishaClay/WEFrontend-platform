
export interface MaturityLevelResponse {
    length: number;
    data?: (MaturityLevelResult)[];
    message: string;
    clientData: boolean;
}
export interface MaturityLevelResult {
    id: number;
    maturityLevelName: string;
    rangeStart: number;
    rangeEnd: number;
    color: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface Headers {
    "content - length": string;
    "content - type": string;
}
export interface Config {
    transitional: Transitional;
    adapter?: (string)[] | null;
    transformRequest?: (null)[] | null;
    transformResponse?: (null)[] | null;
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: EnvOrRequest;
    headers: Headers1;
    baseURL: string;
    url: string;
    method: string;
    data: string;
}
export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}
export interface EnvOrRequest {
}
export interface Headers1 {
    Accept: string;
    "Content - Type": string;
}
