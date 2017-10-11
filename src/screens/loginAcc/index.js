// @flow
import React, { Component } from "react";
import { Image, Platform, StatusBar, AsyncStorage, Alert } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast,
  Form,
  Label
} from "native-base";
import { Field, reduxForm } from "redux-form";
import * as mConstants from "../../utils/Constants";
import { connect } from "react-redux";
import { touchAble } from "../touchAble";
import Utils from "../../utils/validate";
import AccountKit, {
  LoginButton,
  Color,
  StatusBarStyle
} from "react-native-facebook-account-kit";

import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";
// import {checkNumber} from "./actions"
import { checkNumber } from "../../actions";
import RNAccountKit from "react-native-facebook-account-kit";
// import commonColor from "../../theme/variables/commonColor";

// const bg = require("../../../assets/bg.png");
// const logo = require("../../../assets/logo.png");
var check = true;
var press = true;
var isLoading = false;
declare type Any = any;
class loginAccForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      visible: false
    };
  }
  textInput: Any;

  componentWillReceiveProps(props) {
    var data = this.state.phoneNumber;
    const navigation = this.props.navigation;
    if (props.items.id) {
      this.setState({
        visible: false
      });
      press = true;
      navigation.navigate("LoginSrc", { data: data });
    } else {
      if (props.error.status) {
        this.setState({
          visible: false
        });
        press = true;
        this.accConfigure(data);
        RNAccountKit.loginWithPhone(data).then(token => {
          if (!token) {
            check = true;
            press = true;
            console.log("Login cancelled", props);
          } else {
            check = true;
            press = true;
            navigation.navigate("Register", { data: data });
          }
        });
      } else {
        this.setState({
          visible: false
        });
        press = true;
        setTimeout(() => {
          alert("Đã xảy ra sự cố với kết nối mạng");
        }, 100);
      }
    }
  }
  showAlert(title, content, button) {
    Alert.alert(title, content, button, { cancelable: false });
  }

  checkaNumber(data) {
    this.setState({
      visible: true
    });
    var params = {};
    const navigation = this.props.navigation;
    if (!data) {
      this.setState({
        visible: false
      });
      setTimeout(() => {
        this.showAlert("Chú ý", "Số điện thoại không được bỏ trống", [
          {
            text: "OK",
            onPress: () => {
              this.phoneNumber._root.focus();
              this.phoneNumber._root.setNativeProps({ text: "" });
              press = true;
            }
          }
        ]);
      }, 100);
    } else {
      if (Utils.checkSpaceAll(data)) {
        this.setState({
          visible: false
        });
        setTimeout(() => {
          this.showAlert("Chú ý", "Số điện thoại không được bỏ trống", [
            {
              text: "OK",
              onPress: () => {
                this.phoneNumber._root.focus();
                this.phoneNumber._root.setNativeProps({ text: "" });
                press = true;
              }
            }
          ]);
        }, 100);
      } else {
        params.phonenumber = data;
        this.props.checkNumber(params);
      }
    }
  }

  onLogin(token) {
    if (!token) {
      console.warn("User canceled login");
      this.setState({});
    } else {
      AccountKit.getCurrentAccount().then(account => {
        this.setState({
          authToken: token,
          loggedAccount: account
        });
      });
    }
  }

  onLoginError(e) {
    console.log("Failed to login", e);
  }

  onLogoutPressed() {
    AccountKit.logout()
      .then(() => {
        this.setState({
          authToken: null,
          loggedAccount: null
        });
      })
      .catch(e => console.log("Failed to logout"));
  }

  renderLogin() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.form}>
              {/* <Text note style={{marginTop:"60%", fontSize:18}}>Đăng kí với số điện thoại di động của bạn</Text> */}
              <Item style={{ width: "100%", marginTop: "60%" }}>
                {/* <Label>Nhập số điện thoại của bạn</Label> */}
                <Input
                  {...this.props}
                  ref={ref => {
                    this.phoneNumber = ref;
                  }}
                  style={styles.input}
                  placeholder="Nhập số điện thoại của bạn"
                  placeholderTextColor="#848484"
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  keyboardType="phone-pad"
                  onChangeText={phoneNumber =>
                    this.setState({ phoneNumber: phoneNumber })}
                />
              </Item>
              <Button
                style={styles.button}
                onPress={() => {
                  if (press) {
                    press = false;
                    this.checkaNumber(this.state.phoneNumber);
                  }
                }}
              >
                <Text style={styles.buttonText}>Tiếp theo</Text>
              </Button>
            </View>
          </View>
          <Spinner visible={this.state.visible} />
        </Content>
      </Container>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLogin()}
      </View>
    );
  }

  accConfigure(data) {
    RNAccountKit.configure({
      responseType: "token",
      initialEmail: "some.initial@email.com",
      initialPhoneCountryPrefix: "+84",
      initialPhoneNumber: data,
      defaultCountry: "VI"
    });
  }
}
function bindAction(dispatch) {
  return {
    checkNumber: params => dispatch(checkNumber(params))
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}
const loginAcc = reduxForm({
  form: "loginacc"
})(loginAccForm);
const mapStateToProps = state => ({
  items: state.loginAccReducer.items,
  error: state.loginAccReducer.error
  // isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(loginAccForm);

// const loginAcc = reduxForm({
//   form: "loginacc"
// })(loginAccForm);
// export default loginAcc;
