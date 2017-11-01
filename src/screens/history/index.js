// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, BackHandler } from "react-native";
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
  Header,
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Grid, Col } from "react-native-easy-grid";
import CustomHeader from "../../components/CustomHeader";
import { history } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";
const back = require("../../Icon/PNG/Back.png");
const dot = require("./dot.png");
const gradient = require("./gradient.png");
var dataArray = [];
var mainScreen = false;
import { NavigationActions } from "react-navigation";
const backAction = NavigationActions.back({
  key: "bookCar"
});

class historyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      dataArray: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      userId: "",
      avartar: "",
      priceshow: "",
      visible:true,
      disabled:false,
    };
  }

  async componentDidMount() {
    await this.props.history();
  }

  componentWillReceiveProps(props) {
    if (props.items[0]) {
      this.setState({ dataArray: props.items, visible:false });
      console.log("items", props.items);
      dataArray = props.items;
    } else {
      this.setState({
        visible:false });
      console.log("nodata");
    }
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
    const navigation = this.props.navigation;
    if (!this.state.dataArray[0]) {
      return (
        <Container>
          {this._header(navigation)}
          <Content style={{ backgroundColor: "#fff" }}>
            {this._renderNodata()}
          </Content>
          <Spinner visible={this.state.visible} />
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          {this._header(navigation)}
          <Content style={{ backgroundColor: "#ffffff", marginBottom: -15 }}>
            <Image
              source={gradient}
              style={styles.gradient}
              resizeMode="cover"
            />
            <List
              dataArray={this.state.dataArray}
              renderRow={this._renderrow.bind(this)}
            />
          </Content>

          <Spinner visible={this.state.visible} />
        </Container>
      );
    }
  }

  _header(navigation) {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left style={{ flex: 2 }}>
          <Button transparent
          disabled= {this.state.disabled}
          onPress={() => {
            this.setState({disabled:true});
            navigation.navigate("bookCar");
            }}>
            <Image
              source={back}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Button>
        </Left>
        <Body style={{ flex: 6 }}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
            Lịch sử đặt xe
          </Text>
        </Body>
        <Right style={{ flex: 2 }} />
      </Header>
    );
  }

  _renderNodata() {
    return (
      <View style={styles.viewNodata}>
        <Text note> Chưa có lịch sử đặt xe nào </Text>
      </View>
    );
  }
  priceHandle(price) {
    var count = 0;
    price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    this.setState({
      priceshow: price
    });
    console.log("this.state.priceshow", this.state.priceshow);
    // return price
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

  _renderrow(item) {
    var priceshow = item.price.toString().split(".")[0];
    var price = priceshow.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    var date = new Date(item.start_time);
    var time = this._handleNumber(date.getHours()) + ":" + this._handleNumber(date.getMinutes());
    var dateshow =
    this._handleNumber(date.getDate()) + "-" + this._handleNumber((date.getMonth() + 1)) + "-" + date.getFullYear();
    console.log(item.price.split(".")[0]);
    return (
      <ListItem style={{ borderColor: "white", marginLeft: 0 }}>
        <Body>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <Text style={{ color: "#31404B", fontSize: 16, marginLeft: 10 }}>
                {time} {dateshow}
              </Text>
            </View>
            <View style={styles.timeView}>
              <Text style={{ color: "#31404B", fontSize: 16 }}>
                {price} VNĐ
              </Text>
            </View>
          </View>
          <View style={styles.startView}>
            <View style={styles.iconview}>
              <Image source={dot} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.start}>
              <Text note>
                {item.from_text}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.startView}>
            <View style={styles.iconview}>
              <Icon name="ios-pin" style={styles.icon} />
            </View>
            <View style={styles.start}>
              <Text note>
                {item.to_text}{" "}
              </Text>
            </View>
          </View>
          <Image source={gradient} style={styles.gradient} resizeMode="cover" />
        </Body>
      </ListItem>
    );
  }
  _changeAvartar() {
    console.log("press");
  }
}

function bindAction(dispatch) {
  return {
    history: () => dispatch(history())
    // fetchData: url => dispatch(itemsFetchData(url))
  };
}
const mapStateToProps = state => ({
  items: state.historyReducer.items,
  error: state.historyReducer.error
});

const History = reduxForm({
  form: "history"
})(historyForm);
export default connect(mapStateToProps, bindAction)(historyForm);
