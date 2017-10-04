import React, { Component } from "react";
import {Platform, Image, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import { Container, Content, Text, Icon, ListItem, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";


import styles from "./style";
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});

class TouchAble extends Component {

	constructor(props) {
		super(props);
		this.state = {
			disabled:false,
		};
	}
	onPressFuntion(){
		this.setState({disabled:true})
		setTimeout(()=>{
			this.setState({disabled:false})
		},500)
		this.props.onTouch()
	}
render = () => {
    const { style, children } = this.props;
    return (
      <TouchableOpacity disabled={this.state.disabled} onPress={() =>{this.onPressFuntion()}} style={style}>
       			{children}
      </TouchableOpacity>
    );
  }
}
function bindAction(dispatch) {
	return {
		onPress: (param) => dispatch(onPressFuntion()),
	};
}

export default connect(bindAction)(TouchAble);

