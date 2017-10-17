// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView } from "react-native";

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

import styles from "./styles";
const back = require("../../Icon/PNG/Back.png");
const dot = require("./dot.png");
const gradient = require("./gradient.png");
var dataArray = [];

class historyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "An",
      dataArray: "",
      lastName: "Nguyễn Hoàng",
      phoneNumber: "012364535345",
      email: "annguyenhoang@gmail.com",
      userId: "1234567",
      avartar: "http://www.novelupdates.com/img/noimagefound.jpg"
    };
  }

  async componentDidMount() {
    await this.props.history();
  }

  componentWillReceiveProps(props) {
    if (props.items[0]) {
      this.setState({ dataArray: props.items });
      console.log("items", props.items);
      dataArray = props.items;
    } else {
      console.log("nodata");
    }
  }

  render() {
    const navigation = this.props.navigation;
    if (!this.state.dataArray) {
      return (
        <Container>
          {this._header(navigation)}
          <Content style={{ backgroundColor: "#fff" }}>
            {this._renderNodata()}
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          {this._header(navigation)}
          <Content style={{ backgroundColor: "#ffffff", marginBottom:-15}}>
          <Image source={gradient} style={styles.gradient} resizeMode="cover" />
            <List
              dataArray={this.state.dataArray}
              renderRow={this._renderrow.bind(this)}
            />
          </Content>
        </Container>
      );
    }
  }

  _header(navigation) {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left style={{ flex: 2 }}>
          <Button transparent onPress={() => navigation.navigate("bookCar")}>
            <Image source={back} style={{width:30,height:30}} resizeMode="contain" />
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
  _renderrow(item) {
    var priceshow = item.price.toString().split(".")[0];
    // console.log("priceshow",priceshow)
    var date = new Date(item.start_time);
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
    var time = hourValue + ":" + minuteValue;
    var dateshow =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    var price = item.price.toString();
    console.log(price);
    return (
      <ListItem style={{borderColor:"white", marginLeft:0}}>
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
              <Text style={{ color: "#31404B", fontSize: 16, marginLeft:10 }}>
                {time} {dateshow}
              </Text>
            </View>
            <View style={styles.timeView}>
              <Text style={{ color: "#31404B", fontSize: 16 }}>
                {priceshow} VNĐ
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
          <View style={styles.startView}>
            <Text style={styles.textNor}>
              Tài xế: {item.taixe}
            </Text>
          </View>
          <Image
                source={gradient}
                style={styles.gradient}
                resizeMode="cover"
              />
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
