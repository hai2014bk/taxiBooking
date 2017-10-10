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
  Modal
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
  Spinner,
  Item,
  Label,
  Input,
  Switch
} from "native-base";

import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import { itemsFetchData } from "../../actions";
import datas from "./data.json";
import * as mConstants from "../../utils/Constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import LocationPicker from "../LocationPicker";
const setting = require("../../Icon/PNG/settings.png");
const car4Y = require("../../Icon/PNG/Car/cho4Atv.png");
const car7Y = require("../../Icon/PNG/Car/cho7Atv.png");
const car16Y = require("../../Icon/PNG/Car/cho16Atv.png");
const car4W = require("../../Icon/PNG/Car/cho4Dis.png");
const car7W = require("../../Icon/PNG/Car/cho7Dis.png");
const car16W = require("../../Icon/PNG/Car/cho16Dis.png");
const icon = require("./icon.jpg");
import styles from "./styles";
const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");
var lat = 21.2187149;
var lng = 105.8041709;
var name = "Cảng hàng không quốc tế Nội Bài";
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
      stop: "",
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
      price: 0
    };
  }
  componentDidMount() {
    // AsyncStorage.removeItem(mConstants.LOGIN_INFO);
    this.props.fetchData(datas);
  }

  render() {
    var date = new Date();
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Image source={setting} />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
              ĐẶT XE
            </Text>
          </Body>
          <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={{ borderBottomWidth: 0.5, marginTop: 10 }}>
            <Text note style={styles.text}>
              Chọn tuyến
            </Text>
            <View
              style={{ marginLeft: 10, marginRight: 10, flexDirection: "row" }}
            >
              <Button
                bordered
                info
                style={[
                  styles.chooseBtn,
                  { backgroundColor: this.state.selectedTab1 }
                ]}
                onPress={() => this._haNoi()}
              >
                <Text style={{ color: this.state.textColor1 }}>
                  Nội Bài -> Hà Nội
                </Text>
              </Button>
              <Button
                bordered
                info
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
              flex: 1,
              borderBottomWidth: 0.5,
              marginTop: 5,
              height: 120
            }}
          >
            {this._pickLocation()}
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text note style={styles.text}>
              Loại Xe
            </Text>
            {this._cartype()}
          </View>
          {this._timePicker()}
          {this._roundTrip()}
          {this._note()}
          {this._price()}
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
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button full style={{ backgroundColor: "#2E3B45" }}>
              <Text>Đặt ngay</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  _timePicker() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5
        }}
      >
        <View
          style={{
            width: "30%",
            height: 30,
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: 10
          }}
        >
          <Text note>Thời gian</Text>
        </View>
        <View style={{ width: "30%", height: 30 }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10
            }}
            onPress={() => this.setState({ openTimePicker: true })}
          >
            <Text style={styles.textNor}>Bây giờ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  hideTimePicker() {
    this.setState({ openTimePicker: false });
  }

  handleDatePicked(date) {
    console.log(
      "month",
      date.getMonth(),
      date,
      "year",
      date.getFullYear().toString(),
      "day",
      date.getDate().toString()
    );
    this.setState({
      validateWorkingTime: false,
      time: date.getHours() + ":" + date.getMinutes(),
      date:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
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
    this.hideTimePicker();
  }

  _roundTrip() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5
        }}
      >
        <View
          style={{
            width: "30%",
            height: 30,
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: 10
          }}
        >
          <Text style={{ color: "#31404B" }}>Khứ hồi</Text>
        </View>
        <View style={{ width: "30%", height: 30 }}>
          <View style={styles.switchZone}>
            <Switch
              value={this.state.roundTrip}
              onValueChange={val => this._upDate(val)}
              disabled={false}
              onTintColor="#31404B"
              thumbTintColor="#ffffff"
            />
          </View>
        </View>
      </View>
    );
  }
  _note() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderBottomWidth: 0.5,
          height: 60
        }}
      >
        <View style={{ marginTop: 5, height: "30%", marginLeft: 10 }}>
          <Text note> Ghi chú</Text>
        </View>
        <View style={{ marginTop: 5, height: "70%", marginLeft: 10 }}>
          <Input
            placeholder="Nhập ghi chú..."
            placeholderTextColor="#31404B"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            editable={true}
            value={this.state.note}
          />
        </View>
      </View>
    );
  }

  _price() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderBottomWidth: 0.5,
          height: 60,
          marginTop: 5
        }}
      >
        <View style={{ marginTop: 5, height: "30%", marginLeft: 10 }}>
          <Text note> Ghi chú</Text>
        </View>
        <View style={{ marginTop: 5, height: "70%", marginLeft: 10 }}>
          <Text style={{ color: "orange", fontSize: 30, marginLeft: 10 }}>
            {this.state.price} VNĐ
          </Text>
        </View>
      </View>
    );
  }

  _upDate(val) {
    if (val) {
      this.setState({
        roundTrip: true
      });
    } else {
      this.setState({
        roundTrip: false
      });
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
      stop: "",
      startLat: lat,
      startLng: lng,
      close: false
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
      start: "",
      stop: name,
      stopLat: lat,
      stopLng: lng,
      open: false
    });
  }

  _color4 = () => {
    this.setState({
      car4: car4Y,
      car7: car7W,
      car16: car16W,
      car_type_id: 1
    });
  };

  _color7 = () => {
    this.setState({ car4: car4W, car7: car7Y, car16: car16W, car_type_id: 3 });
  };
  _color16 = () => {
    this.setState({ car4: car4W, car7: car7W, car16: car16Y, car_type_id: 2 });
  };

  _cartype() {
    return (
      <View style={styles.containerCartype}>
        <TouchableOpacity onPress={() => this._color4()} style={styles.cartype}>
          <Image source={this.state.car4} />
          <Text style={{ color: this.state.color4 }}>5 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._color7()} style={styles.cartype}>
          <Image source={this.state.car7} />
          <Text style={{ color: this.state.color7 }}>7 Chỗ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._color16()}
          style={styles.cartype}
        >
          <Image source={this.state.car16} />
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
                details.geometry.location.lat == this.state.stopLat &&
                details.geometry.location.lng == this.state.stopLng
              ) {
                this._haNoi();
              } else {
                this._checklocation(details)
                console.log(data, details);
                this.setState({
                  start: data.description,
                  startLat: details.geometry.location.lat,
                  startLng: details.geometry.location.lng,
                  close: false
                });
              }
            }}
            query={{
              key: "AIzaSyC42xdMVQZ0xmoe5fhfaRUwmYHUvpfEyk8",
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
                details.geometry.location.lat == this.state.startLat &&
                details.geometry.location.lng == this.state.startLng
              ) {
                this._noiBai();
              } else {
                console.log(data, details);
                this.setState({
                  stop: data.description,
                  stopLat: details.geometry.location.lat,
                  stopLng: details.geometry.location.lng,
                  open: false
                });
              }
            }}
            query={{
              key: "AIzaSyC42xdMVQZ0xmoe5fhfaRUwmYHUvpfEyk8",
              language: "vi"
            }}
          />
        </View>
      </Container>
    );
  }

  _checklocation(details){
  }

  _pickLocation() {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View
          style={{ flexDirection: "row", flex: 1, width: "100%", height: 120 }}
        >
          <View
            style={{
              flex: 1,
              height: 110,
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={icon} style={{ height: 110 }} resizeMode="contain" />
          </View>
          <View style={{ flex: 10, height: 110, flexDirection: "column" }}>
            <View
              style={{ width: "100%", height: "50%", borderBottomWidth: 0.5 }}
            >
              <TouchableOpacity
                disabled={this.state.disabledstart}
                onPress={() => this.setState({ close: true })}
              >
                <View style={{ width: "100%", height: "20%" }}>
                  <Text note> Điểm đón</Text>
                </View>
                <View style={{ width: "100%", height: "80%" }}>
                  <Input
                    style={{ padding: 0 }}
                    placeholder="Chọn điểm xuất phát"
                    placeholderTextColor="#31404B"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    editable={false}
                    value={this.state.start}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "50%" }}>
              <TouchableOpacity
                disabled={this.state.disabledstop}
                onPress={() => this.setState({ open: true })}
              >
                <View style={{ width: "100%", height: "20%" }}>
                  <Text note> Điểm đến</Text>
                </View>
                <View style={{ width: "100%", height: "80%" }}>
                  <Input
                    style={{ padding: 0 }}
                    placeholder="Chọn điểm đến"
                    placeholderTextColor="#31404B"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    editable={false}
                    value={this.state.stop}
                  />
                </View>
              </TouchableOpacity>
            </View>
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
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(bookCarForm);
