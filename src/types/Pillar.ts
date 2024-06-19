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
  