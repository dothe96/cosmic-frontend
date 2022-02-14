import axiosClient from "./axiosClient";

const claimApi = {
    claimToken: params => {
        const url = "/airdrop/claim";
        return axiosClient.post(url, { params });
    },
    getAirdropEndTime: () => {
        const url = "/airdrop/claim/time";
        return axiosClient.get(url);
    }
}

export default claimApi;