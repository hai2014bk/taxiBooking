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

export function distanceSuccess(Successdistance) {
  console.log("distance",Successdistance)
  return {
    type: "DISTANCE_SUCCESS",
    Successdistance
  };
}

export function distanceError(Errordistance) {
  console.log("Errordistance",Errordistance)
  return {
    type: "DISTANCE_ERROR",
    Errordistance
  };
}

export function carbooking(params) {
  return dispatch => {
    console.log("action", params);
    var url = mConstants.BOOKCAR;
    var isAuth = true;
    APIRequestPOST(
      url,
      params,
      isAuth,
      response => {
        console.log("receive", response);
        dispatch(bookCarSuccess(response));
        dispatch(bookCarError(""));
      },
      error => {
        console.log("error action", error);
        dispatch(bookCarError(error));
        dispatch(bookCarSuccess(""));
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

export function distance(originlat,originlng,destinationlat,destinationlng) {
  return dispatch => {
  fetch(
    "https://maps.googleapis.com/maps/api/directions/json?origin=" +
      originlat +
      "," +
      originlng +
      "&destination=" +
      destinationlat +
      "," +
      destinationlng +
      "&mode=driver&sensor=true&key=AIzaSyB-O4m9EPQ3aL-ZCjdWnghoepXlQOlGDYg"
  )
    .then(response => response.json())
    .then(responsejson => {
      // console.log("responsejson",responsejson);
      // console.log("value",responsejson.routes[0].legs[0].distance.value);
      if (responsejson.status === "OK") {
        dispatch(distanceSuccess(responsejson));
        dispatch(distanceError(""));
      } else {
        dispatch(distanceError(responsejson));
        dispatch(distanceSuccess(""));
      }
    })
    .catch(error => {
      console.warn(error);
    });
  }
}
