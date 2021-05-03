import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export const UseAuthListener = () => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);

	const { firebaseApp } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				localStorage.setItem(authUser, JSON.stringify(authUser));
				setUser(authUser);
			} else {
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});

		return () => listener();
	}, []);

	return user;
};
