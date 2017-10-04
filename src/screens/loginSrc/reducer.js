const initialState = {
  isLoading: true,
  hasErrored: false,
  items: []
};
export default function(state: any = initialState, action: Function) {
  // console.log("123333333",action)
  switch (action.type) {
    case "LOGIN_SUCCESS": 
      return { ...state, kind:"success", items: action.items };
    case "LOGIN_ERROR":
      return { ...state, kind:"error", error: action.error };
    default:
      return state;
  }
}
