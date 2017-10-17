const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

export default {
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor:"white"
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    height: deviceHeight / 4,
    alignSelf: "center"
  },
  form: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
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
  loginBtn: {
    marginTop: 7,
    height: 50
  },
  otherLinksContainer: {
    paddingTop: deviceHeight < 600 ? 5 : Platform.OS === "android" ? 10 : 15,
    flexDirection: "row"
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "red",
    fontSize: Platform.OS === "android" ? 12 : 12
  },
  inputGrp: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 8,
    borderWidth: 0,
    borderColor: "transparent"
  },
  input: {
    paddingLeft: 10,
    color: "#000000"
  },
  skipBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: "#FFF",
    position: "absolute",
    bottom: 15,
    right: 0
  },
  textForm:{
    fontWeight:"900",
    fontSize: 21,
    marginTop: 150,
    color:"gray"
  },
  // loginButton: {
  //   marginTop:"60%",
  //   borderRadius:10,
  //   height: 50,
  //   width: "100%",
  //   backgroundColor: 'aqua',
  //   marginBottom: 10,
  //   // textAlign:"center",
  //   justifyContent:"center",
  //   backgroundColor:"steelblue"
  // },
  textLog:{
    textAlign:"center",
    fontSize:17
  },
  button: {
    marginTop: deviceHeight < 5 ? 5 : Platform.OS === "android" ? 5 : 10,
    // borderRadius:5,
    height: 50,
    width: "100%",
    // backgroundColor: 'aqua',
    marginBottom: "40%",
    // textAlign:"center",
    justifyContent:"center",
    backgroundColor:"#31404B"
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
};
