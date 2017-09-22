const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  signupContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:
      deviceWidth < 330
        ? Platform.OS === "android"
          ? deviceHeight / 22 - 20
          : deviceHeight / 21 - 20
        : Platform.OS === "android"
          ? deviceHeight / 20 - 20
          : deviceHeight / 19 - 20
  },

  signupHeader: {
    alignSelf: "center",
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
    color:"steelblue"
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary
  },
  formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
  inputGrp: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    borderWidth: 0,
    borderColor: "transparent"
  },
  input: {
    paddingLeft: 10,
    color: "#000000"
  },
  signupBtn: {
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor:"steelblue",
    marginBottom: Platform.OS === "android" ? deviceHeight / 20 : deviceHeight / 20 + 10,
  },
  otherLinkText: {
    alignSelf: "center",
    opacity: 0.8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#EFF"
  },
  otherLinksContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF"
  }
};
