import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import loginAccReducer from "../screens/loginAcc/reducer";
import loginSrcReducer from "../screens/loginSrc/reducer";
import registerReducer from "../screens/register/reducer";
import bookCarReducer from "../screens/bookCar/reducer";
import profileReducer from "../screens/profileBookCar/reducer";
import historyReducer from "../screens/history/reducer";

export default combineReducers({
  form: formReducer,
  homeReducer,
  loginAccReducer,
  loginSrcReducer,
  registerReducer,
  bookCarReducer,
  profileReducer,
  historyReducer
});
