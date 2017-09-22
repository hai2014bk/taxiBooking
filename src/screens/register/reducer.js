const initialState = {
  isLoading: true,
  hasErrored: false,
  items: []
};

export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "REGISTER_ERROR": console.log("register",action.error)
      return { ...state, kind:"error", error: action.error };
    case "REGISTER_SUCCESS":console.log("register success",action.items)
      return { ...state, kind:"success", items: action.items };
    default:
      return state;
  }
}
