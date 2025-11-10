import AxiosConfig from "./AxiosConfig.js";

export const searchVolumes = async (name) => {
    const res = await AxiosConfig.get(`/Comics/volumes?name=${name}`);
    return(res.data.$values);
  };

export const searchIssues = async (volumeId) => {
    const res = await AxiosConfig.get(`/Comics/issues?volumeId=${volumeId}`);
    return(res.data.$values);
};

export const createLocalIssue = async (dto) => {
    const response = await AxiosConfig.post("/Comics/create-local-issue", dto);
    return response;
}