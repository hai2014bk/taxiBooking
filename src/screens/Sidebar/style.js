const React = require("react-native");

const { Platform } = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  links: {
    paddingTop: Platform.OS === "android" ? 8 : 10,
    paddingBottom: Platform.OS === "android" ? 8 : 10,
    paddingLeft: Platform.OS === "android" ? 0 : 10,
    borderBottomWidth: Platform.OS === "android" ? 0 : 0,
    borderBottomColor: "transparent"
  },
  linkText: {
    paddingLeft: 15
  },
  logoutContainer: {
    padding: 30,
    paddingTop: 0
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderTopColor: "#fff"
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#31404B"
  },
  drawerContent: {
    paddingTop: Platform.OS === "android" ? 100 : 110
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: Platform.OS === "android" ? 100 : 50
  }
};
