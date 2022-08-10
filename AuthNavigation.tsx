import React, {useState, useEffect} from 'react'
import {SignedInStack, SignedOutStack, SplashStack} from './navigation'
import {auth, onAuthStateChanged} from './src/firebase/firebase-config'

const AuthNavigation = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const [firstOpenApp, setFirstOpenApp] = useState(true)

	const userHandler = (user: any) => (user ? setCurrentUser(user) : setCurrentUser(null))

	useEffect(() => {
		onAuthStateChanged(auth, user => userHandler(user))
		const timeout = setTimeout(() => setFirstOpenApp(false), 2500)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<>{firstOpenApp ? <SplashStack /> : currentUser ? <SignedInStack /> : <SignedOutStack />}</>
	)
}

export default AuthNavigation
