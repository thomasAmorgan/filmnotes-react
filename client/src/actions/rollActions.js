import {
  GET_ROLLS,
  ADD_ROLL,
  UPDATE_ROLL,
  DELETE_ROLL,
  ROLLS_LOADING,
  ROLL_LOADING,
  EXPOSURE_LOADING,
  MODAL_LOADING,
  GET_ROLL,
  SET_CURRENT_ROLL,
  TOGGLE_MODAL,
  MODAL_MODE,
  ADD_EXPOSURE,
  DELETE_EXPOSURE,
  SET_CURRENT_EXPOSURE,
  UPDATE_EXPOSURE,
  ROLLS_ERROR
} from "../types";
import axios from "axios";

const rolls = axios.create({
  baseURL: "/api/rolls/",
  headers: { 'authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});

const setRollsHeader = () => {
  rolls.defaults.headers['authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
}

export const getRolls = () => (dispatch) => {
  dispatch(setRollsLoading());
  setRollsHeader();
  rolls.get("")
    .then(res => {
      dispatch(getRollsSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const getRollsSuccess = (rolls) => (dispatch) => {
  dispatch({
    type: GET_ROLLS,
    payload: rolls
  });
}

export const getRoll = (id) => (dispatch) => {
  dispatch(setRollLoading());
  rolls.get(`${id}`)
    .then(res => {
      dispatch(getRollSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const getRollSuccess = (roll) => (dispatch) => {
  dispatch({
    type: GET_ROLL,
    payload: roll
  });
}

export const setCurrentRoll = (id) => (dispatch) => {
  dispatch(setRollLoading());
  dispatch(setModalLoading());
  rolls.get(`${id}`)
    .then(res => {
      dispatch(setCurrentRollSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const setCurrentRollSuccess = (currentRoll) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_ROLL,
    payload: currentRoll
  });
}

export const setCurrentExposure = (rollId, expId) => (dispatch) => {
  dispatch(setModalLoading());
  rolls.get(`${rollId}/exposure/${expId}`)
    .then(res => {
      dispatch(setCurrentExposureSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const setCurrentExposureSuccess = (currentExposure) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_EXPOSURE,
    payload: currentExposure
  });
}

export const addRoll = (roll) => (dispatch) => {
  dispatch(setRollsLoading());
  rolls.post("", roll)
    .then(res => {
      dispatch(addRollSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
}

const addRollSuccess = (newRoll) => (dispatch) => {
  dispatch({
    type: ADD_ROLL,
    payload: newRoll
  });
}

export const updateRoll = (id, roll) => (dispatch) => {
  dispatch(setRollsLoading());
  dispatch(setRollLoading());
  rolls.patch(`${id}`, roll)
    .then(res => {
      dispatch(updateRollSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
}

const updateRollSuccess = (updatedRoll) => (dispatch) => {
  dispatch({
    type: UPDATE_ROLL,
    payload: updatedRoll
  });
}

export const addExposure = (id, exposure) => (dispatch) => {
  dispatch(setExposureLoading());
  rolls.put(`${id}`, exposure)
    .then(res => {
      dispatch(addExposureSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const addExposureSuccess = (newExposure) => (dispatch) => {
  dispatch({
    type: ADD_EXPOSURE,
    payload: newExposure
  });
}

export const updateExposure = (rollId, expId, exposure) => (dispatch) => {
  dispatch(setExposureLoading());
  rolls.patch(`${rollId}/exposure/${expId}`, exposure)
    .then(res => {
      dispatch(updateExposureSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
}

const updateExposureSuccess = (updatedRoll) => (dispatch) => {
  dispatch({
    type: UPDATE_EXPOSURE,
    payload: updatedRoll
  });
}

export const deleteRoll = (id) => (dispatch) => {
  dispatch(setRollsLoading());
  rolls.delete(`${id}`)
    .then(res => {
      dispatch(deleteRollSuccess(id))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const deleteRollSuccess = (rollId) => dispatch => {
  dispatch({
    type: DELETE_ROLL,
    payload: rollId
  });
}

export const deleteExposure = (rollId, expId) => (dispatch) => {
  dispatch(setExposureLoading());
  rolls.delete(`${rollId}/exposure/${expId}`)
    .then(res => {
      dispatch(deleteExposureSuccess(res.data))
    })
    .catch((err) => {
      dispatch(setRollsError(err));
    });
};

const deleteExposureSuccess = (currentRoll) => (dispatch) => {
  dispatch({
    type: DELETE_EXPOSURE,
    payload: currentRoll
  });
}

export const setRollsLoading = () => {
  return {
    type: ROLLS_LOADING
  };
};

export const setRollLoading = () => {
  return {
    type: ROLL_LOADING
  };
};

export const setExposureLoading = () => {
  return {
    type: EXPOSURE_LOADING
  };
};

export const setModalLoading = () => {
  return {
    type: MODAL_LOADING
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const setModalMode = (mode) => {
  return {
    type: MODAL_MODE,
    payload: mode
  };
};

const setRollsError = (err) => {
  return {
    type: ROLLS_ERROR,
    payload: err
  }
} 
