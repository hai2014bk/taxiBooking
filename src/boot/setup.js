import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import { AsyncStorage } from "react-native";
import * as mConstants from '../utils/Constants';
import { Root } from "native-base";
// import Expo from "expo";


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

export default class Setup extends Component {
  state: {
    store: Object,
    isLoading: boolean
  };
  constructor() {
    super();
    this.state = {
       loginInfo:'',
      isLoading: false,
      isLoaded:false,
      store: configureStore(() => this.setState({ isLoading: false }))

    };
  }
async componentWillMount(){
  var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO)
  if (loginInfo){
    this.setState({loginInfo:loginInfo,isLoaded:true})
    } else {
    this.setState({isLoaded:true})
    }
  }
  
  render() {
    // console.log(this.state.loginInfo)
      var initialRoute = this.state.loginInfo ? "Home":"loginAcc"
      console.log("initialRoute",initialRoute)
      if (!this.state.isLoaded) {
        return null
      }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <Root>
          <App  initialRouteName={initialRoute}/>
          </Root>
        </Provider>
      </StyleProvider>
    );
  }
}
