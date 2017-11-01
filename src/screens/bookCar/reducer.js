const initialState = {
  isLoading: true,
  hasErrored: false,
  items: "",
  cartypes: "",
  Successdistance:"",
  Errordistance: "",
  error: "",
};

export default function(state: any = initialState, action: Function) {
  console.log("reducerBookcar")
  switch (action.type) {
    case "BOOKCAR_ERROR":
      return { ...state, kind:"error", error: action.error };
    case "BOOKCAR_SUCCESS":
      return { ...state, kind:"success", items: action.items };
    case "CARTYPES_SUCCESS":
      return { ...state, kind:"car", cartypes: action.cartypes };
    case "CARTYPES_ERROR":
      return { ...state, kind:"car", errorC: action.errorC };
    case "DISTANCE_SUCCESS":
      return { ...state, kind:"distance", Successdistance: action.Successdistance };
    case "DISTANCE_ERROR":
      return { ...state, kind:"distance", Errordistance: action.Errordistance };
    default:
      return state;
  }
}

