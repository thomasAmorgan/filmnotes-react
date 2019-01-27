import {
  GET_ROLLS,
  ADD_ROLL,
  ADD_EXPOSURE,
  DELETE_ROLL,
  ROLLS_LOADING,
  SET_CURRENT_ROLL,
  TOGGLE_MODAL,
  MODAL_MODE
} from "../types";

const initialState = {
  rolls: [],
  loading: false,
  rollSelected: false,
  currentRoll: {},
  modalOpen: false,
  modalMode: {
    mode: "",
    editing: false
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
    case ADD_EXPOSURE:
      return {
        ...state,
        rolls: [...state.rolls]
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
