import {
  GET_ROLLS,
  ADD_ROLL,
  UPDATE_ROLL,
  ADD_EXPOSURE,
  DELETE_ROLL,
  ROLLS_LOADING,
  ROLL_LOADING,
  EXPOSURE_LOADING,
  MODAL_LOADING,
  SET_CURRENT_ROLL,
  GET_ROLL,
  TOGGLE_MODAL,
  MODAL_MODE,
  DELETE_EXPOSURE,
  SET_CURRENT_EXPOSURE,
  UPDATE_EXPOSURE
} from "../types";

const initialState = {
  rolls: [],
  roll: {},
  rollsLoading: false,
  rollLoading: false,
  exposureLoading: false,
  modalLoading: false,
  currentRoll: {},
  currentExposure: {},
  modalOpen: false,
  modalMode: {
    mode: "",
    editing: false,
    deleting: false,
  },
  exposureForm: [
    { key: "title", placeholder: "title...", props: { required: true } },
    { key: "date", placeholder: "date..." },
    { key: "aperture", placeholder: "aperture..." },
    { key: "shutter", placeholder: "shutter..." },
    { key: "lens", placeholder: "lens..." },
    { key: "description", placeholder: "description...", type: "textarea" }
  ],
  rollForm: [
    { key: "title", placeholder: "title...", props: { required: true } },
    { key: "date", placeholder: "date..." },
    { key: "stock", placeholder: "stock..." },
    { key: "iso", placeholder: "iso..." },
    { key: "camera", placeholder: "camera..." },
    { key: "format", placeholder: "format..." },
    { key: "tags", placeholder: "tags..." },
    { key: "notes", placeholder: "description...", type: "textarea" }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROLLS:
      return {
        ...state,
        rollsLoading: false,
        rolls: action.payload
      };
    case GET_ROLL:
      return {
        ...state,
        rollLoading: false,
        roll: action.payload
      };
    case SET_CURRENT_ROLL:
      return {
        ...state,
        rollLoading: false,
        modalLoading: false,
        rolls: [...state.rolls],
        currentRoll: action.payload
      };
    case SET_CURRENT_EXPOSURE:
      return {
        ...state,
        modalLoading: false,
        currentExposure: action.payload
      };
    case ADD_ROLL:
      return {
        ...state,
        rollsLoading: false,
        rolls: [action.payload, ...state.rolls]
      };
    case UPDATE_ROLL:
      let index = state.rolls.findIndex((roll) => {
        return roll._id === action.payload._id
      });
      let rolls = state.rolls.filter(roll => roll._id !== action.payload._id);
      rolls.splice(index, 0, action.payload);

      return {
        ...state,
        rollsLoading: false,
        rollLoading: false,
        rolls: rolls,
        currentRoll: action.payload
      };
    case ADD_EXPOSURE:
      return {
        ...state,
        exposureLoading: false,
        rolls: [...state.rolls],
        currentRoll: action.payload
      };
    case UPDATE_EXPOSURE:
      return {
        ...state,
        exposureLoading: false,
        currentRoll: action.payload
      };
    case DELETE_ROLL:
      return {
        ...state,
        rollsLoading: false,
        rolls: state.rolls.filter(roll => roll._id !== action.payload)
      };
    case DELETE_EXPOSURE:
      return {
        ...state,
        exposureLoading: false,
        currentRoll: action.payload
      };
    case ROLLS_LOADING:
      return {
        ...state,
        rollsLoading: true
      };
    case ROLL_LOADING:
      return {
        ...state,
        rollLoading: true
      };
    case EXPOSURE_LOADING:
      return {
        ...state,
        exposureLoading: true
      };
    case MODAL_LOADING:
      return {
        ...state,
        modalLoading: true
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    case MODAL_MODE:
      return {
        ...state,
        modalMode: action.payload
      };
    default:
      return state;
  }
}
