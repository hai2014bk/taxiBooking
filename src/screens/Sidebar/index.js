// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, AsyncStorage } from "react-native";

import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
const profile = require("../../Icon/PNG/profile.png");
import * as mConstants from "../../utils/Constants";
import styles from "./style";
import { openSidebar, closeSidebar, reloadSidebar } from "./actions";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "loginAcc" })]
});
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      userId: "",
      avartar: "http://www.novelupdates.com/img/noimagefound.jpg",
    };
  }

  async componentDidMount() {
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var avartar = "";
    var firstName = "";
    var userId = "";
    var lastName = "";
    var email = "";
    var userId = "";
    var ObjloginInfo = JSON.parse(loginInfo);
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

  // async componentDidMount() {
  //   var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
  //   var ObjloginInfo = JSON.parse(loginInfo);
  //   if (ObjloginInfo.img_url) {
  //     avartar = ObjloginInfo.img_url;
  //   } else {
  //     avartar = "http://www.novelupdates.com/img/noimagefound.jpg";
  //   }
  //   this.setState({
  //     userId: ObjloginInfo.id,
  //     firstName: ObjloginInfo.first_name,
  //     lastName: ObjloginInfo.last_name,
  //     email: ObjloginInfo.email,
  //     avartar: avartar
  //   });
    // AsyncStorage.removeItem(mConstants.LOGIN_INFO);
  // }
  async componentWillReceiveProps(props) {
    // console.log("props", props.navigation);
    // console.log("props", props.kind);
    if (props.kind === "close") {
      var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
      var ObjloginInfo = JSON.parse(loginInfo);
      if (ObjloginInfo.img_url) {
        avartar = ObjloginInfo.img_url;
      } else {
        avartar = "http://www.novelupdates.com/img/noimagefound.jpg";
      }
      this.setState({
        userId: ObjloginInfo.id,
        firstName: ObjloginInfo.first_name,
        lastName: ObjloginInfo.last_name,
        email: ObjloginInfo.email,
        avartar: avartar
      });
    }
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Image
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <Col>
            <View>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                  navigation.navigate("profileBookCar");
                }}
              >
                <Image
                  source={{ uri: this.state.avartar }}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
              </View>
            </Col>
            <Text
              note
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 17,
                marginTop: 10,
                marginBottom: 10
              }}
            >
              {this.state.firstName}
            </Text>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("profileBookCar");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="md-person" />
              {/* <Image source={profile}/> */}
              <Text style={styles.linkText}>Thông tin cá nhân</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("history");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-timer-outline" />
              <Text style={styles.linkText}>Lịch sử đặt xe</Text>
            </ListItem>
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this._logout();
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon name="ios-log-out-outline" />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                        marginLeft: 10
                      }}
                    >
                      Đăng xuất
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </Image>
      </Container>
    );
  }

  async _logout() {
    await this.props.navigation.dispatch(resetAction);
    let keys = [mConstants.LOGIN_INFO, mConstants.REMEMBER];
    await AsyncStorage.multiRemove(keys);
    this.props.navigation.navigate("loginAcc");
  }
}

function bindAction(dispatch) {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    reloadSidebar: () => dispatch(reloadSidebar()),
    openSidebar: () => dispatch(openSidebar())
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}
const mapStateToProps = state => ({
  // navigation: state.cardNavigation,
  // Sidebar : state.Sidebar
  kind: state.sidebarReducer.kind
});

const sidebar = reduxForm({
  form: "sidebar"
})(SideBar);
export default connect(mapStateToProps, bindAction)(SideBar);

// export default SideBar;
