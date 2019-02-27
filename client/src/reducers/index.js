import { combineReducers } from "redux";
import rollReducer from "./rollReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  userAuth: userReducer,
  rollsCollection: rollReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_SIGNOUT') {
    state = undefined;
  }

  return appReducer(state, action);
}
