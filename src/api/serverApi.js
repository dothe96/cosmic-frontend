import axiosClient from "./axiosClient";


const serverApi = {
    checkServer: () => {
        const url = "/ok";
        return axiosClient.get(url);
    }
}

export default serverApi;