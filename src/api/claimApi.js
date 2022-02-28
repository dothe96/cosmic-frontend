import axiosClient from "./axiosClient";

const claimApi = {
    claimToken: params => {
        const url = "/airdrop/claim";
        return axiosClient.post(url, { params });
    },
    getAirdropEndTime: () => {
        const url = "/airdrop/claim/time";
        return axiosClient.get(url);
    },

    getClaimAllInfo: params => {
        const url = "/airdrop/claim/all";
        return axiosClient.get(url, { params });
    },

    updateClaimAllInfo: params => {
        const url = "/airdrop/claim/all";
        return axiosClient.put(url, { params });
    }
}

export default claimApi;