// @flow
import React from "react";
import { AsyncStorage, Image } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import bookCar from "./screens/bookCar/";
import profileBookCar from "./screens/profileBookCar/";
import history from "./screens/history/";
import loginAcc from "./screens/loginAcc/";
import LoginSrc from "./screens/loginSrc/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/";
import Register from "./screens/register/";
import Walkthrough from "./screens/Walkthrough/";
import welcomeSrc from "./screens/welcomeSrc/";
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

const Drawer = DrawerNavigator(
  {
    bookCar: { screen: bookCar },
    profileBookCar: { screen: profileBookCar },
    history: { screen: history },
  },
  {
    initialRouteName: "bookCar",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = ({ initialRouteName }) => {
  const Main = StackNavigator(
    {
      welcomeSrc: { screen: welcomeSrc },
      loginAcc: { screen: loginAcc },
      Drawer: { screen: Drawer }
    },
    {
      headerMode: "none",
      initialRouteName: initialRouteName,
      contentComponent: props => <Sidebar {...props} />
    }
  );
  return <Main />;
};
export default App;
