import axiosClient from "./axiosClient";

const userApi = {
    getUserInfo: params => {
        const url = "/user/info";
        return axiosClient.get(url, { params })
    },
    getClaimState: params => {
        const url = "/user/claimstate";
        return axiosClient.get(url, { params });
    },
}

export default userApi;