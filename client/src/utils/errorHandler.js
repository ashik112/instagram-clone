import { toast } from 'react-toastify';
import { store } from '../redux/store';
import authActionTypes from '../redux/reducers/Authentication/authActionTypes';
import history from './history';
import historyRoutes from '../routing/historyRoutes';
import { sleep } from './sleep';

export const errorType = {
  single: 1,
  authentication: 2,
  unknown: 4,
};

const handleGlobally = (error) => {
  switch (error.type) {
    case errorType.authentication:
      toast.error('Authentication Failed', {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.message !== 'Access Denied') {
        sleep(500).then(() => {
          try {
            store.dispatch({ type: authActionTypes.LOGOUT });
            const { authReducer: { token } } = store.getState();
            if (token) {
              store.dispatch({ type: 'RESET_APP' });
            }
            history.push(historyRoutes.login);
          } catch (e) {
            // handle error
          }
        });
      }
      break;
    case errorType.unknown:
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case errorType.single:
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      toast.error('Server was unable to process the request!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
  }
};

export const handleAjaxError = (error) => {
  try {
    const { status, data: { details } } = error;
    if (status === 401) {
      const res = {
        message: 'Authentication Required',
        statusText: details,
        code: 401,
        type: errorType.authentication,
        handleGlobally: (err) => handleGlobally(err),
      };
      handleGlobally(res);
      return res;
    }
  } catch (err) {
    // handle error
  }
  try {
    if (error && error.data && error.data.detail) {
      return {
        type: errorType.single,
        statusText: error.statusText,
        message: error.data.detail,
        handleGlobally: (err) => handleGlobally(err),
      };
    }
    return {
      type: errorType.unknown,
      statusText: 'Something went wrong!',
      message: 'Server was unable to process the request.',
    };
  } catch (e) {
    if (error && error.data && error.data.detail) {
      return {
        type: errorType.single,
        statusText: error.statusText,
        message: error.data.detail,
        handleGlobally: (err) => handleGlobally(err),
      };
    }
    return {
      type: errorType.unknown,
      statusText: 'Something went wrong!',
      message: 'Server was unable to process the request.',
      handleGlobally: (err) => handleGlobally(err),
    };
  }
};
