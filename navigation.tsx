import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import MainScreen from './src/screens/MainScreen'
import NewPostScreen from './src/screens/NewPostScreen'
import SplashScreen from './src/screens/SplashScreen'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'

const Stack = createStackNavigator()

const SignedInStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="MainScreen"
			screenOptions={{
				headerShown: false,
				...TransitionPresets.FadeFromBottomAndroid,
			}}>
			<Stack.Screen name="MainScreen" component={MainScreen} />
			<Stack.Screen name="NewPostScreen" component={NewPostScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

const SignedOutStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{
				headerShown: false,
				...TransitionPresets.FadeFromBottomAndroid,
			}}>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

const SplashStack = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="SplashScreen"
			screenOptions={{
				headerShown: false,
				...TransitionPresets.FadeFromBottomAndroid,
			}}>
			<Stack.Screen name="SplashScreen" component={SplashScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)

export {SignedInStack, SignedOutStack, SplashStack}
