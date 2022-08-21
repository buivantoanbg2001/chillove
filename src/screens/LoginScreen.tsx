import {StyleSheet, Text, View, SafeAreaView, Platform, Dimensions} from 'react-native'
import React, {useState} from 'react'
import Colors from '../utils/Colors'
import {Button, CustomText, CustomTextInput} from '../utils/CustomComponents'
import {auth, signInWithEmailAndPassword} from '../firebase/firebase-config'
import * as Animatable from 'react-native-animatable'

const {height} = Dimensions.get('window')

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
			<Animatable.Image
				source={{
					uri: 'https://i.imgur.com/obASxu0.jpg',
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
			<View>
				<Button solid title="GO" onPress={onLogin} style={{padding: 12}} />
			</View>
		</SafeAreaView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 30 : 0,
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
