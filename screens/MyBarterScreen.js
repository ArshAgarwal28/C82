import * as React from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';

import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class MyBarterScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentId: firebase.auth().currentUser.email,
			myBarters: [],
		};
	}

	getAllBarters = async () => {
		console.log(this.state.currentId);
		await db
			.collection('users')
			.where('emailId', '==', this.state.currentId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var data = doc.data();
					console.log(data.myBarters);
					this.setState({
						myBarters: [...data.myBarters],
					});
				});
			});
	};

	componentDidMount() {
		this.getAllBarters();
		console.log(this.state.myBarters);
	}

	renderItem = ({ item, i }) => {
		return (
			<ListItem
				bottomDivider
				key={i}
				title={item.itemName}
				subtitle={item.requestorFirstName + ' | ' + item.requestorAddress}
				titleStyle={{ color: 'black', fontWeight: 'bold' }}>
				<TouchableOpacity style={{ backgroundColor: '#f59a07', borderWidth: 1, padding: 4, paddingHorizontal: 2 }}>
					<Text style={{ fontWeight: 'bold', color: 'white' }}>Exchange</Text>
				</TouchableOpacity>
			</ListItem>
		);
	};

	keyExtractor = (item, index) => index.toString();

	render() {
		return (
			<View>
				<FlatList data={this.state.myBarters} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
			</View>
		);
	}
}
