import { APIRequestGET } from "../../utils/Api";
import { APIRequestPOST } from "../../utils/Api";
import * as mConstants from "../../utils/Constants";

export function checkError(error) {
  return {
    type: "CHECK_NUMBER_ERROR",
    error
  };
}
export function checkSuccess(items) {
  return {
    type: "CHECK_NUMBER_SUCCESS",
    items
  };
}

export function checkNumber(params) {
  return dispatch => {
    console.log("action", params);
    var url = mConstants.CHECK_NUMBER;
    var isAuth = false;
    APIRequestPOST(
      url,
      params,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(checkSuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(checkError(error));
      }
    );
  };
}

export function loginError(error) {
  return {
    type: "LOGIN_ERROR",
    error
  };
}
export function loginSuccess(items) {
  return {
    type: "LOGIN_SUCCESS",
    items
  };
}

export function login(params) {
  return dispatch => {
    console.log("action", params);
    var url = mConstants.LOGIN;
    var isAuth = false;
    APIRequestPOST(
      url,
      params,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(loginSuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(loginError(error));
      }
    );
  };
}
