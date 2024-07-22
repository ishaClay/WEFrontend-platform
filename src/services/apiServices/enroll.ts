import { enroll, EnrolledCoursesType } from "@/types/enroll";
import api from "./api";
import { CourseDiscountType } from "@/types/course";

export const fetchEnroll = (data:enroll) => {
  const url = `api/v1/course/course-Enroll`;
  const method = "post";
  return api({ url, method, data });
};

export const fetchEnrollmentAccepted = async (id: string) : Promise<EnrolledCoursesType | any> => {
  const url = `api/v1/course/course-enrollment-Accepted/${id}`;
  const res = await api({ url });
  return res?.data
};

export const fetchCourseDiscountEnroll = async (id?: number | null) : Promise<CourseDiscountType> => {
  const url = `api/v1/course/courseDiscount`;
  let params:any = {};
  if(id){
    params["courseId"] = id;
  }
  const res = await api({ url, params });
  return res?.data
};