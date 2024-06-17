import { AllCourseResponse } from "@/types/courseManagement";
import api from "./api";

export interface courseRequest {
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  price: number;
  discout: number;
  discountApplicable: number;
  providerName: number;
  clientId: number;
}

export const fetchEnrollmentRequest = (trainerID: string, params?: string) => {
  const url = `api/v1/course/course-enrollment-requests/${trainerID}?enroll=${params}`;

  return api({ url });
};

export const UpdateEnrollmentRequest = (courseID: number, data: any) => {
  const url = `api/v1/course/requests-update/${courseID}`;
  const method = "put";

  return api({ url, data, method });
};

export const fetchCourseAllCourse = async (): Promise<AllCourseResponse> => {
  const url = `api/v1/course/getAllCourses`;
  const res = await api({ url });
  console.log("res=====>", res.data);

  return res.data;
};

export const createCourse = (data: courseRequest) => {
  const url = `api/v1/course/create-course/`;
  const method = "post";
  return api({ url, data, method });
}