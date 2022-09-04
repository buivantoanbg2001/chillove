import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import 'react-native-gesture-handler'
import AuthNavigation from './AuthNavigation'
import {Provider as ReduxProvider} from 'react-redux'
import store from './src/redux/store'

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(false)
		StatusBar.setBackgroundColor('transparent')
		StatusBar.setBarStyle('dark-content')
		StatusBar.setTranslucent(true)
	}, [])

	return (
		<ReduxProvider store={store}>
			<AuthNavigation />
		</ReduxProvider>
	)
}

export default App
