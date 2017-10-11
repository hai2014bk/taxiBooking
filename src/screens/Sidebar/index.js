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
import { Grid, Col, Row } from "react-native-easy-grid";
const profile = require("../../Icon/PNG/profile.png");
import * as mConstants from "../../utils/Constants";
import styles from "./style";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
class SideBar extends Component {
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
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                  navigation.navigate("profileBookCar");
                }}
              >
                <Thumbnail
                  source={require("../../../assets/Contacts/sanket.png")}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
            </Col>
            <Text
              note
              style={{ color: "#fff", alignSelf: "center", fontSize: 17 }}
            >
              Kumar Sanket
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
                      navigation.dispatch(resetAction);
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      flexDirection:"row",
                      alignItems:"center",
                      justifyContent:"center"
                    }}
                  >
                  <Icon name="ios-log-out-outline" />
                    <Text style={{ fontWeight: "bold", color: "#fff", marginLeft:10 }}>
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

  async _logout(){
      let keys = [mConstants.LOGIN_INFO,mConstants.REMEMBER];
      await AsyncStorage.multiRemove(keys);
      this.props.navigation.navigate("loginAcc");
  }
}

export default SideBar;
