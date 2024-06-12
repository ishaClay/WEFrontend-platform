import api from "./api";

export const fetchAssessment = (id: string) => {
  const url = `api/v1/question/get-assessment-scores/${id}`;

  return api({ url });
};

export const getAllassessment = (id: string) => {
  const url = `api/v1/question/get-total-Assessment-scores/${id}`;
  return api({ url });
};
