import {
  AUTHENTICATE_USER,
  REGISTER_USER,
  USER_LOADING,
  USER_ERROR,
  USER_SIGNOUT
} from '../types';
import axios from 'axios';

const users = axios.create({
  baseURL: '/api/auth/'
});

export const registerUser = (newUser) => (dispatch) => {
  dispatch(setUserLoading());
  users.post('register', newUser)
    .then((res) => {
      dispatch(registerUserSuccess());
    })
    .catch((err) => {
      dispatch(sendError(err));
    });
}

export const authenticateUser = (user) => (dispatch) => {
  dispatch(setUserLoading());
  users.post('authenticate', user)
    .then((res) => {
      dispatch(authenticateUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(sendError(err));
    });
}

export const userSignout = () => (dispatch) => {
  dispatch(setUserLoading());
  localStorage.clear();
  dispatch({
    type: USER_SIGNOUT
  });
}

const registerUserSuccess = () => (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
}

const authenticateUserSuccess = (authData) => (dispatch) => {
  localStorage.setItem('jwtToken', authData.token);
  localStorage.setItem('tokenExp', authData.exp);
  dispatch({
    type: AUTHENTICATE_USER,
    payload: authData
  });
}

const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
}

const sendError = (err) => {
  return {
    type: USER_ERROR,
    payload: err
  };
}