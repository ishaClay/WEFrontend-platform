export interface Pillar {
  id: number;
  pillarName: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  icon: string;
}

export interface SinglePillar {
  pillarid: number;
  checked: number;
  pillarname: string;
  totalquestionsattempted: string;
  totalquestionsavailable: string;
  totalmaxpoint: string;
  totalpoints: string;
  questiontitle: string;
  value: number;
  maturityLevelName?: null;
  rangeStart?: null;
  rangeEnd?: null;
  maturityNameRecommended: string;
  filteredOptions?: FilteredOptionsEntity[];
}
export interface FilteredOptionsEntity {
  name?: string;
  point?: number;
  measures?: string;
  optionId?: string;
}



export interface PillerResponse {
  data?: (DataEntity)[] | null;
  message: string;
  clientData: boolean;
}
export interface DataEntity {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Headers {
  "content-length": string;
  "content-type": string;
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
  "Content-Type": string;
}
