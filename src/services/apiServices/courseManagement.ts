import { CourseByVersionType, GetSingleCourseByIdType } from "@/types/course";
import { AllCoursesResponse, CoursesNameType, InstitutionsListType } from "@/types/courseManagement";
import api from "./api";

export interface courseRequest {
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: string;
  price: string;
  discout: string;
  discountApplicable: string;
  providerName: number;
  clientId: number;
}

export interface courseRequestTwoPage {
  nfqLeval?: number;
  ectsCredits?: string;
  fetCredits?: string;
  certificate?: number;
  time?: number;
  isOnline?: number;
  universityAddress?: string;
  duration?: string;
  instituteOther?: string;
  otherInstitutionName?: string;
  description?: string;
  bannerImage?: string;
  keys?: string;
}

export const fetchEnrollmentRequest = (trainerID: string, enroll?: string) => {
  const url = `api/v1/course/course-enrollment-requests/${trainerID}`;
  const params: any = {};
  if (enroll) {
    params["enroll"] = enroll;
  }
  return api({ url, params });
};

export const UpdateEnrollmentRequest = (courseID: number, data: any) => {
  const url = `api/v1/course/requests-update/${courseID}`;
  const method = "put";

  return api({ url, data, method });
};

export const fetchCourseAllCourse = async (
  searchKeyword: string,
  userId?: number,
  status?: string,
): Promise<AllCoursesResponse> => {
  const url = `api/v1/course/getAllCourses`;
  const params: any = {};
  if (searchKeyword) {
    params["keyword"] = searchKeyword;
  }
  if (userId) {
    params["userid"] = userId;
  }
  if (status) {
    params["status"] = status;
  }
  const res = await api({ url, params });

  return res.data;
};

export const createCourse = (data: courseRequest) => {
  const url = `api/v1/course/create-course`;
  const method = "post";
  return api({ url, data, method });
};

export const createCourseTwoPage = ({
  data,
  id,
  paramsversion,
}: {
  data: courseRequestTwoPage;
  id: string;
  paramsversion: string;
}) => {
  const url = `api/v1/course/update-course/${id}/${paramsversion}`;
  const method = "put";
  return api({ url, data, method });
};

export const fetchNfqlLevel = async () => {
  const url = `api/v1/course/nfqlevel/nfqlevellist`;
  const method = "get";
  const res = await api({ url, method });
  return res.data;
};

export const fetchSingleCourseById = async (
  id?: string
): Promise<GetSingleCourseByIdType> => {
  const url = `api/v1/course/get/${id}`;
  const res = await api({ url });
  return res.data;
};

export const updateCourse = (data: {
  payload: courseRequest;
  id: string;
  version: string;
}) => {
  const url = `api/v1/course/update-course/${data?.id}/${data?.version}`;
  const method = "put";
  return api({ url, data: data?.payload, method });
};

export const publishCourse = (data: { status: string; id: number }) => {
  const url = `api/v1/course/status/update/${data?.id}`;
  const method = "post";
  return api({ url, data: { status: data?.status }, method });
};

export const copyCourse = (id: number) => {
  const url = `api/v1/course/copy-course/${id}`;
  const method = "put";
  return api({ url, method });
};

export const getCourseByTrainee = async (
  id: number
): Promise<AllCoursesResponse> => {
  const url = `api/v1/trainer-company/allcoursebytrainer/${id}`;
  const method = "get";
  const res = await api({ url, method });
  return res.data;
};

export const deleteCourse = (id: number) => {
  const url = `api/v1/course/delete/${id}`;
  const method = "delete";
  return api({ url, method });
};

export const getAllEmployeeCourseList = async ({ id, status, categories }: { id: number, status: string, categories: string }) => {
  const url = `api/v1/employee/getCourseEnrollOneEmployee/${id}?status=${status}&categories=${categories}`;
  const method = "get";
  const res = await api({ url, method });
  return res.data;
}
export const updateVersion = (data: { mainCourseId: number, versionId: number, userId: number }): Promise<CourseByVersionType | any> => {
  const url = `api/v1/course/change-course-version`;
  const method = "post";
  return api({ url, data, method });
};

export const fetchgetInstitutionsList = async (): Promise<InstitutionsListType> => {
  const url = `api/v1/thirdparty/getInstitutionsName`;
  const res = await api({ url });
  return res?.data
};

export const fetchgetCoursesNameList = async (): Promise<CoursesNameType> => {
  const url = `api/v1/thirdparty/getCoursesName`;
  const res = await api({ url });
  return res?.data
};
export const createNewVersion = async (data: { courseId: number, version: number }) => {
  const url = `api/v1/course/createCourseWithNewVersion`;
  const method = "post";
  const res = await api({ url, data, method });
  return res.data;
}

export const createInquiry = async (data: { courseId: number, userId: number }) => {
  const url = `api/v1/inquire/create`;
  const method = "post";
  const res = await api({ url, data, method });
  return res.data;
}