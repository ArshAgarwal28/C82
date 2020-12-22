import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: firebase.auth().currentUser.email,
			itemName: '',
			itemInfo: '',
		};
	}

	createUniqueID() {
		return Math.random().toString(36).substring(7);
	}

	addRequest = () => {
		var userId = this.state.userId;
		var randomRequestId = this.createUniqueID();

		db.collection('requested_items').add({
			itemName: this.state.itemName,
			userId: this.state.userId,
			request_id: randomRequestId,
			itemInfo: this.state.itemInfo,
		});
	};

	render() {
		return (
			<View>
				<TextInput
					placeholder='Item Name...'
					style={styles.inputForm}
					onChangeText={(text) => {
						this.setState({
							itemName: text,
						});
					}}
					value={this.state.itemName}
				/>

				<TextInput
					placeholder='Reason for your Item...'
					style={styles.inputForm}
					onChangeText={(text) => {
						this.setState({
							itemInfo: text,
						});
					}}
					multiline
					value={this.state.itemInfo}
				/>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => {
						this.addRequest();
					}}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputForm: {
		borderWidth: 2,
		alignSelf: 'center',
		alignContent: 'center',
		textAlign: 'center',
		margin: 5,
		width: 250,
		height: 35,
	},

	submitButton: {
		borderWidth: 2,
		backgroundColor: 'aqua',
		marginTop: 10,
		padding: 5,
		alignSelf: 'center',
		alignItems: 'center',
		width: 75,
		// marginLeft: 35,
	},
});
