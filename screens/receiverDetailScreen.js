import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentId: firebase.auth().currentUser.email, //Donor Email ID
			username: '',
			receiverId: this.props.navigation.getParam('details')['userId'], //Requester Email ID
			requestId: this.props.navigation.getParam('details')['request_id'],
			itemName: this.props.navigation.getParam('details')['itemName'],
			itemInfo: this.props.navigation.getParam('details')['itemInfo'],
			item: this.props.navigation.getParam('details'),
			receiverName: '',
			receiverAddress: '',
			receiverRequestDocid: '',
		};
	}

	componentDidMount() {
		this.getReceiverdetails();
	}

	getReceiverdetails = async () => {
		console.log(this.state.item);
		//Get Receiver Details
		await db
			.collection('users')
			.where('emailId', '==', this.state.receiverId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						receiverName: doc.data().firstName,
						receiverAddress: doc.data().address,
					});
				});
			});

		//Get Current User Details
		await db
			.collection('users')
			.where('emailId', '==', this.state.currentId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						username: doc.data().firstName,
					});
				});
			});

		//Get Document ID for the Request
		await db
			.collection('requested_books')
			.where('request_id', '==', this.state.requestId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						receiverRequestDocid: doc.id,
					});
				});
			});
	};

	addNotification = () => {
		//Creates a message that will show in the notifications
		var message = this.state.username + ' has shown interest in donating your requested book.';

		//Adds the details of the donation to the database
		db.collection('all_notifications').add({
			targetcurrentId: this.state.receiverId,
			donorID: this.state.currentId,
			requestId: this.state.requestId,
			itemName: this.state.itemName,
			date: firebase.firestore.FieldValue.serverTimestamp(),
			notification_status: 'unread',
			message: message,
		});
	};

	addBarter = async () => {
		var currentId = firebase.auth().currentUser.email;
		var item = this.state.item;
		var docId; //ID for the current user document
		var requestorData; //Variable to get all the information about the requestor
		var allDonations = []; //Array of all the donations the current user has made

		//Adds the details of the barter
		await db
			.collection('users')
			.where('emailId', '==', currentId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					docId = doc.id;
					allDonations = doc.data().myBarters;
				});
			});

		await db
			.collection('users')
			.where('emailId', '==', this.state.receiverId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					requestorData = doc.data();
				});
			});

		allDonations.push({
			itemName: item.itemName,
			itemId: item.request_id,
			requestorAddress: requestorData.address,
			requestorFirstName: requestorData.firstName,
			requestorID: requestorData.emailId,
		});

		db.collection('users').doc(docId).update({
			myBarters: allDonations,
		});

		alert('Thank you for your donation!');
	};
	render() {
		return (
			<View>
				<Card title={'Item Information'} titleStyle={{ fontSize: 20 }}>
					<Card>
						<Text style={{ fontWeight: 'bold' }}>Name: {this.state.itemName}</Text>
					</Card>

					<Card>
						<Text style={{ fontWeight: 'bold' }}>Reason: {this.state.itemInfo}</Text>
					</Card>
				</Card>

				<View style={{ flex: 0.3 }}>
					<Card title={'Receiver Information'} titleStyle={{ fontSize: 20 }}>
						<Card>
							<Text style={{ fontWeight: 'bold' }}>Name: {this.state.receiverName}</Text>
						</Card>

						<Card>
							<Text style={{ fontWeight: 'bold' }}>Address: {this.state.receiverAddress}</Text>
						</Card>
					</Card>
				</View>

				<View>
					{this.state.receiverId !== this.state.currentId ? (
						<TouchableOpacity
							style={styles.buttonStyle}
							onPress={() => {
								this.addNotification();
								this.addBarter();
								this.props.navigation.navigate('MyDonation');
							}}>
							<Text style={styles.textStyle}>Confirm</Text>
						</TouchableOpacity> //Confirm Donation from Donor
					) : null}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: 'aqua',
		borderWidth: 1,
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		marginTop: 15,
		width: 150,
		height: 30,
	},

	textStyle: {
		fontWeight: 'bold',
		color: 'black',
	},
});
