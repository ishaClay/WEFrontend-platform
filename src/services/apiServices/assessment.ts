import api from "./api";

export const fetchAssessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-assessment-scores/${id}?clientId=${clientId}`;

  return api({ url });
};

export const getAllassessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-total-Assessment-scores/${id}?clientId=${clientId}`;
  return api({ url });
};

export const getAssessmentOptions = () => {
  const url = `api/v1/assessment/get-options`;
  return api({ url });
};

export const getModuleSection = (id: string) => {
  const url = `api/v1/course/module/get/${id}`;
  return api({ url });
};

export const createAssessment = (data:any) => {
  const url = `api/v1/assessment/create`;
  const method = "post";
  return api({ url, data, method });
};

export const createAssessmentQuestion = (data:any) => {
  const url = `api/v1/assessment/create-question`;
  const method = "post";
  return api({ url, data, method });
};
