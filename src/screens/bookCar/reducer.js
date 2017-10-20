const initialState = {
  isLoading: true,
  hasErrored: false,
  items: []
};

export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "BOOKCAR_ERROR": console.log("bookcar error",action.error)
      return { ...state, kind:"error", error: action.error };
    case "BOOKCAR_SUCCESS":console.log("bookcar success",action.items)
      return { ...state, kind:"success", items: action.items };
    case "CARTYPES_SUCCESS":console.log("car success",action.cartypes)
      return { ...state, kind:"car", cartypes: action.cartypes };
    case "CARTYPES_ERROR":console.log("car error",action.cartypes)
      return { ...state, kind:"car", errorC: action.errorC };
    default:
      return state;
  }
}

