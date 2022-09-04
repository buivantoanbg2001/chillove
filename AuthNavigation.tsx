import React, {useState, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {SignedInStack, SignedOutStack, SplashStack} from './navigation'
import {auth, onAuthStateChanged} from './src/firebase/firebase-config'
import {useAppSelector} from './src/hooks/redux.hook'
import Toast from './src/utils/Toast'
import {ToastType} from './src/models/toast.model'
import useToast from './src/hooks/useToast.hook'

const AuthNavigation = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const [firstOpenApp, setFirstOpenApp] = useState(true)
	const toasts: ToastType[] = useAppSelector(state => state.toastsReducer)
	const {removeToast} = useToast()
	const userHandler = (user: any) => (user ? setCurrentUser(user) : setCurrentUser(null))

	useEffect(() => {
		onAuthStateChanged(auth, user => userHandler(user))
		const timeout = setTimeout(() => setFirstOpenApp(false), 2500)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<>
			{firstOpenApp ? <SplashStack /> : currentUser ? <SignedInStack /> : <SignedOutStack />}
			<View style={styles.wrapperToast}>
				{toasts.map((toast, index) => (
					<Toast
						key={toast.id}
						message={toast.message}
						onClose={() => removeToast(toast)}
						{...toast.type}
					/>
				))}
			</View>
		</>
	)
}

export default AuthNavigation

const styles = StyleSheet.create({
	wrapperToast: {
		alignSelf: 'center',
		position: 'absolute',
		bottom: 48,
		left: 24,
		right: 24,
	},
})
