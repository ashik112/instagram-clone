import axios from 'axios';
import { toast } from 'react-toastify';
import authActionTypes from './authActionTypes';
import historyRoutes from '../../../routing/historyRoutes';
import history from '../../../utils/history';
import { apiRoutes } from '../../../routing/apiRoutes';

const login = (credentials) => {
  function start(params) {
    return { type: authActionTypes.LOGIN_REQUEST, payload: params };
  }

  function success(user) {
    return { type: authActionTypes.LOGIN_SUCCESS, payload: user };
  }

  function failure(error) {
    return { type: authActionTypes.LOGIN_FAILURE, payload: error };
  }

  return async (dispatch) => {
    const { username, password } = credentials;
    await dispatch(start({ username, password }));
    await axios.post(apiRoutes.login, { username, password })
      .then(async (res) => {
        if (res.data && res.data.user_details) {
          await dispatch(success(res.data));
          history.push(historyRoutes.dashboard.sales);
        }
      })
      .catch((error) => {
        const message = error.response.data.detail;
        if (message) {
          toast.error('Wrong Username / Password!', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
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
