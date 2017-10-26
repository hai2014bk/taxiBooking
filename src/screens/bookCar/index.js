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
import { carbooking, getcartype } from "../../actions";
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
var hanoi = "";
class bookCarForm extends Component {
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
      car_type_id: 1,
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
      supPhone: "tel: 18001182"
    };
  }
  async componentDidMount() {
    this.popupDialog.dismiss();
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var ObjloginInfo = JSON.parse(loginInfo);
    var userId = ObjloginInfo.id;
    this.setState({
      userId: userId
    });
    // this.props.getcartype();
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
    console.log("render");
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
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
              ĐẶT XE
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
              onConfirm={dates => this.handleDatePicked(dates)}
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
      this.props.carbooking(params);
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
          <Text style={{ color: "#31404B" }}>Thời gian</Text>
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

  _handleMinute(date, minute) {
    if (minute) {
      if (
        date.getMinutes() === 0 ||
        date.getMinutes() === 1 ||
        date.getMinutes() === 2 ||
        date.getMinutes() === 3 ||
        date.getMinutes() === 4 ||
        date.getMinutes() === 5 ||
        date.getMinutes() === 6 ||
        date.getMinutes() === 7 ||
        date.getMinutes() === 8 ||
        date.getMinutes() === 9
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        date.getHours() === 0 ||
        date.getHours() === 1 ||
        date.getHours() === 2 ||
        date.getHours() === 3 ||
        date.getHours() === 4 ||
        date.getHours() === 5 ||
        date.getHours() === 6 ||
        date.getHours() === 7 ||
        date.getHours() === 8 ||
        date.getHours() === 9
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  handleDatePicked(date) {
    // console.log(date);
    var minuteValue = "";
    var hourValue = "";
    if (this._handleMinute(date, true)) {
      // console.log("123456789");
      minuteValue = "0" + date.getMinutes().toString();
    } else {
      // console.log("#123456789");
      minuteValue = date.getMinutes();
    }
    if (this._handleMinute(date, false)) {
      // console.log("123456789");
      hourValue = "0" + date.getHours().toString();
    } else {
      hourValue = date.getHours();
    }
    // console.log("length", hourValue);
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
        date.getMinutes(),
      dateStringshow:
        hourValue +
        ":" +
        minuteValue +
        " " +
        date.getDate() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getFullYear()
    });
    this.hideTimePicker();
    if (
      this.state.start.trim() !== "Chọn điểm đón" &&
      this.state.stop.trim() !== "Chọn điểm đến"
    ) {
      // console.log("zo");
      if (this.state.router === "nb") {
        if (this.state.locate === "noi") {
          this._checkTimeNoi(date.getHours());
        } else {
          this._checkTimeNgoai(date.getHours());
        }
      } else {
        // console.log("co");
        if (this.state.locate === "noi") {
          this._checkTimeNoinb(date.getHours());
        } else {
          this._checkTimeNgoainb(date.getHours());
        }
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
              onValueChange={val => this._upDate(val)}
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
      price: price
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

  async _upDate(val) {
    if (val) {
      await this.setState({
        roundTrip: true
      });
      if (
        this.state.start.trim() !== "Chọn điểm đón" &&
        this.state.stop.trim() !== "Chọn điểm đến"
      ) {
        if (this.state.router === "nb") {
          if (this.state.locate === "noi") {
            this._checkTimeNoi(this.state.timeH);
          } else {
            this._checkTimeNgoai(this.state.timeH);
          }
        } else {
          if (this.state.locate === "noi") {
            this._checkTimeNoinb(this.state.timeH);
          } else {
            this._checkTimeNgoainb(this.state.timeH);
          }
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
        if (this.state.router === "nb") {
          if (this.state.locate === "noi") {
            this._checkTimeNoi(this.state.timeH);
          } else {
            this._checkTimeNgoai(this.state.timeH);
          }
        } else {
          if (this.state.locate === "noi") {
            this._checkTimeNoinb(this.state.timeH);
          } else {
            this._checkTimeNgoainb(this.state.timeH);
          }
        }
      }
    }
  }

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

  async _color(car4, car7, car16, car_type_id) {
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
      if (this.state.router === "nb") {
        if (this.state.locate === "noi") {
          this._checkTimeNoi(this.state.timeH);
        } else {
          this._checkTimeNgoai(this.state.timeH);
        }
      } else {
        if (this.state.locate === "noi") {
          this._checkTimeNoinb(this.state.timeH);
        } else {
          this._checkTimeNgoainb(this.state.timeH);
        }
      }
    }
  }

  _cartype() {
    return (
      <View style={styles.containerCartype}>
        <TouchableOpacity
          onPress={() => this._color(car4Y, car7W, car16W, 1)}
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
          onPress={() => this._color(car4W, car7Y, car16W, 2)}
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
          onPress={() => this._color(car4W, car7W, car16Y, 4)}
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
                  setTimeout(() => {
                    this.showAlert(
                      "Thông báo",
                      "Hiện tại chúng tôi chưa hỗ trợ khu vực ngoài Hà Nội. Vui lòng thử lại sau",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            if (start) {
                              this.setState({
                                start: "Chọn điểm đón",
                                priceshow: 0
                              });
                            } else {
                              this.setState({
                                stop: "Chọn điểm đến",
                                priceshow: 0
                              });
                            }
                          }
                        }
                      ]
                    );
                  }, 100);
                }
              }
            }}
            query={{
              key: "AIzaSyBYoB8zl4bBliFHq4ok7LWM8Eqon0v_IqE",
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

  _checkTimeNoi(timeH) {
    // console.log(timeH, "adasdasdasd");
    if (this._checkNightTime(timeH)) {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(200000);
          console.log("1");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("1_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(230000);
          console.log("2");
        } else {
          this.priceHandle(540000);
          console.log("2_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(400000);
          console.log("3");
        } else {
          this.priceHandle(850000);
          console.log("3_1");
        }
      }
    } else {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(170000);
          console.log("4");
        } else {
          this.priceHandle(420000);
          console.log("4_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(200000);
          console.log("5");
        } else {
          this.priceHandle(480000);
          console.log("5_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(350000);
          console.log("6");
        } else {
          this.priceHandle(750000);
          console.log("6_1");
        }
      }
    }
  }

  _checkTimeNgoai(timeH) {
    if (this._checkNightTime(timeH)) {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(230000);
          console.log("7");
        } else {
          this.priceHandle(540000);
          console.log("7_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(260000);
          console.log("8");
        } else {
          this.priceHandle(600000);
          console.log("8_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(600000);
          console.log("9");
        } else {
          this.priceHandle(950000);
          console.log("9_1");
        }
      }
    } else {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(200000);
          console.log("10");
        } else {
          this.priceHandle(480000);
          console.log("10_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(230000);
          console.log("11");
        } else {
          this.priceHandle(540000);
          console.log("11_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(400000);
          console.log("12");
        } else {
          this.priceHandle(850000);
          console.log("12_1");
        }
      }
    }
  }

  _checkTimeNoinb(timeH) {
    if (this._checkNightTime(timeH)) {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(300000);
          console.log("13");
        } else {
          this.priceHandle(480000);
          console.log("13_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(330000);
          console.log("14");
        } else {
          this.priceHandle(540000);
          console.log("14_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(500000);
          console.log("15");
        } else {
          this.priceHandle(850000);
          console.log("15_1");
        }
      }
    } else {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(270000);
          console.log("16");
        } else {
          this.priceHandle(420000);
          console.log("16_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(300000);
          console.log("17");
        } else {
          this.priceHandle(480000);
          console.log("17_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(450000);
          console.log("18");
        } else {
          this.priceHandle(750000);
          console.log("18_1");
        }
      }
    }
  }

  _checkTimeNgoainb(timeH) {
    if (this._checkNightTime(timeH)) {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(330000);
          console.log("19");
        } else {
          this.priceHandle(540000);
          console.log("19_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(360000);
          console.log("20");
        } else {
          this.priceHandle(600000);
          console.log("20_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(550000);
          console.log("21");
        } else {
          this.priceHandle(950000);
          console.log("21_1");
        }
      }
    } else {
      if (this.state.car_type_id === 1) {
        if (!this.state.roundTrip) {
          this.priceHandle(300000);
          console.log("22");
        } else {
          this.priceHandle(480000);
          console.log("22_1");
        }
      }
      if (this.state.car_type_id === 2) {
        if (!this.state.roundTrip) {
          this.priceHandle(330000);
          console.log("23");
        } else {
          this.priceHandle(540000);
          console.log("23_1");
        }
      }
      if (this.state.car_type_id === 4) {
        if (!this.state.roundTrip) {
          this.priceHandle(500000);
          console.log("24");
        } else {
          this.priceHandle(850000);
          console.log("24_1");
        }
      }
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
          console.log("thuoc ha noi");
          for (i in details.formatted_address.split(",")) {
            if (!details.formatted_address.split(",")[i]) {
              break;
            } else {
              if (
                details.formatted_address.split(",")[i].trim() ===
                  "Hoàn Kiếm" ||
                details.formatted_address.split(",")[i].trim() === "Tây Hồ" ||
                details.formatted_address.split(",")[i].trim() === "Đống Đa" ||
                details.formatted_address.split(",")[i].trim() === "Ba Đình" ||
                details.formatted_address.split(",")[i].trim() === "Cầu Giấy" ||
                details.formatted_address.split(",")[i].trim() ===
                  "Long Biên" ||
                details.formatted_address.split(",")[i].trim() ===
                  "Thanh Xuân" ||
                details.formatted_address.split(",")[i].trim() ===
                  "Hai Bà Trưng"
              ) {
                if (this.state.router === "nb") {
                  this._checkTimeNoi(this.state.timeH);
                } else {
                  this._checkTimeNoinb(this.state.timeH);
                }
                if (start) {
                  console.log("if start");
                  this.setState({
                    start: details.formatted_address,
                    startLat: latitude,
                    startLng: longitude,
                    close: false,
                    locate: "noi",
                    hanoi: true
                  });
                } else {
                  console.log("if !start");
                  this.setState({
                    stop: details.formatted_address,
                    stopLat: latitude,
                    stopLng: longitude,
                    open: false,
                    locate: "noi",
                    hanoi: true
                  });
                }
                console.log("noi thanh");
                break;
              } else {
                if (this.state.router === "nb") {
                  this._checkTimeNgoai(this.state.timeH);
                } else {
                  this._checkTimeNgoainb(this.state.timeH);
                }
                console.log("no data");
                if (start) {
                  console.log("else start");
                  this.setState({
                    start: details.formatted_address,
                    startLat: latitude,
                    startLng: longitude,
                    close: false,
                    locate: "ngoai",
                    hanoi: true
                  });
                } else {
                  console.log("else !start");
                  this.setState({
                    stop: details.formatted_address,
                    stopLat: latitude,
                    stopLng: longitude,
                    open: false,
                    locate: "ngoai",
                    hanoi: true
                  });
                }
                console.log("ngoai thanh");
              }
            }
          }
          return i;
        } else {
          if (start) {
            console.log("else start");
            this.setState({
              close: false,
              hanoi: false
            });
          } else {
            console.log("else !start");
            this.setState({
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
const bookCar = reduxForm({
  form: "bookcar"
})(bookCarForm);

function bindAction(dispatch) {
  return {
    carbooking: params => dispatch(carbooking(params)),
    getcartype: () => dispatch(getcartype())
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.bookCarReducer.items,
  error: state.bookCarReducer.error,
  cartypes: state.bookCarReducer.cartypes,
  errorC: state.bookCarReducer.errorC
});
export default connect(mapStateToProps, bindAction)(bookCarForm);
