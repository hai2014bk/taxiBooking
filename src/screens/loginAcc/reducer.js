const initialState = {
  isLoading: true,
  hasErrored: false,
  items: [],
  kind: "",
};
export default function(state: any = initialState, action: Function) {
  console.log(":qqqqqqqqqqqqqqqqqqq")
  switch (action.type) {
    case "CHECK_NUMBER_SUCCESS":
      return { ...state, kind: "success",items: action.items };
    case "CHECK_NUMBER_ERROR": 
      return { ...state, kind: "error",error: action.error };
    case "LOGIN_SUCCESS":
      return { ...state, kind: "success",items: action.items };
    case "LOGIN_ERROR": 
      return { ...state, kind: "error",error: action.error };
    default:
      return state;
  }
}
