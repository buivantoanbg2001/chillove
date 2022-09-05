import {
	StyleSheet,
	View,
	Keyboard,
	SafeAreaView,
	Platform,
	Dimensions,
	ScrollView,
} from 'react-native'
import React, {useState} from 'react'
import {Button, CustomText, CustomTextInput} from '../utils/CustomComponents'
import {auth, signInWithEmailAndPassword} from '../firebase/firebase-config'
import * as Animatable from 'react-native-animatable'

const {height} = Dimensions.get('window')

const LoginScreen = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onLogin = async () => {
		Keyboard.dismiss()

		await signInWithEmailAndPassword(auth, email, password)
			.then(() => console.log('Firebase login successful:', email, password))
			.catch(error => {
				console.log('Failed to login', error)
			})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Animatable.Image
				source={{
					uri: 'https://firebasestorage.googleapis.com/v0/b/chillove.appspot.com/o/background%2Fbackground.jpg?alt=media&token=b275b8a1-b713-4ac3-a53e-df6383946c01',
				}}
				style={StyleSheet.absoluteFillObject}
				blurRadius={50}
				animation="rotate"
				iterationCount="infinite"
				easing={'linear'}
				duration={60000}
				useNativeDriver={true}
				resizeMode={'cover'}
			/>

			<ScrollView keyboardShouldPersistTaps={'handled'}>
				<CustomText style={styles.title}>Login</CustomText>
				<CustomTextInput
					style={styles.textInput}
					placeholder="Email"
					value={email}
					onChangeText={text => setEmail(text)}
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
				/>
				<CustomTextInput
					style={styles.textInput}
					placeholder="Password"
					value={password}
					onChangeText={text => setPassword(text)}
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={true}
					textContentType="password"
				/>
				<View style={{alignItems: 'center'}}>
					<Button
						type="solid"
						title="GO"
						onPress={onLogin}
						style={{width: '70%', borderRadius: 50, marginTop: 15}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 30 : 0,
		justifyContent: 'center',
	},
	title: {
		fontSize: 32,
		fontFamily: 'Montserrat-600',
		alignSelf: 'center',
		marginTop: height * 0.3,
		marginBottom: 20,
	},
	textInput: {
		marginBottom: 8,
		marginHorizontal: 24,
	},
})
