import api from "./api";

// export const fetchAllocatedCourse = (data: string, page: number) => {
//   const url = `api/v1/course/course-enrollment-Accepted/11`;
//   console.log("data", data, page);

//   return api({ url });
// };
export const fetchAllocatedCourse = () => {
  const url = `api/v1/course/course-enrollment-Accepted/11`;

  return api({ url });
};
