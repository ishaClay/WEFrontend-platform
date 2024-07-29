import api from "./api";

interface createAssessmentProps {
  moduleSection: number,
  title?: string,
  passingPercentage?: string,
  timeBound?: number,
  timeDuration?: string
}

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

export const createAssessment = (data: createAssessmentProps) => {
  const url = `api/v1/assessment/create`;
  const method = "post";
  return api({ url, data, method });
};

export const updateAssessment = async ({ data, id }: { data: createAssessmentProps, id: string }) => {
  const url = `api/v1/assessment/update/${id}`;
  const method = "put";
  const res = await api({ url, data, method });
  return res.data
};

export const createAssessmentQuestion = (data: any) => {
  const url = `api/v1/assessment/create-question`;
  const method = "post";
  return api({ url, data, method });
};

export const getAssessmentById = async (id: string) => {
  const url = `api/v1/assessment/get/${id}`;
  const res = await api({ url });
  return res.data;
};
