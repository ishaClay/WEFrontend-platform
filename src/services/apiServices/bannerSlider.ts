

import api from "./api";

export const fetchBannerSlider = () => {
    const url = `api/v1/slider/list`;

    return api({ url });
};

export const clientwiseBannerSlider = (id: string) => {
    const url = `api/v1/slider/list?clientId=${id}`;

    return api({ url });
};

clientwiseBannerSlider