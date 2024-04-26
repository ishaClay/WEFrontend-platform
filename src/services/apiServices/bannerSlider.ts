

import api from "./api";

export const fetchBannerSlider = () => {
    const url = `api/v1/slider/list`;

    return api({ url });
};