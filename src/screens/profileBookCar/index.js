// @flow
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  BackHandler
} from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  ListItem,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Header
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Grid, Col } from "react-native-easy-grid";
import { updateProfile } from "./actions";
import CustomHeader from "../../components/CustomHeader";
import * as mConstants from "../../utils/Constants";

import styles from "./styles";
// const settings = require("../../Icon/PNG/settings.png");
const back = require("../../Icon/PNG/Back.png");
const profile = require("../../Icon/PNG/profile.png");
const mail = require("../../Icon/PNG/Mail2.png");
const phone = require("../../Icon/PNG/Phone2.png");
// type Props = {
//   navigation: () => void
// };

import { NavigationActions } from "react-navigation";

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "bookCar" })]
});
var mainScreen = false;
class profileBookCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      userId: "",
      avartar: "http://www.novelupdates.com/img/noimagefound.jpg",
      disabled: false,
    };
  }

  componentWillUnMount() {
    console.log(222);
    const navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", function() {
      if (!mainScreen) {
        console.log(444);
        navigation.navigate("bookCar");
      } else {
        console.log(333);
        BackHandler.exitApp();
      }
    });
  }

  async componentDidMount() {
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var ObjloginInfo = JSON.parse(loginInfo);
    var avartar = "";
    var firstName = "";
    var userId = "";
    var lastName = "";
    var email = "";
    var userId = "";
    if (ObjloginInfo.img_url) {
      avartar = ObjloginInfo.img_url;
    } else {
      avartar = "http://www.novelupdates.com/img/noimagefound.jpg";
    }
    if (ObjloginInfo.first_name) {
      firstName = ObjloginInfo.first_name;
    } else {
      firstName = "";
    }
    if (ObjloginInfo.last_name) {
      lastName = ObjloginInfo.last_name;
    } else {
      lastName = "";
    }
    if (ObjloginInfo.email) {
      email = ObjloginInfo.email;
    } else {
      email = "";
    }
    if (ObjloginInfo.id) {
      userId = ObjloginInfo.id;
    } else {
      userId = "";
    }
    this.setState({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      avartar: avartar
    });
    // AsyncStorage.removeItem(mConstants.LOGIN_INFO);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 2 }}>
            <Button
              transparent
              disabled={this.state.disabled}
              onPress={() => {
                this.setState({ disabled: true });
                navigation.navigate("bookCar");
              }}
            >
              <Image
                source={back}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </Button>
          </Left>
          <Body style={{ flex: 6 }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
              Thông Tin Cá Nhân
            </Text>
          </Body>
          <Right style={{ flex: 2 }} />
        </Header>
        <Content style={{ backgroundColor: "#fff" }}>
          <View style={styles.viewContent}>
            <View style={styles.viewName}>
              <View style={styles.containerIcon}>
                <Image
                  source={profile}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.name}>
                <View
                  style={[styles.containerName, { borderBottomWidth: 0.5 }]}
                >
                  <Text style={styles.text}>
                    {this.state.firstName}
                  </Text>
                </View>
                <View style={styles.containerName}>
                  <Text style={styles.text}>
                    {this.state.lastName}
                  </Text>
                </View>
              </View>
              <View style={styles.containerIcon}>
                <TouchableOpacity onPress={() => this._changeAvartar()}>
                  <Thumbnail source={{ uri: this.state.avartar }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerImg}>
              <View style={styles.containerIcon}>
                <Image
                  source={phone}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.viewtextPhone}>
                <Text style={styles.text}>
                  {this.state.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={[styles.containerImg, { marginBottom: 10 }]}>
              <View style={styles.containerIcon}>
                <Image
                  source={mail}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.viewtextPhone}>
                <Text style={styles.text}>
                  {this.state.email}
                </Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  _changeAvartar() {
    console.log("press");
  }
}

function bindAction(dispatch) {
  return {
    updateProfile: params => dispatch(updateProfile(params))
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}
const mapStateToProps = state => ({
  items: state.profileReducer.items,
  error: state.profileReducer.error
});

const profileBookCar = reduxForm({
  form: "profilebookcar"
})(profileBookCarForm);
export default connect(mapStateToProps, bindAction)(profileBookCarForm);
