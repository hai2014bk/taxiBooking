const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  profileInfoContainer: {
    backgroundColor: primary,
    paddingTop: 10
  },
  profileUser: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 5
  },
  profileUserInfo: {
    alignSelf: "center",
    opacity: 0.8,
    fontWeight: "bold",
    color: "#FFF"
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  profileInfo: {
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 10
  },
  linkTabs: {
    backgroundColor: "#fff"
  },
  linkTabs_header: {
    padding: 15,
    alignSelf: "center"
  },
  linkTabs_tabCounts: {
    fontSize: 22,
    fontWeight: "bold",
    color: primary,
    alignSelf: "center",
    paddingBottom: Platform.OS === "android" ? 3 : 0
  },
  linkTabs_tabName: {
    color: "#444",
    fontWeight: "bold",
    fontSize: deviceWidth < 330 ? 13 : 15
  },
  newsImage: {
    width: 100,
    height: 120
  },
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
    color: "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5
  },
  textNote: {
    color: "#777",
    fontSize: 12
  },
  swipeBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontSize: 16,
    marginLeft: 5
  },
  viewNodata: {
    flex: 1,
    height: deviceHeight - 50,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  start: {
    flex: 12,
    marginLeft:-10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  startView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5
  },
  iconview: {
    flex: 1,
    marginLeft:20,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  dot: {
    color: "#31404B",
    fontSize: 25
  },
  image: {
    height: 10,
    width: 10
  },
  textStart: {
    marginLeft: 3
  },
  icon: {
    color: "#31404B",
    fontSize: 17
  },
  textNor: {
    color: "#31404B",
    fontSize: 16,
    marginLeft:10
  },
  gradient: {
    width: deviceWidth,
    height: 40,
  },
  timeview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
};
