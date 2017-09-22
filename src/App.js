// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import loginAcc from "./screens/loginAcc/";
import LoginSrc from "./screens/loginSrc/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/";
import Register from "./screens/register/";
import Walkthrough from "./screens/Walkthrough/";
import Comments from "./screens/Comments/";
import Channel from "./screens/Channel";
import Story from "./screens/Story";
import Home from "./screens/Home/";
import Channels from "./screens/Channels";
import Sidebar from "./screens/Sidebar";
import Overview from "./screens/Overview";
import Calendar from "./screens/Calendar/";
import Timeline from "./screens/Timeline";
import Feedback from "./screens/Feedback/";
import Profile from "./screens/Profile/";
import Settings from "./screens/Settings";
const App = ({ initialRouteName }) => {
  const Drawer = DrawerNavigator(
    {
      Home: { screen: Home },
      LoginSrc: { screen: LoginSrc },
      loginAcc: { screen: loginAcc },
      Login: { screen: Login },
      Register: { screen: Register },
      Channels: { screen: Channels },
      Overview: { screen: Overview },
      Calendar: { screen: Calendar },
      Timeline: { screen: Timeline },
      Feedback: { screen: Feedback },
      Profile: { screen: Profile },
      Settings: { screen: Settings }
    },
    {
      initialRouteName: initialRouteName,
      // initialRouteName: "Register",
      contentComponent: props => <Sidebar {...props} />
    }
  );
  return <Drawer/>
}
export default App;
// export default () =>
//   <Root>
//     <App />
//   </Root>;
