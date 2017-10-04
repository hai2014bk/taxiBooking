// export function itemsHasErrored(bool: boolean) {
//   return {
//     type: "ITEMS_HAS_ERRORED",
//     hasErrored: bool
//   };
// }
// export function itemsIsLoading(bool: boolean) {
//   return {
//     type: "ITEMS_IS_LOADING",
//     isLoading: bool
//   };
// }
// export function itemsFetchDataSuccess(items: Object) {
//   return {
//     type: "ITEMS_FETCH_DATA_SUCCESS",
//     items
//   };
// }
// export function itemsFetchData(url: any) {
//   return dispatch => {
//     dispatch(itemsFetchDataSuccess((url: any)));
//     dispatch(itemsIsLoading(false));
//   };
// }
import {APIRequestGET} from  '../../utils/Api';
import {APIRequestPOST} from '../../utils/Api';
import * as mConstants from '../../utils/Constants';

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
  return(dispatch) => {
    console.log("action",params)
    var url = mConstants.CHECK_NUMBER
    var isAuth = false
    APIRequestPOST(url,params,isAuth,
    response => {
      console.log("receive",response)
      dispatch(checkSuccess(response))
    },error =>{
      console.log('error action',error)
      dispatch(checkError(error))
    })
  }
}