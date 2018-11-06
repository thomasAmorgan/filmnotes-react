import {
  GET_ROLLS,
  ADD_ROLL,
  DELETE_ROLL,
  ROLLS_LOADING,
  SET_CURRENT_ROLL,
  TOGGLE_MODAL,
  MODAL_MODE
} from "../types";
import axios from "axios";

const rolls = axios.create({
  baseURL: "/api/rolls/"
});

export const getRolls = () => dispatch => {
  dispatch(setRollsLoading());
  rolls.get().then(res =>
    dispatch({
      type: GET_ROLLS,
      payload: res.data
    })
  );
};

export const setCurrentRoll = id => dispatch => {
  rolls.get(`${id}`).then(res =>
    dispatch({
      type: SET_CURRENT_ROLL,
      payload: res.data
    })
  );
};

export const addRoll = roll => dispatch => {
  axios.post("/api/rolls", roll).then(res =>
    dispatch({
      type: ADD_ROLL,
      payload: res.data
    })
  );
};

export const deleteRoll = id => dispatch => {
  axios.delete(`/api/rolls/${id}`).then(res =>
    dispatch({
      type: DELETE_ROLL,
      payload: id
    })
  );
};

export const setRollsLoading = () => {
  return {
    type: ROLLS_LOADING
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const setModalMode = mode => {
  return {
    type: MODAL_MODE,
    payload: mode
  };
};
