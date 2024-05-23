import axios from "axios";
import store from "../Redux/store";
// import { HTTP_METHODS, LOCAL_STORAGE_VARIABLES } from "../common/constants";


const makeNetworkCall = async ({
  url,
  method = "get",
  params = {}
}) => {
  const { auth } = store.getState();
  debugger
  // const accessToken = localStorage.getItem(LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN);
  // const refreshToken = localStorage.getItem(LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN);

  // axios Config modification
  let payload = { ...params };
  let headers = {
    // Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // if (method === HTTP_METHODS.PUT && params?.type === "file") {
  //   headers = {};
  //   payload = params.file;
  // }

  // axios final Config
  const axiosConfig = {
    method,
    url,
    headers: headers,
    data: payload,
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    const originalRequest = error.config;
    debugger
    // Check if the error is due to an expired access token
    if (error?.response?.status === 401 && error?.response?.data?.message === "Invalid Access Token") {
      // Refresh the access token using the refresh token
      try {
        const refreshConfig = {
          method: "post",
          // url: `${BaseAuthURL}/access-token`,
          headers: {
            // Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
          data: {},
        };
        const refreshResponse = await axios(refreshConfig);
        const newAccessToken = refreshResponse?.data?.data?.accessToken || "";
        // Update the access token in the local storage
        // localStorage.setItem(LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, newAccessToken);
        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        try {
          const retryResponse = await axios(originalRequest);
          return retryResponse;
        } catch (retryResponseError) {
          // return retryResponseError.response;
          throw retryResponseError?.response || retryResponseError;
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error("SESSION EXPIRED", refreshError);
        localStorage.clear();
        window.location.href = "/sessionExpired";
        // return refreshError.response;
        throw refreshError?.response || refreshError;
      }
    } else {
      // Handle other errors (e.g., network issues)
      console.error("Error making network call:", error);
      // return error.response;
      throw error?.response || error;
    }
  }
};

export default makeNetworkCall;
