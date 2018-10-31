import {
  GET_ROLLS,
  ADD_ROLL,
  DELETE_ROLL,
  ROLLS_LOADING,
  SET_CURRENT_ROLL
} from "../types";

const initialState = {
  rolls: [],
  loading: false,
  rollSelected: false,
  currentRoll: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROLLS:
      return {
        ...state,
        rolls: action.payload,
        loading: false
      };
    case SET_CURRENT_ROLL:
      return {
        ...state,
        currentRoll: action.payload,
        rollSelected: true
      };
    case ADD_ROLL:
      return {
        ...state,
        rolls: [action.payload, ...state.rolls]
      };
    case DELETE_ROLL:
      return {
        ...state,
        rolls: state.rolls.filter(roll => roll._id !== action.payload)
      };
    case ROLLS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
