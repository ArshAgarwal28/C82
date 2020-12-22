import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
	apiKey: 'AIzaSyCCLy0LMzw0JBoHgMYHjDxbmllETFjmSCM',
	authDomain: 'barterapp-131b9.firebaseapp.com',
	databaseURL: 'https://barterapp-131b9.firebaseio.com',
	projectId: 'barterapp-131b9',
	storageBucket: 'barterapp-131b9.appspot.com',
	messagingSenderId: '491004890279',
	appId: '1:491004890279:web:740bae6938a395058d9f82',
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
