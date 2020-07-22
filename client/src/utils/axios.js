import axiosInstance from 'axios';
import { handleAjaxError } from './errorHandler';
import { store } from '../redux/store';

/**
 * Create Axios Instance
 * @type {AxiosInstance}
 */
const axios = axiosInstance.create({
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

/**
 * Provides Http Headers
 * @returns {{Authorization: string, 'Content-Type': string}|{}}
 */
function authHeaderProvider() {
  // * return authorization header with jwt token
  try {
    // * get company id from redux store
    const { authReducer: { token } } = store.getState();
    if (token) {
      return {
        Authorization: `JWT ${token}`,
      };
    }
    return {};
  } catch (e) {
    return {};
  }
}

// * declare a request interceptor
axios.interceptors.request.use(
  (config) => {
    const cfg = config;
    const header = authHeaderProvider();
    if (header && header.Authorization) {
      cfg.headers.Authorization = header.Authorization;
    }
    cfg.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // Promise.reject(error);
    throw error;
  },
);

// * declare a response interceptor
axios.interceptors.response.use((response) => response, // do something with the response data
  (error) => Promise.reject(handleAjaxError(error.response))); // handle the response error

export default axios;
