import { APIRequestGET } from "../../utils/Api";
import { APIRequestPOST } from "../../utils/Api";
import * as mConstants from "../../utils/Constants";
export function historyError(error) {
  return {
    type: "HISTORY_ERROR",
    error
  };
}
export function historySuccess(items) {
  return {
    type: "HISTORY_SUCCESS",
    items
  };
}

export function history() {
  return dispatch => {
    var url = mConstants.BOOKCAR;
    var isAuth = true;
    APIRequestGET(
      url,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(historySuccess(response));
      },
      error => {
        console.log("error action", error);
        dispatch(historyError(error));
      }
    );
  };
}
