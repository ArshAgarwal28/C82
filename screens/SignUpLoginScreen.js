import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignUpLoginScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: 'acct2@gmail.com',
			password: 'acct1234',
			confirmPassword: '',
			isModalVisible: false,
			firstName: '',
			lastName: '',
			address: '',
		};
	}

	signIn = async () => {
		var response = await firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password);
		if (response) {
			this.setState({
				isModalVisible: false,
			});
			// alert('Sign In Successful!');
			this.props.navigation.navigate('Drawer');
		} else {
			alert('Incorrect Email ID or Password!');
		}
	};

	signUp = async () => {
		if (this.state.password === this.state.confirmPassword) {
			var response = await firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password);
			if (response) {
				db.collection('users')
					.add({
						emailId: this.state.emailId,
						password: this.state.password,
						confirmPassword: this.state.confirmPassword,
						firstName: this.state.firstName,
						lastName: this.state.lastName,
						address: this.state.address,
						myBarters: [],
					})
					.then(() => {
						this.signIn();
					});
				alert('Account Made!');
			} else {
				alert('Error Occured');
			}
		} else {
			alert('Password do not match! \nPlease check again!');
		}
	};

	showModal = () => {
		return (
			<View>
				<Modal
					animationType='glide'
					visible={this.state.isModalVisible}
					transparent={false}
					style={{ alignSelf: 'center' }}>
					<TextInput
						placeholder='First Name...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								firstName: text,
							});
						}}
						value={this.state.firstName}
					/>

					<TextInput
						placeholder='Last Name...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								lastName: text,
							});
						}}
						value={this.state.lastName}
					/>

					<TextInput
						placeholder='Address...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								address: text,
							});
						}}
						value={this.state.address}
					/>

					<TextInput
						placeholder='Email ID...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								emailId: text,
							});
						}}
						value={this.state.emailId}
					/>

					<TextInput
						secureTextEntry={true}
						placeholder='Password...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								password: text,
							});
						}}
						value={this.state.password}
					/>

					<TextInput
						secureTextEntry={true}
						placeholder='Confirm Password...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								confirmPassword: text,
							});
						}}
						value={this.state.confirmPassword}
					/>

					<View style={styles.ButtonRow}>
						<TouchableOpacity
							style={styles.SubmitButton}
							onPress={() => {
								this.signUp();
							}}>
							<Text>Submit</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.SubmitButton}
							onPress={() => {
								this.setState({
									isModalVisible: 'false',
								});
							}}>
							<Text>Cancel</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	};
	render() {
		return (
			<View>
				{this.showModal()}
				<TextInput
					style={styles.UserInput}
					placeholder='Email ID...'
					onChangeText={(text) => {
						this.setState({
							emailId: text,
						});
					}}
					value={this.state.emailId}
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.UserInput}
					placeholder='Password...'
					onChangeText={(text) => {
						this.setState({
							password: text,
						});
					}}
					value={this.state.password}
				/>

				<View style={styles.ButtonRow}>
					<TouchableOpacity
						style={styles.SubmitButton}
						onPress={() => {
							this.signIn();
						}}>
						<Text> Login </Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.SubmitButton}
						onPress={() => {
							this.setState({
								isModalVisible: true,
							});
						}}>
						<Text> Sign Up </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	UserInput: {
		borderWidth: 2,
		textAlign: 'center',
		alignSelf: 'center',
		width: 200,
		padding: 5,
		margin: 5,
	},
	inputForm: {
		borderWidth: 2,
		alignSelf: 'center',
		textAlign: 'center',
		margin: 5,
		width: 250,
		height: 35,
	},
	SubmitButton: {
		borderWidth: 2,
		backgroundColor: 'aqua',
		padding: 5,
		alignItems: 'center',
		width: 75,
		margin: 20,
		// marginLeft: 35,
	},
	ButtonRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
