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
  Label
} from "native-base";
import { Field, reduxForm } from "redux-form";
import * as mConstants from "../../utils/Constants";

import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";
import { login } from "../../actions";
var isLoading = false;
var press = true;
const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

// const required = value => (value ? undefined : "Required");
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;
// const maxLength15 = maxLength(15);
// const minLength = min => value =>
//   value && value.length < min ? `Must be ${min} characters or more` : undefined;
// const minLength8 = minLength(8);
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Invalid email address"
//     : undefined;
// const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? "Only alphanumeric characters"
//     : undefined;
// var isLoading = false;
declare type Any = any;

class LoginSrcForm extends Component {
  // phoneNumber = this.props.navigation.params.data;
  textInput: Any;
  constructor(props) {
    // console.log("123456778",props)
    super(props);
    this.state = {
      showAlert: false,
      password: "",
      phoneNumber: props.navigation.state.params.data,
      // phoneNumber:"0975804801",
      visible: false
    };
  }

  fnAlert(title, content, button) {
    Alert.alert(title, content, button, { cancelable: false });
  }

  componentWillReceiveProps(props) {
    const navigation = this.props.navigation;
    console.log("ddddddnjbjkjk", this.props);
    if (props.items.id) {
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
        navigation.navigate("Drawer");
      }, 300);
    } else {
      if (props.error.status == 401) {
        setTimeout(() => {
          this.fnAlert("Lỗi", "Sai số điện thoại hoặc mật khẩu", [
            {
              text: "OK",
              onPress: () => {
                press = true;
                this.password._root.focus();
              }
            }
          ]);
        }, 100);
        this.setState({ visible: false });
        press = true;
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
  }

  showAlert(title, content, button) {
    Alert.alert(title, content, button, { cancelable: false });
  }

  _loginBtn() {
    this.setState({ visible: true });
    // isLoading=true
    var params = {};
    // this.setState({visible:true})
    if (this.state.phoneNumber.length > 0) {
      params.phonenumber = this.state.phoneNumber;
      if (this.state.passWord) {
        params.password = this.state.passWord;
        setTimeout(() => {
          this.props.login(params);
          console.log("_loginBtn", params);
        }, 100);
      } else {
        this.setState({ visible: false });
        setTimeout(() => {
          this.showAlert("Chú ý", "Mật khẩu không được bỏ trống", [
            {
              text: "OK",
              onPress: () => {
                this.password._root.focus();
                press = true;
              }
            }
          ]);
        }, 100);
      }
    } else {
      this.setState({ visible: false });
      press = true;
      setTimeout(() => {
        alert("Số điện thoại không được bỏ trống");
      }, 100);
    }
  }
  render() {
    const { state } = this.props.navigation;
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        {/* <Image source={bg} style={styles.background}> */}
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.container}>
            <View style={styles.form}>
              <Item style={{ width: "100%", marginTop: 10 }}>
                {/* <Label>Số điện thoại</Label> */}
                <Input
                  style={styles.input}
                  placeholderTextColor="#848484"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  value={this.state.phoneNumber}
                  editable={false}
                  multiline={false}
                  onChangeText={phonenumber =>
                    this.setState({ phoneNumber: phonenumber })}
                />
              </Item>
              <Item style={{ width: "100%", marginTop: 10 }}>
                {/* <Label>Mật khẩu</Label> */}
                <Input
                  {...this.props}
                  ref={ref => {
                    this.password = ref;
                  }}
                  placeholder="Mật khẩu"
                  style={styles.input}
                  placeholderTextColor="#848484"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={passWord =>
                    this.setState({ passWord: passWord })}
                />
              </Item>
              <Button
                block
                full
                large
                style={styles.loginBtn}
                onPress={() => {
                  if (press) {
                    press = false;
                    this._loginBtn();
                  }
                }}
              >
                <Text
                  style={
                    Platform.OS === "android"
                      ? { fontSize: 16, textAlign: "center", top: -5 }
                      : { fontSize: 16, fontWeight: "900" }
                  }
                >
                  Đăng Nhập
                </Text>
              </Button>
              <View style={styles.otherLinksContainer} />
            </View>
          </View>
          <Spinner visible={this.state.visible} />
          {/* <View style={{flex: 1}}>
              <Spinner visible={this.state.visible} />
            </View> */}
        </Content>
        {/* </Image> */}
      </Container>
    );
    // }
  }
}
const LoginSrc = reduxForm({
  form: "loginsrc"
})(LoginSrcForm);

function bindAction(dispatch) {
  return {
    login: params => dispatch(login(params))
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}
const mapStateToProps = state => ({
  items: state.loginSrcReducer.items,
  error: state.loginSrcReducer.error
  // isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(LoginSrcForm);
// export default LoginSrc;
