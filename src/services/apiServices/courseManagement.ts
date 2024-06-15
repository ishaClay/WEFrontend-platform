import api from "./api";

export const fetchEnrollmentRequest = (trainerID: string, params?: string) => {
  const url = `api/v1/course/course-enrollment-requests/${trainerID}?enroll=${params}`;

  return api({ url });
};

export const UpdateEnrollmentRequest = (courseID: number, data: any) => {
  const url = `api/v1/course/requests-update/${courseID}`;
  const method = "put";

  return api({ url, data, method });
};
