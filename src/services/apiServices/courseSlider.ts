import api from "./api";

export const CourseSlider = () => {
    const url = `api/v1/course-slider/list`;
    return api({ url });
};