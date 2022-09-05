import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from '../utils/CustomComponents'
import {auth, signOut} from '../firebase/firebase-config'

const SettingsTab = () => {
	const handleSignout = async () =>
		await signOut(auth)
			.then(() => console.log('Signed out successfully'))
			.catch(error => console.log(error))

	return (
		<View style={styles.container}>
			<Button
				type="solid"
				title="Sign out"
				onPress={handleSignout}
				style={{width: '60%', alignSelf: 'center'}}
			/>
		</View>
	)
}

export default SettingsTab

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
	},
})
