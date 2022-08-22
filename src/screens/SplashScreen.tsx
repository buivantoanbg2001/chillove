import {SafeAreaView, StyleSheet, Dimensions, Platform} from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import * as Animatable from 'react-native-animatable'

const {height} = Dimensions.get('window')

const SplashScreen = () => {
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
			<Animatable.Image
				source={require('../../assets/images/logo.png')}
				style={styles.logo}
				animation="fadeInUp"
				duration={1000}
				useNativeDriver={true}
			/>
			<Animatable.Image
				source={require('../../assets/images/header-logo.png')}
				style={{width: 130, height: 65, resizeMode: 'contain'}}
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
		paddingTop: Platform.OS === 'android' ? 30 : 0,
	},
	logo: {
		width: 200,
		height: 150,
		resizeMode: 'contain',
		marginTop: height * 0.3,
	},
})
