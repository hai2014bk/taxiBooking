import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  StyleProvider,
  Container,
  Header,
  Content,
} from "native-base";
import { AsyncStorage, Image } from "react-native";
import * as mConstants from "../utils/Constants";
import { Root } from "native-base";

import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
// var loginInfo = AsyncStorage.getItem(mConstants.LOGIN_INFO);
// var loginInfo = AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
//   console.log("result",result);
//   loginInfo=result;
//   console.log(loginInfo)
// });
// var initialRoute = "";
// var isLoaded = false;
import Spinner from "react-native-loading-spinner-overlay";
// const logo = require("../Icon/PNG/Back.png");
export default class Setup extends Component {
  state: {
    store: Object,
    isLoading: boolean
  };
  constructor() {
    super();
    this.state = {
      initialRoute: "",
      loginInfo: "",
      firstUse: "",
      isLoading: false,
      isLoaded: false,
      visible:true,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }

  async componentWillMount() {
    var firstUse = await AsyncStorage.getItem(mConstants.FIRSTUSE);
    if (!firstUse) {
      // console.log(1);
      setTimeout(()=> {
        this.setState({
          firstUse: firstUse,
          isLoaded: true,
          initialRoute: "welcomeSrc",
          visible:false,
        });
      }, 1000);
    } else {
      // console.log(2);
      var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
      if (loginInfo) {
        // console.log(2.1);
        setTimeout(()=> {
          this.setState({
            isLoaded: true,
            initialRoute: "bookCar",
            visible:false
          });
        }, 1000);
      } else {
        // console.log(2.2);
        setTimeout(()=> {
          this.setState({
            initialRoute: "loginAcc",
            isLoaded: true,
            visible:false
          });
        }, 1000);
        // this.setState({ isLoaded: true });
      }
      // await this.setState({
      // });
      // this.setState({ isLoaded: true });
    }
  }
  render() {
    // var initialRoute = "";
    // if (!this.state.firstUse) {
    //   initialRoute = "welcomeSrc";
    // } else {
    //   initialRoute = this.state.loginInfo ? "bookCar" : "loginAcc";
    // }
    // console.log("initialRoute", initialRoute);
    if (!this.state.initialRoute) {
      console.log(123);
      return null;
    } else {
      console.log(321)
      return (
        <StyleProvider style={getTheme(variables)}>
          <Provider store={this.state.store}>
            <Root>
              <App initialRouteName={this.state.initialRoute} />
            </Root>
          </Provider>
        </StyleProvider>
      );
    }
  }
}
