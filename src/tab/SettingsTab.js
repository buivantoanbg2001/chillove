import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from '../utils/CustomComponents'
import {auth, signOut} from '../firebase/firebase-config'
import Icon, {Icons} from '../utils/Icons'

const SettingsTab = () => {
	const handleSignout = async () =>
		await signOut(auth)
			.then(() => console.log('Signed out successfully'))
			.catch(error => console.log(error))

	return (
		<View style={styles.container}>
			<Text>SettingsTab</Text>
			<Button solid title="Sign out" onPress={handleSignout} />
		</View>
	)
}

export default SettingsTab

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
	},
})
