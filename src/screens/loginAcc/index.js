// @flow
import React, { Component } from "react";
import {
  Image,
  Platform,
  StatusBar,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  BackHandler,
} from "react-native";
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
var mainScreen = true;
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";
// import {checkNumber} from "./actions"
import { checkNumber } from "../../actions";
import RNAccountKit from "react-native-facebook-account-kit";
import { login } from "../../actions";
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

  componentWillMount() {
    const navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", function() {
      if (mainScreen) {
      BackHandler.exitApp();
        return true;
      }
      navigation.navigate("bookCar");
      return false;
     });
  }
  componentWillReceiveProps(props) {
    const navigation = this.props.navigation;
    console.log("Items", props.items);
    if (props.items) {
      this.setState({ visible: false });
      press = true;
      isLoading = false;
      AsyncStorage.setItem(
        mConstants.LOGIN_INFO,
        JSON.stringify(props.items),
        () => {
          AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
            console.log("AsyncStorage_index_log", result);
          });
        }
      );
      setTimeout(() => {
        navigation.navigate("bookCar");
      }, 300);
    } else {
      // console.log("mang")
      this.setState({ visible: false });
      setTimeout(() => {
        this.fnAlert("Lỗi", "Đã xảy ra sự cố với kết nối mạng", [
          {
            text: "OK",
            onPress: () => {
              press = true;
            }
          }
        ]);
      }, 100);
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
        this.number(data);
        RNAccountKit.loginWithPhone(data).then(token => {
          if (!token) {
            check = true;
            press = true;
          } else {
            check = true;
            press = true;
            this.props.login(params);
          }
        });
      }
    }
  }

  onLogin(token) {
    this.accConfigure(this.state.phoneNumber);
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // console.log(this.state.phoneNumber.split("")[0])
                  this.number(this.state.phoneNumber);
                  // this.accConfigure(this.state.phoneNumber);
                  if (press) {
                    var data = this.state.phoneNumber;
                    var params = {};
                    press = false;
                    this.checkaNumber(data)
                    // this.props.login(params);
                    // RNAccountKit.loginWithPhone(data).then(token => {
                    //   if (!token) {
                    //     console.log("Cancel", token);
                    //   } else {
                    //     params.phonenumber = data;
                    //     check = true;
                    //     press = true;
                    //     this.props.login(params);
                    //   }
                    // });
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  Đăng nhập với số điện thoại của bạn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Spinner visible={this.state.visible} /> */}
        </Content>
      </Container>
    );
  }

  number(data) {
    if (data.split("")[0] == 0) {
      press = true;
      var numbers = data.slice(1, 20);
      this.accConfigure(numbers);
      console.log("adadada", numbers);
    } else {
      press = true;
      this.accConfigure(data);
    }
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
    checkNumber: params => dispatch(checkNumber(params)),
    login: params => dispatch(login(params))
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
