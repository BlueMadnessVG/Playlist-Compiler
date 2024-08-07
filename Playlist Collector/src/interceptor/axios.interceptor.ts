import { AxiosRequestConfig } from "axios";
import { apiYouTube } from "../services/Youtube/Youtube.service";
import { getValidationError } from "../utils/controllers/validation.error";
import { SnackbarUtilities } from "../utils/controllers/snakbar.manager";
import { deleteLocalStorage } from "../utils/localstorage/localStorage.utility";

export const AxiosInterceptor = () => {
  const updateHeaders = (request: AxiosRequestConfig) => {
    const token = localStorage.getItem("YouTube_token");

    //    CONTROL THE ACCESS WHEN THE USER IS LOGIN IN OR NOT
    if (token) {
      //  UPDATE THE HEADER WITH THE USER TOKEN
      const newHeaders = {
        Authorization: `Bearer ${token}`,
      };
      request.headers = newHeaders;
    } else {
      //  UPDATE THE PARAMS TO USE THE YOUTUBE API KEY
      request.params = {
        ...request.params,
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
      };
    }

    return request;
  };

  apiYouTube.interceptors.request.use((request: any) => {
    console.log("Starting Request", request);
    return updateHeaders(request);
  });

  apiYouTube.interceptors.response.use(
    (response) => {
      console.log("Response", response);
      return response;
    },
    (error) => {
      console.log("error", error.code);
      if (error.code == "ERR_BAD_REQUEST") deleteLocalStorage("Youtube_token");
      SnackbarUtilities.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};
