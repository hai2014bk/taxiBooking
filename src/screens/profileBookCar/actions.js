import { APIRequestGET } from "../../utils/Api";
import { APIRequestPOST } from "../../utils/Api";
import * as mConstants from "../../utils/Constants";
export function profileError(error) {
  return {
    type: "UPDATEPROFILE_ERROR",
    error
  };
}
export function profileSuccess(items) {
  return {
    type: "UPDATEPROFILE_SUCCESS",
    items
  };
}

export function updateProfile(params) {
  return dispatch => {
    console.log("action", params);
    var url = mConstants.PROFILE;
    var isAuth = false;
    APIRequestPOST(
      url,
      params,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(profileSuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(profileError(error));
      }
    );
  };
}
