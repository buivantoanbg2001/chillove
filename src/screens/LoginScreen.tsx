import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native'
import React, {useState} from 'react'
import Colors from '../utils/Colors'
import {Button, CustomTextInput} from '../utils/CustomComponents'
import {auth, signInWithEmailAndPassword} from '../firebase/firebase-config'

type Props = {}

const LoginScreen = (props: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onLogin = async () => {
		await signInWithEmailAndPassword(auth, email, password)
			.then(() => console.log('Firebase login successful:', email, password))
			.catch(error => {
				console.log('Failed to login', error)
			})
	}

	return (
		<SafeAreaView style={styles.container}>
			<CustomTextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
			<CustomTextInput
				placeholder="Password"
				value={password}
				onChangeText={text => setPassword(text)}
			/>
			<View>
				<Button solid title="GO" onPress={onLogin} style={{padding: 12}} />
			</View>
		</SafeAreaView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.grape_fruit_blur,
		flex: 1,
		justifyContent: 'center',
		// marginTop: Platform.OS === 'android' ? 30 : 0,
	},
})
