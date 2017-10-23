


import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  StyleProvider,
  Container,
  Header,
  Content,View,
  Text
} from "native-base";
import { AsyncStorage, Image } from "react-native";
import * as mConstants from "../utils/Constants";
import { Root } from "native-base";

const logo = require("../Icon/Logo.jpg");
import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

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
      setTimeout(()=> {
        this.setState({
          firstUse: firstUse,
          isLoaded: true,
          initialRoute: "welcomeSrc",
          visible:false,
        });
      }, 1000);
    } else {
      var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
      if (loginInfo) {
        setTimeout(()=> {
          this.setState({
            isLoaded: true,
            initialRoute: "Drawer",
            visible:false
          });
        }, 1000);
      } else {
        setTimeout(()=> {
          this.setState({
            initialRoute: "loginAcc",
            isLoaded: true,
            visible:false
          });
        }, 1000);
      }
    }
  }
  render() {
    if (!this.state.initialRoute) {
      return (
        <Container>
          <Content style={{ backgroundColor: "#ffffff" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginTop: 100
              }}
            >
              <Image
                source={logo}
                style={{ width: 350, height: 350 }}
                resizeMode="contain"
              />
            </View>
          </Content>
        </Container>
      );
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

