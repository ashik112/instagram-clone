import axios from 'axios';
import authActionTypes from './authActionTypes';
import historyRoutes from '../../../routing/historyRoutes';
import history from '../../../utils/history';
import { apiRoutes } from '../../../routing/apiRoutes';
import { sleep } from '../../../utils/sleep';

const login = (credentials) => {
  function start(params) {
    return { type: authActionTypes.LOGIN_REQUEST, payload: params };
  }

  function success(data) {
    return { type: authActionTypes.LOGIN_SUCCESS, payload: data };
  }

  function failure(error) {
    return { type: authActionTypes.LOGIN_FAILURE, payload: error };
  }

  return async (dispatch) => {
    const { username, password } = credentials;
    await dispatch(start({ username, password }));
    await axios.post(apiRoutes.login, { username, password })
      .then(async (res) => {
        if (res.data && res.data.token) {
          await dispatch(success(res.data));
          await sleep(50);
          history.push(historyRoutes.profile(res.data.user.username));
        }
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};

const stopLoading = () => (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_LOADING_STOP });
};

/**
 * Log Out User
 * @returns {function(...[*]=)}
 */
const logout = () => (dispatch) => {
  try {
    dispatch({ type: authActionTypes.LOGOUT });
    dispatch({ type: 'RESET_APP' });
    history.push(historyRoutes.login);
  } catch (e) {
    // handle error
  }
};

const authActions = {
  login,
  logout,
  stopLoading,
};

export default authActions;
