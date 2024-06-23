import api from "./api";

export const fetchAssessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-assessment-scores/${id}?clientId=${clientId}`;

  return api({ url });
};

export const getAllassessment = (id: string, clientId: string) => {
  const url = `api/v1/question/get-total-Assessment-scores/${id}?clientId=${clientId}`;
  return api({ url });
};
