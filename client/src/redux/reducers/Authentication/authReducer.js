import authActionTypes from './authActionTypes';

const initialState = {
  loading: false,
  user: {},
  token: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      return {
        loading: true,
        error: null,
        token: null,
        user: {},
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user_details,
        token: action.payload.jwt_token,
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      };
    case authActionTypes.LOGIN_LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    case authActionTypes.LOGOUT:
      return {
        loading: false,
        user: {},
        error: null,
        token: null,
      };
    default:
      return state;
  }
}
