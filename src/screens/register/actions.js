
import {APIRequestGET} from  '../../utils/Api';
import {APIRequestPOST} from '../../utils/Api';
import * as mConstants from '../../utils/Constants';
export function registerError(error) {
    return {
      type: "REGISTER_ERROR",
      error
    };
  }
  export function registerSuccess(items) {
      return {
        type: "REGISTER_SUCCESS",
        items
      };
    }

export function register(params) {
  return(dispatch) => {
    console.log("action",params)
    var url = mConstants.REGISTER
    var isAuth = false
    APIRequestPOST(url,params,isAuth,
    response => {
      console.log("receive",response)
      dispatch(registerSuccess(response))
    },error =>{
      console.log('error action',error)
      dispatch(registerError(error))
    })
  }
}