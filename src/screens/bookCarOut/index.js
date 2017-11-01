// @flow
import React, { Component } from "react";
import {
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView,
  AsyncStorage,
  Modal,
  Alert,
  BackHandler,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Item,
  Label,
  Input,
  Switch,
  List
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import { carbookingout, getcartype, distance } from "../../actions";
import * as mConstants from "../../utils/Constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import LocationPicker from "../LocationPicker";
import PopupDialog from "react-native-popup-dialog";
const setting = require("../../Icon/PNG/settings.png");
const car4Y = require("../../Icon/PNG/Car/cho4Atv.png");
const car7Y = require("../../Icon/PNG/Car/cho7Atv.png");
const car16Y = require("../../Icon/PNG/Car/cho16Atv.png");
const car4W = require("../../Icon/PNG/Car/cho4Dis.png");
const car7W = require("../../Icon/PNG/Car/cho7Dis.png");
const car16W = require("../../Icon/PNG/Car/cho16Dis.png");
const icon = require("./icon.jpg");
const successDialog = require("../../Icon/successDialog.png");
import styles from "./styles";
import { NavigationActions } from "react-navigation";
var dismissKeyboard = require("dismissKeyboard");
const deviceWidth = Dimensions.get("window").width;
// const headerLogo = require("../../../assets/header-logo.png");
const noiBaiLat = 21.2187149;
const noiBaiLng = 105.8041709;
const lat = 21.218714;
const lng = 105.80417;
var mainScreen = true;
var name = "Sân bay Nội Bài";
// var timeH = new Date().getHours();
// var timeMi = new Date().getMinutes();
// var timeY = new Date().getFullYear();
// var timeMo = new Date().getMonth();
// var timeD = new Date().getDate();
var press = true;
// var sidebar = true;
var dialog = false;
class bookCarOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab1: "#31404B",
      selectedTab2: "#f4f2f2",
      phoneNumber: "",
      textColor1: "white",
      textColor2: "gray",
      car4: car4Y,
      car7: car7W,
      car16: car16W,
      start: name,
      stop: "Chọn điểm đến",
      close: false,
      open: false,
      startLat: lat,
      startLng: lng,
      stopLat: "",
      stopLng: "",
      disabledstart: true,
      disabledstop: false,
      openTimePicker: false,
      roundTrip: false,
      price: 0,
      dateStringshow: "Bây giờ",
      night: true,
      userId: "",
      car_type_id: 7,
      dateString: "",
      note: "",
      timeH: new Date().getHours(),
      distance: 0,
      duration: 0,
      visible: false,
      router: "hn",
      hanoi: "",
      sidebar: false,
      priceshow: 0,
      dataArray: [],
      dialogShow: false,
      supPhone: "tel: 18001182",
      locate: ""
    };
  }
  async componentDidMount() {
    // this.props.distance(21.218714,105.80417,21.228714,105.81417);
    this.popupDialog.dismiss();
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var ObjloginInfo = JSON.parse(loginInfo);
    var userId = ObjloginInfo.id;
    this.setState({
      userId: userId
    });
    // this.props.getcartype();
  }
  priceOutHanoi(timeH, cartype, roundTrip, val) {
    this.setState({ distance: val });
    // console.log(timeH, cartype, roundTrip, val);
    if (cartype === 7) {
      if (this._checkNightTime(timeH)) {
        if (roundTrip) {
          this.priceHandle((val / 1000 * 17000 + 100000) * 2);
        } else {
          this.priceHandle(val / 1000 * 17000 + 100000);
        }
      } else {
        if (roundTrip) {
          this.priceHandle(val / 1000 * 17000 * 2);
        } else {
          this.priceHandle(val / 1000 * 17000);
        }
      }
    }

    if (cartype === 8) {
      if (this._checkNightTime(timeH)) {
        if (roundTrip) {
          this.priceHandle((val / 1000 * 18000 + 100000) * 2);
        } else {
          this.priceHandle(val / 1000 * 18000 + 100000);
        }
      } else {
        if (roundTrip) {
          this.priceHandle(val / 1000 * 18000 * 2);
        } else {
          this.priceHandle(val / 1000 * 18000);
        }
      }
    }
    if (cartype === 9) {
      if (this._checkNightTime(timeH)) {
        if (roundTrip) {
          this.priceHandle((val / 1000 * 22000 + 100000) * 2);
        } else {
          this.priceHandle(val / 1000 * 22000 + 100000);
        }
      } else {
        if (roundTrip) {
          this.priceHandle(val / 1000 * 22000 * 2);
        } else {
          this.priceHandle(val / 1000 * 22000);
        }
      }
    }
    // if (roundTrip) {
    //   this.priceHandle(val / 1000 * 15000 * 2);
    // } else {
    //   this.setState({
    //     visible: false,
    //     distance: val
    //   });
    //   this.priceHandle(val / 1000 * 15000);
    // }
  }
  componentWillReceiveProps(props) {
    //   if(props.cartypes){
    //   if (props.cartypes[0]) {
    //     this.setState({ dataArray: props.cartypes });
    //     console.log("items", props.items);
    //   } else {
    //     console.log("nodata");
    //   }
    // }
    if (props.Successdistance) {
      this.priceOutHanoi(
        this.state.timeH,
        this.state.car_type_id,
        this.state.roundTrip,
        props.Successdistance.routes[0].legs[0].distance.value
      );
      // console.log(
      //   "props.Successdistance",
      //   props.Successdistance.routes[0].legs[0].distance.value
      // );
      // console.log("props.Successdistance", props.Successdistance.routes[0]);
    } else {
      this.setState({
        visible: false
      });
      if (props.Errordistance) {
        setTimeout(() => {
          // alert("asdasdasdasd")
          this.showAlert(
            "Lỗi",
            "Đã xảy ra lỗi khi xác định khoảng cách tới địa điểm bạn chọn, vui lòng thử lại sau",
            [
              {
                text: "OK",
                onPress: () => {
                  press = true;
                }
              }
            ]
          );
        }, 100);
        // console.log("props.Errordistance",props.Errordistance);
      }
    }

    console.log("props", props);
    if (dialog) {
      if (props.items.id) {
        this.setState({ visible: false });
        setTimeout(() => {
          this.popupDialog.show();
          press = true;
          dialog = false;
        }, 100);
      } else {
        if (props.error) {
          if (props.error.message === "Network request failed") {
            dialog = false;
            this.setState({ visible: false });
            setTimeout(() => {
              this.showAlert(
                "Thất bại",
                "Đặt xe thất bại\nKết nối mạng không ổn định, vui lòng thử lại sau",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      press = true;
                    }
                  }
                ]
              );
            }, 100);
          } else {
            dialog = false;
            this.setState({ visible: false });
            setTimeout(() => {
              this.showAlert("Thất bại", "Đặt xe thất bại", [
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
    }
    console.log("123", props);
  }

  componentWillUnMount() {
    console.log(222);
    const navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", function() {
      if (!mainScreen) {
        console.log(444);
        navigation.navigate("Drawer");
      } else {
        console.log(333);
        BackHandler.exitApp();
      }
    });
  }
  render() {
    // console.log("render",
    // this.state);
    // console.log(this.state.dateString, timeH);
    var date = new Date();
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Button
              disabled={this.state.sidebar}
              transparent
              onPress={() => {
                dismissKeyboard();
                this.props.navigation.navigate("DrawerOpen");
              }}
            >
              <Image
                source={setting}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </Button>
          </Left>
          <Body>
            <Text
              numberOfLines={2}
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              ĐẶT XE NGOẠI TỈNH
            </Text>
          </Body>
          <Right>
            <Button
              style={{
                backgroundColor: "orange",
                height: 30,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => Linking.openURL(this.state.supPhone)}
            >
              <Icon name={"ios-call"} />
              <Text style={{ fontSize: 12, paddingRight: 10 }}>1800-1182</Text>
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#ffffff" }}
        >
          <View
            style={{
              height: 100,
              borderBottomWidth: 0.5,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text style={[styles.text, { color: "#31404B", fontSize: 15 }]}>
              Chọn tuyến
            </Text>
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                flexDirection: "row",
                marginTop: 5,
                width: "100%" - 20
              }}
            >
              <Button
                style={[
                  styles.chooseBtn,
                  { backgroundColor: this.state.selectedTab1 }
                ]}
                onPress={() => this._routerSelect(true)}
              >
                <Text
                  numberOfLines={1}
                  style={{ color: this.state.textColor1, fontSize: 12 }}
                >
                  Nội Bài -> Hà Nội
                </Text>
              </Button>
              <Button
                style={[
                  styles.chooseBtn,
                  { backgroundColor: this.state.selectedTab2 }
                ]}
                onPress={() => this._routerSelect(false)}
              >
                <Text
                  numberOfLines={1}
                  style={{ color: this.state.textColor2, fontSize: 12 }}
                >
                  Hà Nội -> Nội Bài
                </Text>
              </Button>
            </View>
          </View>
          <View
            style={{
              height: 140,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            {this._pickLocation()}
          </View>
          <View
            style={{
              flex: 1,
              height: 110,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            <Text
              note
              style={[styles.text, { color: "#31404B", fontSize: 15 }]}
            >
              Loại Xe
            </Text>
            {this._cartype()}
          </View>
          <View
            style={{
              height: 40,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            {this._timePicker()}
          </View>
          <View
            style={{
              height: 40,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            {this._roundTrip()}
          </View>
          <View
            style={{
              height: 70,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            {this._note()}
          </View>
          <View
            style={{
              height: 72,
              flexDirection: "column",
              borderBottomWidth: 0.5
            }}
          >
            {this._price()}
          </View>

          <View>
            <Modal
              visible={this.state.close}
              onRequestClose={() => this.setState({ close: false })}
              animationType="slide"
              transparent={false}
              style={{ marginTop: 42, backgroundColor: "red" }}
            >
              {this._placePicker(
                "Chọn điểm xuất phát",
                "Chọn điểm xuất phát",
                true
              )}
            </Modal>
            <Modal
              visible={this.state.open}
              onRequestClose={() => this.setState({ open: false })}
              animationType="slide"
              transparent={false}
              style={{ marginTop: 42, backgroundColor: "red" }}
            >
              {this._placePicker("Chọn điểm đến", "Chọn điểm đến", false)}
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <DateTimePicker
              mode="datetime"
              minimumDate={date}
              isVisible={this.state.openTimePicker}
              onConfirm={date => this.handleDatePicked(date, this.state.hanoi)}
              onCancel={() => this.hideTimePicker()}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Button
              full
              style={{ backgroundColor: "#2E3B45" }}
              onPress={() => {
                // this.popupDialog.show();
                if (press) {
                  press = false;
                  this._alertBook();
                }
              }}
            >
              <Text>Đặt ngay</Text>
            </Button>
          </View>
          <PopupDialog
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
            dismissOnTouchOutside={false}
            height={315}
            width={deviceWidth - 15}
            show={false}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={successDialog}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
              <Text style={{ color: "#31404B", fontWeight: "bold" }}>
                ĐẶT XE THÀNH CÔNG
              </Text>
              <Text
                style={{ color: "#31404B", textAlign: "center", margin: 20 }}
              >
                Xin vui lòng để ý điện thoại, tổng đài sẽ liên lạc sau ít phút
              </Text>
              <Button
                full
                style={{
                  backgroundColor: "#2E3B45",
                  width: deviceWidth - 35,
                  marginLeft: 10,
                  marginRight: 10
                }}
                onPress={() => {
                  this.popupDialog.dismiss();
                  setTimeout(() => {
                    this._popupdismiss();
                  }, 1000);
                }}
              >
                <Text style={{ fontWeight: "bold" }}>HOÀN TẤT</Text>
              </Button>
            </View>
          </PopupDialog>
          <Spinner visible={this.state.visible} />
        </Content>
      </Container>
    );
  }

  showAlert(title, content, button) {
    Alert.alert(title, content, button, { cancelable: false });
  }

  _popupdismiss() {
    setTimeout(() => {
      const navigation = this.props.navigation;
      navigation.navigate("history");
    }, 100);
  }

  _alertBook() {
    this.showAlert(
      "Xác nhận đặt xe",
      "Bạn có chắc chắn đặt xe với những thông tin đã chọn",
      [
        {
          text: "Hủy",
          onPress: () => {
            press = true;
            console.log("Cancel Pressed");
          },
          style: "cancel"
        },
        {
          text: "Đặt ngay",
          onPress: () => {
            dialog = true;
            setTimeout(() => {
              this._book();
            }, 100);
            this.setState({ visible: true });
          }
        }
      ],
      { cancelable: true }
    );
  }

  _book() {
    if (!this.state.dateString) {
      var date = new Date();
      this.setState({
        dateString:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes()
      });
    }
    var params = {};
    if (this.state.start.trim() === "Chọn điểm đón") {
      this.setState({ visible: false });
      setTimeout(() => {
        this.showAlert("Chú ý", "Vui lòng chọn điểm đón", [
          {
            text: "OK",
            onPress: () => {
              press = true;
            }
          }
        ]);
      }, 100);
    }
    if (this.state.stop.trim() === "Chọn điểm đến") {
      this.setState({ visible: false });
      setTimeout(() => {
        this.showAlert("Chú ý", "Vui lòng chọn điểm đến", [
          {
            text: "OK",
            onPress: () => {
              press = true;
            }
          }
        ]);
      }, 100);
    }
    if (
      this.state.start.trim() !== "Chọn điểm đón" &&
      this.state.stop.trim() !== "Chọn điểm đến"
    ) {
      params.user = this.state.userId;
      params.from_text = this.state.start;
      params.from_longitude = this.state.startLng;
      params.from_latitude = this.state.startLat;
      params.to_text = this.state.stop;
      params.to_longitude = this.state.stopLng;
      params.to_latitude = this.state.stopLat;
      params.car_type = this.state.car_type_id;
      params.start_time = this.state.dateString;
      params.round_trip = this.state.roundTrip;
      if (this.state.note) {
        params.note = this.state.note;
      } else {
        params.note = "Tùy chọn";
      }
      params.price = this.state.price;
      params.distance = this.state.distance;
      params.duration = this.state.duration;
      params.delete_flag = 0;
      console.log(params);
      this.props.carbookingout(params);
    }
  }
  _timePicker() {
    return (
      <View style={styles.containerTimePicker}>
        <View
          style={[
            styles.TimePicker,
            { marginLeft: 10, alignItems: "flex-start" }
          ]}
        >
          <Text numberOfLines={1} style={{ color: "#31404B" }}>
            Thời gian
          </Text>
        </View>
        <View
          style={{
            marginRight: 10,
            alignItems: "flex-end",
            height: 40,
            justifyContent: "center",
            flex: 3
            // backgroundColor: "red"
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}
            onPress={() => this.setState({ openTimePicker: true })}
          >
            <Text style={styles.textNor}>
              {this.state.dateStringshow}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  hideTimePicker() {
    this.setState({ openTimePicker: false });
  }

  _handleNumber(number) {
    if (
      number === 0 ||
      number === 1 ||
      number === 2 ||
      number === 3 ||
      number === 4 ||
      number === 5 ||
      number === 6 ||
      number === 7 ||
      number === 8 ||
      number === 9
    ) {
      return "0" + number;
    } else {
      return number;
    }
  }

  handleDatePicked(date, hanoi) {
    this.setState({
      timeH: date.getHours(),
      dateString:
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes(),
      dateStringshow:
        this._handleNumber(date.getHours()) +
        ":" +
        this._handleNumber(date.getMinutes()) +
        " " +
        this._handleNumber(date.getDate()) +
        "-" +
        this._handleNumber(date.getMonth() + 1) +
        "-" +
        date.getFullYear()
    });
    this.hideTimePicker();
    if (
      this.state.start.trim() !== "Chọn điểm đón" &&
      this.state.stop.trim() !== "Chọn điểm đến"
    ) {
      if (hanoi) {
        if (this.state.router === "nb") {
          console.log("hnnb");
          console.log(date.getHours());
          if (this.state.locate === "noi") {
            this._checkTimeNoi(
              date.getHours(),
              this.state.roundTrip,
              this.state.car_type_id
            );
          } else {
            this._checkTimeNgoai(
              date.getHours(),
              this.state.roundTrip,
              this.state.car_type_id
            );
          }
        } else {
          console.log("nbhn", date.getHours());
          if (this.state.locate === "noi") {
            this._checkTimeNoinb(
              date.getHours(),
              this.state.roundTrip,
              this.state.car_type_id
            );
          } else {
            this._checkTimeNgoainb(
              date.getHours(),
              this.state.roundTrip,
              this.state.car_type_id
            );
          }
        }
      } else {
        this.priceOutHanoi(
          date.getHours(),
          this.state.car_type_id,
          this.state.roundTrip,
          this.state.distance
        );
      }
    }
  }

  _roundTrip() {
    return (
      <View style={styles.containerRouterSelect}>
        <View
          style={[
            styles.TimePicker,
            { marginLeft: 10, alignItems: "flex-start" }
          ]}
        >
          <Text style={{ color: "#31404B", fontSize: 15 }}>Khứ hồi</Text>
        </View>
        <View
          style={[
            styles.TimePicker,
            { marginRight: 10, alignItems: "flex-end" }
          ]}
        >
          <View style={styles.switchZone}>
            <Switch
              value={this.state.roundTrip}
              onValueChange={val => this._upDate(val, this.state.hanoi)}
              disabled={false}
              onTintColor="#31404B"
              thumbTintColor="#b5b5b5"
              tintColor="#e1e1e1"
            />
          </View>
        </View>
      </View>
    );
  }
  _note() {
    return (
      <View style={styles.noteContainer}>
        <View style={{ height: "30%", marginLeft: 7 }}>
          <Text style={{ color: "#31404B", fontSize: 15, marginTop: 5 }}>
            {" "}Ghi chú
          </Text>
        </View>
        <View style={{ marginTop: 5, height: "70%", marginLeft: 7 }}>
          <Input
            placeholder="Nhập ghi chú..."
            placeholderTextColor="#848484"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            editable={true}
            onChangeText={text => this.setState({ note: text })}
            value={this.state.note}
          />
        </View>
      </View>
    );
  }

  priceHandle(price) {
    var priceshow = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    this.setState({
      priceshow: priceshow,
      price: price,
      visible: false
    });
    // return price
  }

  _price() {
    return (
      <View style={[styles.noteContainer, { marginBottom: 10 }]}>
        <View style={styles.textNote}>
          <Text style={{ color: "#31404B", fontSize: 15, marginTop: 3 }}>
            {" "}Thành tiền
          </Text>
        </View>
        <View style={{ height: "70%", marginLeft: 7, marginTop: 5 }}>
          <Text style={styles.textPrice}>
            {this.state.priceshow} VNĐ
          </Text>
        </View>
      </View>
    );
  }

  async _upDate(val, hanoi) {
    console.log(val);
    if (val) {
      await this.setState({
        roundTrip: true
      });
      if (
        this.state.start.trim() !== "Chọn điểm đón" &&
        this.state.stop.trim() !== "Chọn điểm đến"
      ) {
        if (hanoi) {
          if (this.state.router === "nb") {
            if (this.state.locate === "noi") {
              this._checkTimeNoi(this.state.timeH, val, this.state.car_type_id);
            } else {
              this._checkTimeNgoai(
                this.state.timeH,
                val,
                this.state.car_type_id
              );
            }
          } else {
            if (this.state.locate === "noi") {
              this._checkTimeNoinb(
                this.state.timeH,
                val,
                this.state.car_type_id
              );
            } else {
              this._checkTimeNgoainb(
                this.state.timeH,
                val,
                this.state.car_type_id
              );
            }
          }
        } else {
          this.priceOutHanoi(
            this.state.timeH,
            this.state.car_type_id,
            val,
            this.state.distance
          );
        }
      }
    } else {
      await this.setState({
        roundTrip: false
      });
      if (
        this.state.start.trim() !== "Chọn điểm đón" &&
        this.state.stop.trim() !== "Chọn điểm đến"
      ) {
        if (hanoi) {
          if (this.state.router === "nb") {
            if (this.state.locate === "noi") {
              this._checkTimeNoi(
                this.state.timeH,
                this.state.roundTrip,
                this.state.car_type_id
              );
            } else {
              this._checkTimeNgoai(
                this.state.timeH,
                this.state.roundTrip,
                this.state.car_type_id
              );
            }
          } else {
            if (this.state.locate === "noi") {
              this._checkTimeNoinb(
                this.state.timeH,
                this.state.roundTrip,
                this.state.car_type_id
              );
            } else {
              this._checkTimeNgoainb(
                this.state.timeH,
                this.state.roundTrip,
                this.state.car_type_id
              );
            }
          }
        } else {
          this.priceOutHanoi(
            this.state.timeH,
            this.state.car_type_id,
            val,
            this.state.distance
          );
        }
      }
    }
  }
  // else {
  //   this.priceOutHanoi(this.state.timeH, this.state.car_type_id, val,this.state.distance)
  // }
  //   console.log(this.state.roundTrip);
  // }

  _routerSelect(noibaihanoi) {
    if (noibaihanoi) {
      this.setState({
        selectedTab1: "#31404B",
        selectedTab2: "#f4f2f2",
        textColor1: "white",
        textColor2: "black",
        disabledstart: true,
        disabledstop: false,
        start: name,
        stop: "Chọn điểm đến",
        startLat: lat,
        startLng: lng,
        router: "hn",
        price: 0,
        priceshow: 0,
        close: false
      });
    } else {
      this.setState({
        selectedTab1: "#f4f2f2",
        selectedTab2: "#31404B",
        textColor1: "black",
        textColor2: "white",
        disabledstart: false,
        disabledstop: true,
        start: "Chọn điểm đón",
        stop: name,
        stopLat: lat,
        stopLng: lng,
        price: 0,
        router: "nb",
        priceshow: 0,
        open: false
      });
    }
  }

  async _color(car4, car7, car16, car_type_id, hanoi) {
    await this.setState({
      car4: car4,
      car7: car7,
      car16: car16,
      car_type_id: car_type_id
    });
    if (
      this.state.start.trim() !== "Chọn điểm đón" &&
      this.state.stop.trim() !== "Chọn điểm đến"
    ) {
      if (hanoi) {
        console.log("hanoi");
        if (this.state.router === "nb") {
          if (this.state.locate === "noi") {
            console.log("nb hanoi noi");
            this._checkTimeNoi(
              this.state.timeH,
              this.state.roundTrip,
              car_type_id
            );
          } else {
            console.log("nb hanoi ngoai");
            this._checkTimeNgoai(
              this.state.timeH,
              this.state.roundTrip,
              car_type_id
            );
          }
        } else {
          if (this.state.locate === "noi") {
            console.log("hn hanoi noi");
            this._checkTimeNoinb(
              this.state.timeH,
              this.state.roundTrip,
              car_type_id
            );
          } else {
            console.log("hn hanoi ngoai");
            this._checkTimeNgoainb(
              this.state.timeH,
              this.state.roundTrip,
              car_type_id
            );
          }
        }
      } else {
        console.log("ngoai thanh");
        this.priceOutHanoi(
          this.state.timeH,
          car_type_id,
          this.state.roundTrip,
          this.state.distance
        );
      }
    }
  }

  _cartype() {
    return (
      <View style={styles.containerCartype}>
        <TouchableOpacity
          onPress={() => this._color(car4Y, car7W, car16W, 7, this.state.hanoi)}
          style={styles.cartype}
        >
          <Image
            source={this.state.car4}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
          <Text style={{ color: this.state.color4 }}>5 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._color(car4W, car7Y, car16W, 8, this.state.hanoi)}
          style={styles.cartype}
        >
          <Image
            source={this.state.car7}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
          <Text style={{ color: this.state.color7 }}>7 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._color(car4W, car7W, car16Y, 9, this.state.hanoi)}
          style={styles.cartype}
        >
          <Image
            source={this.state.car16}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
          <Text style={{ color: this.state.color16 }}>16 Chỗ</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // _startPoint() {
  //   console.log("click");
  // } "Chọn điểm xuất phát"   Chọn điểm xuất phát

  _placePicker(header, placeholder, start) {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                if (start) {
                  this.setState({ close: false });
                } else {
                  this.setState({ open: false });
                }
              }}
            >
              <Icon active name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text
              numberOfLines={1}
              style={{ color: "black", fontWeight: "bold", fontSize: 15 }}
            >
              {header}
            </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View>
          <GooglePlacesAutocomplete
            placeholder={placeholder}
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            styles={{
              listView: {
                position: "absolute",
                marginTop: Platform.OS !== "ios" ? 54 : 64
              },
              textInputContainer: {
                backgroundColor: "white",
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            enableHighAccuracyLocation={true}
            currentLocation={true}
            currentLocationLabel="Vị trí hiện tại"
            nearbyPlacesAPI={"GoogleReverseGeocoding"}
            GoogleReverseGeocodingQuery={{}}
            GooglePlacesSearchQuery={{}}
            filterReverseGeocodingByTypes={[
              "route",
              "administrative_area_level_3"
            ]}
            onPress={(data, details) => {
              if (
                details.geometry.location.lat === noiBaiLat &&
                details.geometry.location.lng === noiBaiLng
              ) {
                if (start) {
                  this._routerSelect(true);
                } else {
                  this._routerSelect(false);
                }
              } else {
                if (start) {
                  this._checkHanoi(data, details, true);
                } else {
                  this._checkHanoi(data, details, false);
                }
                if (!this.state.hanoi) {
                  console.log("this.state.hanoi");
                  if (this.state.router === "hn") {
                    this.props.distance(
                      lat,
                      lng,
                      this.state.stopLat,
                      this.state.stopLng
                    );
                  } else {
                    this.props.distance(
                      this.state.startLat,
                      this.state.startLng,
                      lat,
                      lng
                    );
                  }
                } else {
                  this.setState({ visible: false, price: 0, priceshow: 0 });
                  setTimeout(() => {
                    Alert.alert(
                      "Thông báo",
                      "Bạn đã chọn địa điểm thuộc Hà Nội, Bạn có muốn chuyển đến màn hình đặt xe với địa điểm thuộc Hà nội?",
                      [
                        {
                          text: "Chọn Lại",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        {
                          text: "Chuyển",
                          onPress: () =>
                            this.props.navigation.navigate("bookCar")
                        }
                      ],
                      { cancelable: false }
                    );
                  }, 100);
                }
              }
            }}
            query={{
              key: "AIzaSyB-O4m9EPQ3aL-ZCjdWnghoepXlQOlGDYg",
              language: "vi" // language of the results
            }}
          />
        </View>
      </Container>
    );
  }

  _checkNightTime(timeH) {
    if (
      timeH === 22 ||
      timeH === 23 ||
      timeH === 0 ||
      timeH === 1 ||
      timeH === 2 ||
      timeH === 3 ||
      timeH === 4 ||
      timeH === 5 ||
      timeH === 6
    ) {
      return true;
    } else {
      return false;
    }
  }

  _checkHanoi(data, details, start) {
    var stringLat = details.geometry.location.lat.toString();
    var splitLat = stringLat.split(".")[1].slice(0, 6);
    var latitude = stringLat.split(".")[0] + "." + splitLat;

    var stringLng = details.geometry.location.lng.toString();
    var splitLng = stringLng.split(".")[1].slice(0, 6);
    var longitude = stringLng.split(".")[0] + "." + splitLng;
    var i = "";
    var j = "";
    for (j in details.formatted_address.split(",")) {
      if (!details.formatted_address.split(",")[j]) {
        break;
      } else {
        if (details.formatted_address.split(",")[j].trim() === "Hà Nội") {
          if (start) {
            this.setState({
              visible: true,
              close: false,
              hanoi: true
            });
            break;
          } else {
            this.setState({
              visible: true,
              open: false,
              hanoi: true
            });
            break;
          }
        } else {
          if (start) {
            this.setState({
              start: details.formatted_address,
              startLat: latitude,
              startLng: longitude,
              visible: true,
              close: false,
              hanoi: false
            });
            console.log("else start", longitude);
          } else {
            console.log("else !start");
            this.setState({
              stop: details.formatted_address,
              // originlat,originlng,destinationlat,destinationlng
              stopLat: latitude,
              stopLng: longitude,
              visible: true,
              open: false,
              hanoi: false
            });
          }
          console.log("khong thuoc Hanoi");
        }
      }
    }
    return j;
  }

  _pickLocation() {
    return (
      <View style={styles.locationPick0}>
        <View style={styles.locationPick}>
          <Image source={icon} style={{ height: 110 }} resizeMode="contain" />
        </View>
        <View style={styles.locationPick1}>
          <View
            style={{
              width: "100%",
              height: 65,
              justifyContent: "center",
              alignContent: "center",
              marginRight: 10,
              marginLeft: 5
            }}
          >
            <TouchableOpacity
              disabled={this.state.disabledstart}
              onPress={() =>
                // this.onPress()
                this.setState({ close: true })}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ color: "#31404B", fontSize: 15 }}>
                  {" "}Điểm đón
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  borderBottomWidth: 0.5
                }}
              >
                <Text numberOfLines={1} style={styles.textstop}>
                  {this.state.start}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 65,
              justifyContent: "center",
              alignContent: "center",
              marginRight: 10,
              marginLeft: 5
            }}
          >
            <TouchableOpacity
              disabled={this.state.disabledstop}
              onPress={() => this.setState({ open: true })}
            >
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ color: "#31404B", fontSize: 15 }}>
                  {" "}Điểm đến
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <Text numberOfLines={1} style={styles.textstop}>
                  {this.state.stop}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const bookCarOut = reduxForm({
  form: "bookcarout"
})(bookCarOutForm);

function bindAction(dispatch) {
  return {
    carbookingout: params => dispatch(carbookingout(params)),
    getcartype: () => dispatch(getcartype()),
    distance: (originlat, originlng, destinationlat, destinationlng) =>
      dispatch(distance(originlat, originlng, destinationlat, destinationlng))
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.bookCarOutReducer.items,
  error: state.bookCarOutReducer.error,
  cartypes: state.bookCarOutReducer.cartypes,
  errorC: state.bookCarOutReducer.errorC,
  Successdistance: state.bookCarOutReducer.Successdistance,
  Errordistance: state.bookCarOutReducer.Errordistance
});
export default connect(mapStateToProps, bindAction)(bookCarOutForm);
