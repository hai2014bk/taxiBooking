const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  newsContent: {
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  newsHeader: {
    color: "#444",
    fontWeight: "bold"
  },
  newsLink: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: Platform.OS === "android" ? "#777" : "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  newsPoster: {
    height: 330,
    width: null,
    resizeMode: "cover",
    flex: 1,
    position: "relative"
  },
  newsPosterHeader: {
    fontWeight: "900"
  },
  newsPosterLink: {
    opacity: 0.8,
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsPosterTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignSelf: "flex-end"
  },
  newsPosterTypeText: {
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -3,
    color: "#666"
  },
  timePosterIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 20 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -2,
    color: "#fff"
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    height: 330,
    backgroundColor: "transparent"
  },
  swiperTextContent: {
    position: "absolute",
    bottom: -5,
    padding: 20
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.8)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  swiperActiveDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  swiperContentBox: {
    paddingTop: 20,
    paddingBottom: 20
  },
  container: {
    flex: 1,
    width: null,
    height: null
  },
  logoHeader: {
    width: 20,
    height: 28,
    alignSelf: "center"
  },
  text: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15
  },
  header: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  rowHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: Platform.OS === "android" ? 0 : 0
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  chooseBtn: {
    flex: 1,
    justifyContent: "center",
    height: 25,
    marginBottom: 10
  },
  viewBtn: {
    flex: 1,
    flexDirection: "row"
  },
  containerCartype: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomWidth:0.5,
  },
  cartype: {
    width: "25%",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    backgroundColor: "green",
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  locationPick0: {
    flex: 1,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#31404B"
  },
  locationPick: {
    flex: 1.5,
    height: 120,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  locationPick1: {
    flex: 8.5,
    height: 110,
    flexDirection: "column",
    alignItems: "center"
  },
  locationPick2: {
    flex: 4,
    width: "100%",
    borderBottomWidth: 0.5,
    marginRight:10,
  },
  textNor: {
    color: "#31404B",
    fontSize: 15,
    marginTop: 2,
    marginBottom: 2
  },
  viewCartype: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#31404B",
    // height:100
  },
  containerTimePicker: {
    flex: 1,
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#31404B"
  },
  TimePicker: {
    width: "30%",
    height: 35,
    alignItems: "flex-start",
    marginLeft: 10,
    justifyContent: "center"
  },
  switchZone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  containerRouterSelect: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: "#31404B"
  },
  touchLocation: {
    width: "100%",
    height: "100%"
  },
  textLocation: {
    flex: 1,
    height: "30%",
    width: "100%",
    marginBottom: "5%"
  },
  inputLocation: {
    flex: 3,
    width: "100%",
    height: "60%"
  },
  inputText: {
    height: 50,
    paddingBottom: 0,
    paddingTop: 0,
    color: "#31404B"
  },
  touchTimepicker: {
    width: "40%",
    height: 30,
    alignItems:"flex-end",
    justifyContent:"center"
  },
  textTime: {
    fontSize: 15
  },
  textNote: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  noteContainer:{
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#31404B"
  },
  textPrice: {
    marginBottom: 5,
    fontSize: 25,
    marginLeft:10,
    color:"orange"
  }
};
