import api from "./api";

export const fetchDataByClientwise = (clienturl: string) => {
    const url = `api/v1/client/get_by_url?url=${clienturl}`;
    return api({ url });
};

export const CourseSlider = () => {
    const url = `api/v1/course-slider/list`;
    return api({ url });
};

export const clientwiseCourseSlider = (id: string) => {
    const url = `api/v1/course-slider/list?clientId=${id}`;
    return api({ url });
};

export const getCourseSlider = async (id: string, type: string) => {
    const url = `api/v1/course-slider/getDeshboardcoursesSlider?clientId=${id}&status=${type}`;
    const res = await api({ url });
    return res.data;
};

clientwiseCourseSlider