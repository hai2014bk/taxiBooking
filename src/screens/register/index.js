// @flow
import React, { Component } from "react";
import { Image, StatusBar, AsyncStorage, Alert } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Left,
  Right,
  Footer,
  Label,
  Root
} from "native-base";
import { Field, reduxForm } from "redux-form";
import * as mConstants from '../../utils/Constants';
import Utils from '../../utils/validate';
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { register } from "../../actions";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

var pressable = true


class registerForm extends Component {
  textInput: any;

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      username: props.navigation.state.params.data,
      // username:"0988049828",
      password: "",
      first_name: "",
      email: "",
      last_name: "",
      address:"",
      visible: false
    };
  }
  fnAlert(title, content, button) {
    Alert.alert(title, content, button, { cancelable: false });
  }

  componentWillReceiveProps(props){
    console.log("props register", props)
    const navigation = this.props.navigation;
      if(props.items.id){
        console.log("vaaaaa")
        AsyncStorage.setItem(mConstants.LOGIN_INFO, JSON.stringify(props.items), () => {
          AsyncStorage.getItem(mConstants.LOGIN_INFO, (err, result) => {
            console.log("AsyncStorage_index_reg",result);
          });
        });
        this.setState({visible : false})
        setTimeout(() =>{
          this.fnAlert("Thông báo", "Đăng kí thành công!", [
            {
              text: "OK",
              onPress: () => {
                pressable = true;
                navigation.navigate("Home")
                // this.email._root.focus();
              }
            }
          ]);
        }, 100);
      }
        // Toast.show({
        //   text: "Đăng kí thành công!",
        //   duration: 2500,
        //   position: "top",
        //   textStyle: { textAlign: "center" }
        // });
        // setTimeout(() =>{
        //   navigation.navigate("Home")
        // }, 300);}
      if(props.error.status){
        this.setState({visible : false})
        setTimeout(()=> {
          this.fnAlert("Lỗi", "Tài khoản đã được sử dụng!", [
            {
              text: "OK",
              onPress: () => {
                pressable = true;
                // navigation.navigate("Home")
                // this.email._root.focus();
              }
            }
          ]);
        }, 100);
        // Toast.show({
        //   text: "Tài khoản đã được sử dụng!",
        //   duration: 2500,
        //   position: "top",
        //   textStyle: { textAlign: "center" }
        // });
    } else{
      this.setState({visible : false})
      setTimeout(() =>{
        this.fnAlert("Lỗi", "Gặp vấn đề với kết nối mạng!", [
          {
            text: "OK",
            onPress: () => {
              pressable = true;
              // navigation.navigate("Home")
              // this.email._root.focus();
            }
          }
        ]);
      }, 100);
    }
  }


  _register(){
    this.setState({visible : true})
    var params = {}
    if(this.state.username.length > 0){
      params.username = this.state.username
      if(this.state.password.length > 0){
        if (Utils.validatePasswordRegister(this.state.password)) {
          params.password = this.state.password
          if(this.state.last_name.length > 0){
            params.last_name = this.state.first_name
            if(this.state.first_name.length > 0){
              params.first_name = this.state.last_name
              if(this.state.email.length > 0){
                var nospace = this.state.email.replace(/^\s+|\s+$/g, "");
                setTimeout(() =>{
                  if (Utils.validateEmail(nospace)) {
                    if (Utils.validateUnicode(nospace)){
                      if (!Utils.detectEmoji(nospace)) {
                        params.email = nospace
                        if(this.state.address.length > 0){
                          params.address = this.state.address
                          setTimeout(()=> {
                            this.props.register(params);
                          }, 100);
                        }else{
                          this.setState({visible : false})
                          setTimeout(()=> {
                            this.fnAlert("Lỗi", "Địa chỉ không được bỏ trống", [
                              {
                                text: "OK",
                                onPress: () => {
                                  pressable = true;
                                  this.address._root.focus();
                                }
                              }
                            ]);
                          }, 100);
                        }
                      }else{
                        this.setState({visible : false})
                        setTimeout(()=> {
                          this.fnAlert("Lỗi", "Email không được chứa emoji", [
                            {
                              text: "OK",
                              onPress: () => {
                                pressable = true;
                                this.email._root.focus();
                              }
                            }
                          ]);
                        }, 100);
                      }
                    }else{ 
                      this.setState({visible : false})
                      setTimeout(() => {
                        this.fnAlert("Lỗi", "Email chỉ chứa kí tự tiếng anh", [
                          {
                            text: "OK",
                            onPress: () => {
                              pressable = true;
                              this.email._root.focus();
                            }
                          }
                        ]);
                      }, 100);
                    }
                  }else { 
                    // Toast.show({
                    //   text: "Email không đúng định dạng!",
                    //   position: 'bottom',
                    //   buttonText: 'Okay',
                    //   type: "danger",
                    // })
                    this.setState({visible : false})
                    setTimeout(()=> {
                      this.fnAlert("Lỗi", "Email không đúng định dạng", [
                        {
                          text: "OK",
                          onPress: () => {
                            pressable = true;
                            this.email._root.focus();
                          }
                        }
                      ]);
                    }, 100);
                  }
                }, 200)
              }else{
                // Toast.show({
                //   text: "Email không được bỏ trống!",
                //   position: 'bottom',
                //   buttonText: 'Okay',
                //   type: "danger",
                // })
                this.setState({visible : false})
                setTimeout(() => {
                  this.fnAlert("Lỗi", "Email không được bỏ trống", [
                    {
                      text: "OK",
                      onPress: () => {
                        pressable = true;
                        this.email._root.focus();
                      }
                    }
                  ]);
                }, 100);
              }
            }else{
              this.setState({visible : false})
              setTimeout(()=> {
                this.fnAlert("Lỗi", "Họ không được bỏ trống", [
                  {
                    text: "OK",
                    onPress: () => {
                      pressable = true;
                      this.first_name._root.focus();
                    }
                  }
                ]);
              }, 100);
            }
          }else{
            this.setState({visible : false})
            setTimeout(()=> {
              this.fnAlert("Lỗi", "Tên không được bỏ trống", [
                {
                  text: "OK",
                  onPress: () => {
                    pressable = true;
                    this.last_name._root.focus();
                  }
                }
              ]);
            }, 100);
          }
          return;
        } else{
          this.setState({visible : false})
          setTimeout(()=> {
            this.fnAlert("Lỗi", "Mật khẩu Phải lớn hơn 8 kí tự", [
              {
                text: "OK",
                onPress: () => {
                  pressable = true;
                  this.password._root.focus();
                }
              }
            ]);
          }, 100);
        }
      }else{
        this.setState({visible : false})
        setTimeout(()=> {
        this.fnAlert("Lỗi", "Mật khẩu không được bỏ trống", [
          {
            text: "OK",
            onPress: () => {
              pressable = true;
              this.password._root.focus();
            }
          }
        ]);
      }, 100);
        // Toast.show({
        //   text: "Đăng kí thành công!",
        //   duration: 2500,
        //   position: "bottom",
        //   textStyle: { textAlign: "center" }
        // });
      }
    }else{
      this.setState({visible : false})
      setTimeout(()=> {
        this.fnAlert("Lỗi", "Số điện thoại không được bỏ trống", [
          {
            text: "OK",
            onPress: () => {
              pressable = true;
              this.username._root.focus();
            }
          }
        ]);
      }, 100);
    }
  }

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        {/* <Image
          source={require("../../../assets/bg-signup.png")}
          style={styles.background}
        > */}
          <Content style={{backgroundColor:"white"}}>
            <Text style={styles.signupHeader}>TẠO TÀI KHOẢN</Text>
            <View style={styles.signupContainer}>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Số Điện Thoại</Label>
            <Input
              {...this.props}
              ref={ref => {
                this.username = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "phone-pad"
              secureTextEntry = {false}
              editable = {false}
              value = {this.state.username}
              onChangeText={username => this.setState({ username: username })} 
            />
            </Item>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Mật Khẩu</Label>
            <Input
            {...this.props}
              ref={ref => {
                this.password = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "default"
              secureTextEntry = {true}
              onChangeText={password => this.setState({ password: password })} 
            />
            </Item>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Tên</Label>
            <Input
            {...this.props}
              ref={ref => {
                this.last_name = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "default"
              secureTextEntry = {false}
              onChangeText={last_name => this.setState({ last_name: last_name })} 
            />
            </Item>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Họ</Label>
            <Input
            {...this.props}
              ref={ref => {
                this.first_name = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "default"
              secureTextEntry = {false}
              onChangeText={first_name => this.setState({ first_name: first_name })} 
            />
            </Item>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Email</Label>
            <Input
            {...this.props}
              ref={ref => {
                this.email = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "email-address"
              secureTextEntry = {false}
              onChangeText={email => this.setState({ email: email })} 
            />
            </Item>

            <Item stackedLabel style={{width:"100%", marginTop:10}}>
            <Label>Địa Chỉ</Label>
            <Input
            {...this.props}
              ref={ref => {
                this.address = ref;
              }}
              style={styles.input}
              placeholderTextColor="#848484"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType = "default"
              secureTextEntry = {false}
              onChangeText={address => this.setState({ address: address })} 
            />
            </Item>
              
              <Button
                rounded
                bordered
                block
                onPress={() => {
                  if(pressable){
                    pressable = false
                    this._register()
                    {/* setTimeout(() =>{
                      pressable = true
                    }, 1500); */}
                  }
                  }
                }
                style={styles.signupBtn}
              >
                <Text style={{ color: "#FFF" }}>Tiếp Tục</Text>
              </Button>
            </View>
            <Spinner visible={this.state.visible} />
          </Content>
        {/* </Image> */}
      </Container>
    );
  }
}function bindAction(dispatch) {
  return {
    register: params => dispatch(register(params)),
    // fetchData: url => dispatch(itemsFetchData(url))

  };
}
const mapStateToProps = state => ({
  items: state.registerReducer.items,
  error: state.registerReducer.error,
  // isLoading: state.homeReducer.isLoading
});

const Register = reduxForm({
  form: "register"
})(registerForm);
export default connect(mapStateToProps, bindAction)(registerForm);
// export default Register;
