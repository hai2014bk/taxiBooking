// @flow
import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StatusBar,
  View,
  Image,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import { Field, reduxForm } from "redux-form";
const welcome2 = require("../../Icon/preview/Welcome2.png");
const welcome3 = require("../../Icon/preview/Welcome3.png");
const welcome1 = require("../../Icon/preview/Welcome1.png");
import styles from "./styles";
import * as mConstants from "../../utils/Constants";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class welcomeSrc extends Component {
  componentDidMount() {
    AsyncStorage.setItem(
      mConstants.FIRSTUSE,
      JSON.stringify("firstUse"),
      () => {
        AsyncStorage.getItem(mConstants.FIRSTUSE, (err, result) => {
          console.log("AsyncStorage_index_welcome", result);
        });
      }
    );
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
              indicatorOffset={deviceHeight / 15}
              indicatorSize={Platform.OS === "android" ? 15 : 10}
              indicatorColor="#FFFFFF"
              animate={false}
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
                    source={welcome1}
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
                      backgroundColor: "#31404B"
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
  _continue() {
    const navigation = this.props.navigation;
    navigation.navigate("loginAcc");
  }
}

export default welcomeSrc;
