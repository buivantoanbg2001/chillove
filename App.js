import React, {useEffect} from 'react'
import {Text, View, StatusBar} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import MainScreen from './src/screens/MainScreen'
import NewPostScreen from './src/screens/NewPostScreen'
import {Provider as ReduxProvider} from 'react-redux'
import store from './src/redux/store'

const Stack = createStackNavigator()

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(false)
		StatusBar.setBackgroundColor('transparent')
		StatusBar.setBarStyle('dark-content')
		StatusBar.setTranslucent(true)
	}, [])

	return (
		<ReduxProvider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="MainScreen"
					screenOptions={{
						headerShown: false,
						orientation: 'portrait',
						...TransitionPresets.FadeFromBottomAndroid,
					}}>
					<Stack.Screen name="MainScreen" component={MainScreen} />
					<Stack.Screen name="NewPostScreen" component={NewPostScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ReduxProvider>
	)
}

export default App
