import {AsyncStorage} from 'react-native'

import * as mConstants from './Constants';

export function APIRequestGET(url,isAuth,successCallback,errorCallback) {
    if (!isAuth) {
        fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if(response.status == 200){
            response.json().then((responseJson) => {
            successCallback(responseJson)
            })
        } else {
            console.log('response',response._bodyText.message)
            var error = {
                "error": true,
                "message": "Fail to request",
            }
            console.log(response)
            errorCallback(error)
        }
        })
        .catch((error) => {
        console.log(error);
		errorCallback(error)
        });
    } else {
    var token;
     AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
     token = JSON.parse(result).accessToken
     console.log('token',token)
      fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then((response) => {
     if(response.status == 200){
            response.json().then((responseJson) => {
             console.log(response)
            successCallback(responseJson)
            })
        } else {
            console.log('response',response)
            var error = {
                "error": true,
                "message":"Fail to request"
            }
            console.log(response)
            errorCallback(error)
        }
     })
    .catch((error) => {
      console.log(error);
	  errorCallback(error)
    });
     });
    }
}

export function APIRequestPOST(url,param,isAuth,successCallback,errorCallback) {

    if (!isAuth) {
        fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
    }).then((response) => {
        console.log("API",response)
        // if(response.status == 401) {
        //     successCallback(response)
        // }
        if(response.status == 200 || response.status == 201) {
            response.json().then((responseJson) => {
            successCallback(responseJson)
            })
        } else {
            console.log('response',response)
            var error = {
                "status": response.status,
                "error": true,
                "message": "Fail to request",
            }
            errorCallback(error)
        }
        })
        .catch((error) => {
        console.log("errorcallback",error);
		 errorCallback(error)
        });
    } else {
    var token;
     AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
     token = JSON.parse(result).accessToken
      fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(param)
    }).then((response) => {
     if(response.status == 200){
            response.json().then((responseJson) => {
            successCallback(responseJson)
            })
        } else {
            console.log('response',response)
            var error = {
                "status":response.status,
                "error": true,
                "message": "Fail to request",
            }
            console.log(error)
            console.log(response)
            errorCallback(error)
        }
     })
    .catch((error) => {
      console.log("whatisthis",error);
	   errorCallback(error)
    });
     });
    }
}
