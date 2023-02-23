import axios from "axios";
import { toast } from "react-toastify";
import { HOST } from "../constants/host";
import { ACCESS_TOKEN, JWT } from "../constants/key";
import { localStorageGetReduxState } from "../utils/StorageUtil";
const controller = new AbortController();
let cancelAxios = axios.CancelToken.source();
axios.defaults.baseURL = HOST;
axios.defaults.responseType = "json";
axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/signin" && err.response) {
            // Access Token was expired
            if (
                err?.response?.status === 403 ||
                err?.response?.data?.message?.includes("403")
            ) {
                toast.error("Please login!");
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "/sign-in";
                }, 3000);
            }
            //   if (err.response.status === 401 && !originalConfig._retry) {
            //     originalConfig._retry = true;
            //     localStorage.removeItem("ACCESS_TOKEN");
            //     cancelAxios.cancel("----stop all request---");
            //     toast.error("Your session is expired! Please login again");

            //     controller.abort();
            //     // try {
            //     //   const rs = await axios.post("/auth/refreshtoken", {
            //     //     refreshToken: localStorage.getItem("REFRESH_TOKEN"),
            //     //   });
            //     //   const { token } = rs.data;
            //     //   localStorage.setItem("TOKEN", token);
            //     //   return axios(originalConfig);
            //     // } catch (_error) {
            //     //   return Promise.reject(_error);
            //     // }
            //   }
        }
        return Promise.reject(err);
    }
);
const getAccessToken = () => {
    let accessToken = localStorage.getItem(JWT);
    if (!accessToken) {
        return "";
    }
    return accessToken;
};
const createConfig = () => {
    let getConfig = {
        headers: {
            //"Content-type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
        },
        cancelToken: cancelAxios.token,
    };
    return getConfig;
};
const customCreateConfig = (payload) => {
    let getConfig = {
        headers: {
            "Content-type": "Application/json",
            Authorization: "Bearer " + getAccessToken(),
        },
        data: payload,
    };
    return getConfig;
};
const multipartConfig = () => {
    let getConfig = {
        headers: {
            "Content-type": "multipart/form-data",
            Authorization: "Bearer " + getAccessToken(),
        },
    };
    return getConfig;
};
const request = {
    get: (url) => axios.get(url, createConfig()),
    post: (url, data) => axios.post(url, data, createConfig()),
    // file: (url, data) => axios.post(url, data, createConfig()),
    put: (url, data) => axios.put(url, data, createConfig()),
    patch: (url, data) => axios.patch(url, data, createConfig()),
    delete: (url) => axios.delete(url, createConfig()),
    deleteWithPayload: (url, payload) =>
        axios.delete(url, customCreateConfig(payload)),
    post_multipart: (url, data) => axios.post(url, data, multipartConfig()),
    patch_multipart: (url, data) => axios.patch(url, data, multipartConfig()),
};

export default request;
