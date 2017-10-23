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
var noiBaiLat = 21.2187149;
var noiBaiLng = 105.8041709;
var lat = 21.218714;
var lng = 105.80417;
var mainScreen = true;
var name = "Sân bay Nội Bài";
var timeH = new Date().getHours();
var timeMi = new Date().getMinutes();
var timeY = new Date().getFullYear();
var timeMo = new Date().getMonth();
var timeD = new Date().getDate();
var press = true;
var sidebar = true;
var dialog = false;
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
      timeH: timeH,
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
  componentWillReceiveProps(props) {
    // if (props.cartypes[0]) {
    //   this.setState({ dataArray: props.cartypes });
    //   console.log("items", props.items);
    // } else {
    //   console.log("nodata");
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
              this.showAlert("Thất bại", "Đặt xe đặt xe thất bại", [
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
  async componentDidMount() {
    this.popupDialog.dismiss();
    var loginInfo = await AsyncStorage.getItem(mConstants.LOGIN_INFO);
    var ObjloginInfo = JSON.parse(loginInfo);
    var userId = ObjloginInfo.id;
    this.setState({
      userId: userId
    });
    // this.props.getcartype();
    // AsyncStorage.removeItem(mConstants.LOGIN_INFO);
  }
  componentWillMount() {
    console.log(222);
    const navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", function() {
      if (mainScreen) {
        console.log(444);
        BackHandler.exitApp();
      } else {
        console.log(333);
        navigation.navigate("bookCar");
      }
    });
  }
  render() {
    console.log(this.state.dateString, timeH);
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
                this.setState({ sidebar: true });
                setTimeout(() => {
                  this.setState({ sidebar: false });
                }, 1000);
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
              <Text style={{ fontSize: 16 }}>1800-1182</Text>
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
                width: deviceWidth - 20
              }}
            >
              <Button
                style={[
                  styles.chooseBtn,
                  { backgroundColor: this.state.selectedTab1 }
                ]}
                onPress={() => this._haNoi()}
              >
                <Text
                  numberOfLines={2}
                  style={{ color: this.state.textColor1 }}
                >
                  Nội Bài -> Hà Nội
                </Text>
              </Button>
              <Button
                style={[
                  styles.chooseBtn,
                  { backgroundColor: this.state.selectedTab2 }
                ]}
                onPress={() => this._noiBai()}
              >
                <Text style={{ color: this.state.textColor2 }}>
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
              {this._placeStartPicker()}
            </Modal>
            <Modal
              visible={this.state.open}
              onRequestClose={() => this.setState({ open: false })}
              animationType="slide"
              transparent={false}
              style={{ marginTop: 42, backgroundColor: "red" }}
            >
              {this._placeStopPicker()}
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <DateTimePicker
              mode="datetime"
              minimumDate={date}
              isVisible={this.state.openTimePicker}
              onConfirm={date => this.handleDatePicked(date)}
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
    if (this.state.start.trim() == "Chọn điểm đón") {
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
    if (this.state.stop.trim() == "Chọn điểm đến") {
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
      this.state.start.trim() != "Chọn điểm đón" &&
      this.state.stop.trim() != "Chọn điểm đến"
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
          <Text style={{ color: "#31404B", fontSize: 15 }}>Thời gian</Text>
        </View>
        <View
          style={[
            styles.TimePicker,
            { marginRight: 10, alignItems: "flex-end" }
          ]}
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

  handleDatePicked(date) {
    console.log(date);
    var minuteValue = "";
    var hourValue = "";
    if (
      date.getMinutes() == 0 ||
      date.getMinutes() == 1 ||
      date.getMinutes() == 2 ||
      date.getMinutes() == 3 ||
      date.getMinutes() == 4 ||
      date.getMinutes() == 5 ||
      date.getMinutes() == 6 ||
      date.getMinutes() == 7 ||
      date.getMinutes() == 8 ||
      date.getMinutes() == 9
    ) {
      console.log("123456789");
      minuteValue = "0" + date.getMinutes().toString();
    } else {
      console.log("#123456789");
      minuteValue = date.getMinutes();
    }
    if (
      date.getHours() == 0 ||
      date.getHours() == 1 ||
      date.getHours() == 2 ||
      date.getHours() == 3 ||
      date.getHours() == 4 ||
      date.getHours() == 5 ||
      date.getHours() == 6 ||
      date.getHours() == 7 ||
      date.getHours() == 8 ||
      date.getHours() == 9
    ) {
      console.log("123456789");
      hourValue = "0" + date.getHours().toString();
    } else {
      console.log("#123456789");
      hourValue = date.getHours();
    }
    console.log("length", hourValue);
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
      timeH: date.getHours(),
      validateWorkingTime: false,
      time: date.getHours() + ":" + date.getMinutes(),
      date:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
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
      this.state.start.trim() != "Chọn điểm đón" &&
      this.state.stop.trim() != "Chọn điểm đến"
    ) {
      if (this.state.router == "nb") {
        if (this.state.locate == "noi") {
          this._checkTimeNoi(this.state.timeH);
        } else {
          this._checkTimeNgoai(this.state.timeH);
        }
      } else {
        if (this.state.locate == "noi") {
          this._checkTimeNoinb(this.state.timeH);
        } else {
          this._checkTimeNgoainb(this.state.timeH);
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
    var count = 0;
    price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    this.setState({
      priceshow: price
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
        this.state.start.trim() != "Chọn điểm đón" &&
        this.state.stop.trim() != "Chọn điểm đến"
      ) {
        if (this.state.router == "nb") {
          if (this.state.locate == "noi") {
            this._checkTimeNoi(this.state.timeH);
          } else {
            this._checkTimeNgoai(this.state.timeH);
          }
        } else {
          if (this.state.locate == "noi") {
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
        this.state.start.trim() != "Chọn điểm đón" &&
        this.state.stop.trim() != "Chọn điểm đến"
      ) {
        if (this.state.router == "nb") {
          if (this.state.locate == "noi") {
            this._checkTimeNoi(this.state.timeH);
          } else {
            this._checkTimeNgoai(this.state.timeH);
          }
        } else {
          if (this.state.locate == "noi") {
            this._checkTimeNoinb(this.state.timeH);
          } else {
            this._checkTimeNgoainb(this.state.timeH);
          }
        }
      }
    }
  }

  _haNoi() {
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
      close: false,
      price: 0,
      router: "hn",
      priceshow: 0
    });
  }
  _noiBai() {
    this.setState({
      selectedTab2: "#31404B",
      textColor2: "white",
      selectedTab1: "#f4f2f2",
      textColor1: "black",
      disabledstart: false,
      disabledstop: true,
      start: "Chọn điểm đón",
      stop: name,
      stopLat: lat,
      stopLng: lng,
      open: false,
      price: 0,
      router: "nb",
      priceshow: 0
    });
  }

  async _color4() {
    await this.setState({
      car4: car4Y,
      car7: car7W,
      car16: car16W,
      car_type_id: 1
    });
    if (
      this.state.start.trim() != "Chọn điểm đón" &&
      this.state.stop.trim() != "Chọn điểm đến"
    ) {
      if (this.state.router == "nb") {
        if (this.state.locate == "noi") {
          this._checkTimeNoi(this.state.timeH);
        } else {
          this._checkTimeNgoai(this.state.timeH);
        }
      } else {
        if (this.state.locate == "noi") {
          this._checkTimeNoinb(this.state.timeH);
        } else {
          this._checkTimeNgoainb(this.state.timeH);
        }
      }
    }
  }

  async _color7() {
    await this.setState({
      car4: car4W,
      car7: car7Y,
      car16: car16W,
      car_type_id: 2
    });
    if (
      this.state.start.trim() != "Chọn điểm đón" &&
      this.state.stop.trim() != "Chọn điểm đến"
    ) {
      if (this.state.router == "nb") {
        if (this.state.locate == "noi") {
          this._checkTimeNoi(this.state.timeH);
        } else {
          this._checkTimeNgoai(this.state.timeH);
        }
      } else {
        if (this.state.locate == "noi") {
          this._checkTimeNoinb(this.state.timeH);
        } else {
          this._checkTimeNgoainb(this.state.timeH);
        }
      }
    }
  }
  async _color16() {
    await this.setState({
      car4: car4W,
      car7: car7W,
      car16: car16Y,
      car_type_id: 4
    });
    if (
      this.state.start.trim() != "Chọn điểm đón" &&
      this.state.stop.trim() != "Chọn điểm đến"
    ) {
      if (this.state.router == "nb") {
        if (this.state.locate == "noi") {
          this._checkTimeNoi(this.state.timeH);
        } else {
          this._checkTimeNgoai(this.state.timeH);
        }
      } else {
        if (this.state.locate == "noi") {
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
        <TouchableOpacity onPress={() => this._color4()} style={styles.cartype}>
          <Image
            source={this.state.car4}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
          <Text style={{ color: this.state.color4 }}>5 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._color7()} style={styles.cartype}>
          <Image
            source={this.state.car7}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
          <Text style={{ color: this.state.color7 }}>7 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._color16()}
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
  _startPoint() {
    console.log("click");
  }
  _placeStartPicker() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.setState({ close: false })}>
              <Icon active name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text
              numberOfLines={1}
              style={{ color: "black", fontWeight: "bold", fontSize: 15 }}
            >
              Chọn điểm xuất phát
            </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Chọn điểm xuất phát"
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
              console.log(data, details);
              this._checkHanoi(data, details);
              console.log(this.state.hanoi);
              if (this.state.hanoi == "hanoi") {
                if (
                  details.geometry.location.lat == noiBaiLat &&
                  details.geometry.location.lng == noiBaiLng
                ) {
                  this._haNoi();
                } else {
                  var stringLat = details.geometry.location.lat.toString();
                  var splitLat = stringLat.split(".")[1].slice(0, 6);
                  var latitude = stringLat.split(".")[0] + "." + splitLat;
                  var stringLng = details.geometry.location.lat.toString();
                  var splitLng = stringLng.split(".")[1].slice(0, 6);
                  var longitude = stringLng.split(".")[0] + "." + splitLng;
                  this._checklocation(data, details);
                  this.setState({
                    start: details.formatted_address,
                    startLat: latitude,
                    startLng: longitude,
                    close: false
                  });
                  console.log(
                    this.state.startLat,
                    this.state.startLng,
                    this.state.stopLat,
                    this.state.stopLng
                  );
                }
              } else {
                this.setState({
                  close: false
                });
                setTimeout(() => {
                  this.showAlert(
                    "Thông báo",
                    "Hiện tại chúng tôi chưa hỗ trợ khu vực ngoài Hà Nội. Vui lòng thử lại sau",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.setState({
                            start: "Chọn điểm đón"
                          });
                        }
                      }
                    ]
                  );
                }, 100);
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

  _placeStopPicker() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.setState({ open: false })}>
              <Icon active name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text
              numberOfLines={1}
              style={{ color: "black", fontWeight: "bold", fontSize: 15 }}
            >
              Chọn điểm đến
            </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Chọn điểm đến"
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
              console.log(data, details);
              this._checkHanoi(data, details);
              console.log(this.state.hanoi);
              if (this.state.hanoi == "hanoi") {
                if (
                  details.geometry.location.lat == noiBaiLat &&
                  details.geometry.location.lng == noiBaiLng
                ) {
                  this._noiBai();
                } else {
                  var stringLat = details.geometry.location.lat.toString();
                  var splitLat = stringLat.split(".")[1].slice(0, 6);
                  var latitude = stringLat.split(".")[0] + "." + splitLat;
                  var stringLng = details.geometry.location.lat.toString();
                  var splitLng = stringLng.split(".")[1].slice(0, 6);
                  var longitude = stringLng.split(".")[0] + "." + splitLng;
                  this._checklocation(data, details);
                  this.setState({
                    stop: details.formatted_address,
                    stopLat: latitude,
                    stopLng: longitude,
                    open: false
                  });
                }
              } else {
                this.setState({
                  open: false
                });
                setTimeout(() => {
                  this.showAlert(
                    "Thông báo",
                    "Hiện tại chúng tôi chưa hỗ trợ khu vực ngoài Hà Nội. Vui lòng thử lại sau",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.setState({
                            stop: "Chọn điểm đến"
                          });
                        }
                      }
                    ]
                  );
                }, 100);
              }
            }}
            query={{
              key: "AIzaSyBYoB8zl4bBliFHq4ok7LWM8Eqon0v_IqE",
              language: "vi"
            }}
          />
        </View>
      </Container>
    );
  }
  _checkTimeNoi(timeH) {
    console.log(timeH, "adasdasdasd");
    if (
      timeH == 22 ||
      timeH == 23 ||
      timeH == 0 ||
      timeH == 2 ||
      timeH == 3 ||
      timeH == 4 ||
      timeH == 5 ||
      timeH == 6
    ) {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 200000 });
          this.priceHandle(this.state.price);
          console.log("1");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("1_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 230000 });
          this.priceHandle(this.state.price);
          console.log("2");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("2_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 400000 });
          this.priceHandle(this.state.price);
          console.log("3");
        } else {
          this.setState({ price: 850000 });
          this.priceHandle(this.state.price);
          console.log("3_1");
        }
      }
    } else {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 170000 });
          this.priceHandle(this.state.price);
          console.log("4");
        } else {
          this.setState({ price: 420000 });
          this.priceHandle(this.state.price);
          console.log("4_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 200000 });
          this.priceHandle(this.state.price);
          console.log("5");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("5_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 350000 });
          this.priceHandle(this.state.price);
          console.log("6");
        } else {
          this.setState({ price: 750000 });
          this.priceHandle(this.state.price);
          console.log("6_1");
        }
      }
    }
  }

  _checkTimeNgoai(timeH) {
    if (
      timeH == 22 ||
      timeH == 23 ||
      timeH == 0 ||
      timeH == 2 ||
      timeH == 3 ||
      timeH == 4 ||
      timeH == 5 ||
      timeH == 6
    ) {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 230000 });
          this.priceHandle(this.state.price);
          console.log("7");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("7_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 260000 });
          this.priceHandle(this.state.price);
          console.log("8");
        } else {
          this.setState({ price: 600000 });
          this.priceHandle(this.state.price);
          console.log("8_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 450000 });
          this.priceHandle(this.state.price);
          console.log("9");
        } else {
          this.setState({ price: 950000 });
          this.priceHandle(this.state.price);
          console.log("9_1");
        }
      }
    } else {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 200000 });
          this.priceHandle(this.state.price);
          console.log("10");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("10_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 230000 });
          this.priceHandle(this.state.price);
          console.log("11");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("11_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 400000 });
          this.priceHandle(this.state.price);
          console.log("12");
        } else {
          this.setState({ price: 850000 });
          this.priceHandle(this.state.price);
          console.log("12_1");
        }
      }
    }
  }

  _checkTimeNoinb(timeH) {
    if (
      timeH == 22 ||
      timeH == 23 ||
      timeH == 0 ||
      timeH == 2 ||
      timeH == 3 ||
      timeH == 4 ||
      timeH == 5 ||
      timeH == 6
    ) {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 300000 });
          this.priceHandle(this.state.price);
          console.log("13");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("13_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 330000 });
          this.priceHandle(this.state.price);
          console.log("14");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("14_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 500000 });
          this.priceHandle(this.state.price);
          console.log("15");
        } else {
          this.setState({ price: 850000 });
          this.priceHandle(this.state.price);
          console.log("15_1");
        }
      }
    } else {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 270000 });
          this.priceHandle(this.state.price);
          console.log("16");
        } else {
          this.setState({ price: 420000 });
          this.priceHandle(this.state.price);
          console.log("16_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 300000 });
          this.priceHandle(this.state.price);
          console.log("17");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("17_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 450000 });
          this.priceHandle(this.state.price);
          console.log("18");
        } else {
          this.setState({ price: 750000 });
          this.priceHandle(this.state.price);
          console.log("18_1");
        }
      }
    }
  }

  _checkTimeNgoainb(timeH) {
    if (
      timeH == 22 ||
      timeH == 23 ||
      timeH == 0 ||
      timeH == 2 ||
      timeH == 3 ||
      timeH == 4 ||
      timeH == 5 ||
      timeH == 6
    ) {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 330000 });
          this.priceHandle(this.state.price);
          console.log("19");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("19_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 360000 });
          this.priceHandle(this.state.price);
          console.log("20");
        } else {
          this.setState({ price: 600000 });
          this.priceHandle(this.state.price);
          console.log("20_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 550000 });
          this.priceHandle(this.state.price);
          console.log("21");
        } else {
          this.setState({ price: 950000 });
          this.priceHandle(this.state.price);
          console.log("21_1");
        }
      }
    } else {
      if (this.state.car_type_id == 1) {
        if (!this.state.roundTrip) {
          this.setState({ price: 300000 });
          this.priceHandle(this.state.price);
          console.log("22");
        } else {
          this.setState({ price: 480000 });
          this.priceHandle(this.state.price);
          console.log("22_1");
        }
      }
      if (this.state.car_type_id == 2) {
        if (!this.state.roundTrip) {
          this.setState({ price: 330000 });
          this.priceHandle(this.state.price);
          console.log("23");
        } else {
          this.setState({ price: 540000 });
          this.priceHandle(this.state.price);
          console.log("23_1");
        }
      }
      if (this.state.car_type_id == 4) {
        if (!this.state.roundTrip) {
          this.setState({ price: 500000 });
          this.priceHandle(this.state.price);
          console.log("24");
        } else {
          this.setState({ price: 850000 });
          this.priceHandle(this.state.price);
          console.log("24_1");
        }
      }
    }
  }

  _checkHanoi(data, details) {
    var i = "";
    for (i in details.formatted_address.split(",")) {
      if (!details.formatted_address.split(",")[i]) {
        break;
      } else {
        if (details.formatted_address.split(",")[i].trim() == "Hà Nội") {
          this.setState({ hanoi: "hanoi" });
          break;
        } else {
          this.setState({ hanoi: "no hanoi" });
        }
      }
    }
    return i;
  }
  async _checklocation(data, details) {
    await this._checkHanoi(data, details);
    var i = "";
    for (i in details.formatted_address.split(",")) {
      if (!details.formatted_address.split(",")[i]) {
        console.log("akakakk");
        break;
      } else {
        if (
          details.formatted_address.split(",")[i].trim() == "Hoàn Kiếm" ||
          details.formatted_address.split(",")[i].trim() == "Tây Hồ" ||
          details.formatted_address.split(",")[i].trim() == "Đống Đa" ||
          details.formatted_address.split(",")[i].trim() == "Ba Đình" ||
          details.formatted_address.split(",")[i].trim() == "Cầu Giấy" ||
          details.formatted_address.split(",")[i].trim() == "Long Biên" ||
          details.formatted_address.split(",")[i].trim() == "Từ Liêm"
        ) {
          console.log("data", details.formatted_address.split(",")[i]);
          this.setState({ locate: "noi" });
          if (this.state.router == "nb") {
            this._checkTimeNoi(this.state.timeH);
          } else {
            this._checkTimeNoinb(this.state.timeH);
          }
          break;
        } else {
          if (this.state.router == "nb") {
            this._checkTimeNgoai(this.state.timeH);
          } else {
            this._checkTimeNgoainb(this.state.timeH);
          }
          console.log("no data");
          this.setState({ locate: "ngoai" });
          // break;
        }
      }
    }
    return i;
  }
  // onPress() {
  //   console.log("map")
  //   RNGooglePlacePicker.show((response) => {
  //     if (response.didCancel) {
  //       console.log("User cancelled GooglePlacePicker");
  //     }
  //     else if (response.error) {
  //       console.log("GooglePlacePicker Error: ", response.error);
  //     }
  //     else {
  //       this.setState({
  //         location: response
  //       });
  //     }
  //   });
  // }

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
