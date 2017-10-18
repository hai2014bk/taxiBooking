// import { APIRequestGET } from "../../utils/Api";
// import { APIRequestPOST } from "../../utils/Api";
// import * as mConstants from "../../utils/Constants";
export function openSidebar() {
  console.log(1)
  return {
    type: "OPEN_SIDEBAR",
  };
}

export function closeSidebar() {
  console.log(2)
  return {
    type: "CLOSE_SIDEBAR",
  };
}

export function reloadSidebar() {
  console.log(3)
  return {
    type: "RELOAD_SIDEBAR",
  };
}

// export function updateProfile(params) {
//   return dispatch => {
//     console.log("action", params);
//     var url = mConstants.PROFILE;
//     var isAuth = false;
//     APIRequestPOST(
//       url,
//       params,
//       isAuth,
//       response => {
//         console.log("receive", response);
//         dispatch(profileSuccess(response));
//       },
//       error => {
//         console.log("error action", error);
//         dispatch(profileError(error));
//       }
//     );
//   };
// }
