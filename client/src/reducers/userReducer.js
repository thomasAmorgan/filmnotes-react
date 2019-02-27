import {
  AUTHENTICATE_USER,
  REGISTER_USER,
  USER_LOADING,
  USER_ERROR,
  USER_SIGNOUT
} from '../types';

const initialState = {
  userLoading: false,
  authErrorMessage: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        userLoading: false,
        authErrorMessage: null
      };
    case REGISTER_USER:
      return {
        ...state,
        userLoading: false,
        authErrorMessage: null
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
        authErrorMessage: null
      };
    case USER_ERROR:
      return {
        ...state,
        userLoading: false,
        authErrorMessage: action.payload
      }
    case USER_SIGNOUT:
      return {
        ...state,
        userLoading: false,
        authErrorMessage: null
      }
    default:
      return state;
  }
}