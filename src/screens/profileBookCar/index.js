// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, AsyncStorage } from "react-native";

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

class profileBookCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      userId: "",
      avartar: ""
    };
  }

  async componentDidMount() {
    var avartar = "";
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var ObjloginInfo = JSON.parse(loginInfo);
    if (ObjloginInfo.img_url) {
      avartar = ObjloginInfo.img_url;
    } else { avartar = "http://www.novelupdates.com/img/noimagefound.jpg" }
    this.setState({
      userId: ObjloginInfo.id,
      firstName: ObjloginInfo.first_name,
      lastName : ObjloginInfo.last_name,
      email : ObjloginInfo.email,
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
            <Button transparent onPress={() => navigation.navigate("bookCar")}>
              <Image source={back} style={{width:30,height:30}} resizeMode="contain" />
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
                <Image source={profile} style={{width:30,height:30}} resizeMode="contain" />
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
                <Image source={phone} style={{width:30,height:30}} resizeMode="contain" />
              </View>
              <View style={styles.viewtextPhone}>
                <Text style={styles.text}>
                  {this.state.phoneNumber}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.containerImg,
                { marginBottom: 10, borderBottomWidth: 0.5 }
              ]}
            >
              <View style={styles.containerIcon}>
                <Image source={mail} style={{width:30,height:30}} resizeMode="contain" />
              </View>
              <View style={styles.viewtextPhone}>
                <Text style={styles.text}>
                  {this.state.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerUserId}>
            <View style={styles.userId}>
              <Text style={styles.text}> User ID </Text>
            </View>
            <View style={styles.Id}>
              <Text note style={{ marginRight: 15 }}>
                {this.state.userId}
              </Text>
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
