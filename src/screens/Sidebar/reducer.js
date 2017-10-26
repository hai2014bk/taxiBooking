const initialState = {
  sidebarDisabled: true,
  kind: "close",
};
export type State ={
  kind: string,
  sidebarDisabled: boolean,
}
export default function(state: State = initialState, action: Function) {
  // console.log("Reducer")
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return { ...state, kind: "open", };
    case "CLOSE_SIDEBAR":
      return { ...state, kind: "close" };
    case "RELOAD_SIDEBAR":
      return { ...state, kind: "reload", };
    default:
      return state;
  }
}