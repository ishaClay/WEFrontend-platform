import api from "./api";

export const fetchPillarList = () => {
    const url = `api/v1/pillar/list`;

    return api({ url });
};
