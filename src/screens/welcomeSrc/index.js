// @flow
import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StatusBar,
  View,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import { Field, reduxForm } from "redux-form";
const welcome2 = require("../../Icon/preview/Welcome2.png");
const welcome3 = require("../../Icon/preview/Welcome3.png");
const welcome1 = require("../../Icon/preview/Welcome1.png");
import styles from "./styles";
import * as mConstants from "../../utils/Constants";
var mainScreen = true;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class welcomeSrc extends Component {
  // componentDidMount() {
  //   AsyncStorage.setItem(
  //     mConstants.FIRSTUSE,
  //     JSON.stringify("firstUse"),
  //     () => {
  //       AsyncStorage.getItem(mConstants.FIRSTUSE, (err, result) => {
  //         console.log("AsyncStorage_index_welcome", result);
  //       });
  //     }
  //   );
  // }
  componentWillUnmount() {
    const navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", function() {
      if (mainScreen) {
        BackHandler.exitApp();
      } else {
      navigation.navigate("bookCar");
    }
    });
  }

  render() {
    console.log(deviceHeight);
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content style={{ backgroundColor: "white" }}>
          <View>
            <Carousel
              contentContainerStyle={{ backgroundColor: "white" }}
              width={deviceWidth}
              height={deviceHeight}
              loop={false}
              indicatorAtBottom
              indicatorOffset={65}
              indicatorSize={Platform.OS === "android" ? 10 : 10}
              indicatorColor="#FFFFFF"
              animate={true}
              delay={3000}
            >
              <View style={styles.slides}>
                <Image
                  source={welcome1}
                  resizeMode="contain"
                  style={{ width: deviceWidth }}
                />
              </View>
              <View style={styles.slides}>
                <Image
                  source={welcome2}
                  resizeMode="contain"
                  style={{ width: deviceWidth }}
                />
              </View>
              <View style={styles.slides}>
                <View
                  style={{
                    marginTop: -20,
                    width: deviceWidth,
                    height: deviceHeight - 40
                  }}
                >
                  <Image
                    source={welcome3}
                    style={{ width: deviceWidth, height: deviceHeight - 40 }}
                  />
                </View>
                <View>
                  <Button
                    onPress={() => this._continue()}
                    style={{
                      height: 60,
                      width: deviceWidth,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#31404B",
                      borderRadius:0
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
                      Tiếp Theo
                    </Text>
                  </Button>
                </View>
              </View>
            </Carousel>
          </View>
        </Content>
      </Container>
    );
  }
  async _continue() {
    const navigation = await this.props.navigation;
    await AsyncStorage.setItem(
      mConstants.FIRSTUSE,
      JSON.stringify("firstUse"),
      () => {
        AsyncStorage.getItem(mConstants.FIRSTUSE, (err, result) => {
          console.log("AsyncStorage_index_welcome", result);
        });
      }
    );
    navigation.navigate("loginAcc");
  }
}

export default welcomeSrc;
