export type MaturityAssessmentTabs =
  | "assessmentresult"
  | "maturityAssessment"
  | "actionitems";

export type MyActionDataType = {
  image: string;
  title: number;
  subTitle: string;
};

export type DashboardFilterType = "week" | "month" | "today";

export type DashBoardCardItem = {
  title: string;
  value: number | string;
  icon: string;
};
