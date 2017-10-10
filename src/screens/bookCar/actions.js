import { APIRequestGET } from "../../utils/Api";
import { APIRequestPOST } from "../../utils/Api";
import * as mConstants from "../../utils/Constants";

export function bookCarError(error) {
  return {
    type: "BOOKCAR_ERROR",
    error
  };
}
export function bookCarSuccess(items) {
  return {
    type: "BOOKCAR_SUCCESS",
    items
  };
}

export function carTypesSuccess(cartypes) {
  return {
    type: "CARTYPES_SUCCESS",
    cartypes
  };
}

export function carTypesError(errorC) {
  return {
    type: "CARTYPES_ERROR",
    errorC
  };
}

export function carbooking(params) {
  return dispatch => {
    console.log("action", params);
    var url = mConstants.BOOKCAR;
    var isAuth = false;
    APIRequestPOST(
      url,
      params,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(bookCarSuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(bookCarError(error));
      }
    );
  };
}

export function getcartype(){
  return dispatch => {
    var url = mConstants.CARTYPES;
    var isAuth = false;
    APIRequestGET(
      url,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(carTypesSuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(carTypesError(error));
      }
    );
  };
}
