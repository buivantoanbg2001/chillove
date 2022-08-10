import {SafeAreaView, StyleSheet, Dimensions, Platform} from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import * as Animatable from 'react-native-animatable'

const {height} = Dimensions.get('window')

const SplashScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Animatable.Image
				source={require('../../assets/images/logo.png')}
				style={styles.logo}
				animation="fadeInUp"
				duration={1000}
				useNativeDriver={true}
			/>
			<Animatable.Image
				source={require('../../assets/images/header-logo-contrast.png')}
				style={{width: 100, height: 50, resizeMode: 'contain'}}
				animation="fadeInUp"
				duration={1000}
				useNativeDriver={true}
				delay={150}
			/>
		</SafeAreaView>
	)
}

export default SplashScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.lychee,
		paddingTop: Platform.OS === 'android' ? 30 : 0,
	},
	logo: {
		width: 200,
		height: 150,
		resizeMode: 'contain',
		marginTop: height * 0.3,
	},
})
