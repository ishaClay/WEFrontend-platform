import api from "./api";

export const fetchAllocatedCourseById = async (enrollId: number) => {
  const url = `api/v1/course/course-enrollmentById/${enrollId}`;

  const res = await api({ url });
  return res.data
};

export const fetchAllocatedCourse = async (id: number, filter?: string) => {
  const url = `api/v1/course/course-enrollment/${id}?filter=${filter}`;

  const res = await api({ url });
  return res.data
};


export const allocateCourse = async (data: {
  companyId: number,
  enrollId: number,
  employeeId: number[]
}) => {
  const url = `api/v1/course/enroll`;
  const res = await api({ url, method: "post", data });
  return res.data
}