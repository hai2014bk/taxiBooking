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
  containerName: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    height:50,
  },
  containerIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  containerImg: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    width: "100%",
    borderBottomWidth:0.5
  },
  viewtextPhone: {
    flex: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
  },
  containerUserId: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "gray",
  },
  viewName: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    height:100,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  viewContent: {
    flex: 1,
    flexDirection: "column",
    height: 200,
    width: deviceWidth,
    // marginTop:50,
    // marginBottom:50,
  },
  name: {
    flex: 8,
    flexDirection: "column",
  },
  userId: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  Id: {
    flex: 8,
    justifyContent: "center",
    alignItems: "flex-end"
  }
};
