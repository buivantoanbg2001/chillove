import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import 'react-native-gesture-handler'
import AuthNavigation from './AuthNavigation'

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(false)
		StatusBar.setBackgroundColor('transparent')
		StatusBar.setBarStyle('dark-content')
		StatusBar.setTranslucent(true)
	}, [])

	return <AuthNavigation />
}

export default App
