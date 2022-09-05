import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeTab from '../tab/HomeTab'
import SettingsTab from '../tab/SettingsTab'
import LoveTab from '../tab/LoveTab'
import * as Icon from '../utils/Icons'
import Colors from '../utils/Colors'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector} from 'react-redux'

const {width, height} = Dimensions.get('window')

Animatable.initializeRegistryWithDefinitions({
	rotate: {
		0: {transform: [{scale: 1}, {rotate: '0deg'}]},
		0.25: {transform: [{scale: (2 * height) / width}, {rotate: '90deg'}]},
		0.5: {transform: [{scale: 1}, {rotate: '180deg'}]},
		0.75: {transform: [{scale: (2 * height) / width}, {rotate: '270deg'}]},
		1: {transform: [{scale: 1}, {rotate: '360deg'}]},
	},
	// 'fade-bounce-in': {
	// 	0: {opacity: 0.2, transform: [{scale: 0.2}]},
	// 	0.25: {opacity: 0.5, transform: [{scale: 0.5}]},
	// 	0.5: {opacity: 0.7, transform: [{scale: 0.9}]},
	// 	0.6: {opacity: 0.8, transform: [{scale: 1.2}]},
	// 	0.8: {opacity: 0.9, transform: [{scale: 0.95}]},
	// 	0.9: {opacity: 0.95, transform: [{scale: 1.05}]},
	// 	1: {opacity: 1, transform: [{scale: 1}]},
	// },
	// 'zoom-fade-out': {
	// 	0: {opacity: 1, transform: [{scale: 1}]},
	// 	0.5: {opacity: 0.3, transform: [{scale: 0.5}]},
	// 	0.7: {opacity: 0, transform: [{scale: 0.4}]},
	// 	1: {opacity: 0, transform: [{scale: 0}]},
	// },
	'short-slide-in-down': {
		0: {transform: [{translateY: -30}]},
		1: {transform: [{translateY: 30}]},
	},
})

const TabArr = [
	{
		name: 'Home',
		component: HomeTab,
		icon_name: 'home',
		type: Icon.Feather,
	},
	{
		name: 'Love',
		component: LoveTab,
		icon_name: 'heart',
		type: Icon.Feather,
	},
	{
		name: 'Settings',
		component: SettingsTab,
		icon_name: 'settings',
		type: Icon.Feather,
	},
]

const Tab = createBottomTabNavigator()
const TAB_ICON_SIZE = 30
const MARGIN = width * 0.2
const TAB_WIDTH = (width - MARGIN * 2) / TabArr.length
const PADDING = (TAB_WIDTH - TAB_ICON_SIZE) / 2

function MyTabBar({state, descriptors, navigation}) {
	const slideTab = useRef(null)
	const tabBarStyle = useSelector(state => state.tabBarStyleReducer)
	const [opacity] = useState(new Animated.Value(tabBarStyle.opacity))
	const [translateY] = useState(new Animated.Value(tabBarStyle.translateY))

	useEffect(() => {
		slideTab.current.transitionTo({
			transform: [{translateX: TAB_WIDTH * state.index}],
		})
	}, [state.index])

	useEffect(() => {
		Animated.parallel([
			Animated.spring(translateY, {
				toValue: tabBarStyle.translateY,
				useNativeDriver: true,
				bounciness: 10,
				speed: 16,
			}),
			Animated.spring(opacity, {
				toValue: tabBarStyle.opacity,
				useNativeDriver: true,
				bounciness: 10,
				speed: 16,
			}),
		]).start()
	}, [tabBarStyle])

	return (
		<Animated.View
			style={[styles.bottomTab, {opacity: opacity, transform: [{translateY: translateY}]}]}>
			<Animatable.View ref={slideTab} style={styles.slideTabContainer}>
				<LinearGradient
					start={{x: 0, y: 0}}
					end={{x: 1, y: 1}}
					style={styles.slideTab}
					colors={[Colors.light_grape_fruit, Colors.dark_grape_fruit]}
				/>
			</Animatable.View>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				const tabBarIcon = options.tabBarIcon
				const activeColor = options.tabBarActiveTintColor
				const inActiveColor = options.tabBarInactiveTintColor

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({name: route.name, merge: true})
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					})
				}

				return (
					<TouchableOpacity
						key={index}
						accessibilityRole="button"
						accessibilityState={isFocused ? {selected: true} : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabIcon}>
						<TabIcon
							tabBarIcon={tabBarIcon}
							label={label}
							isFocused={isFocused}
							activeColor={activeColor}
							inActiveColor={inActiveColor}
							index={state.index}
						/>
					</TouchableOpacity>
				)
			})}
		</Animated.View>
	)
}

const TabIcon = ({tabBarIcon, label, isFocused, activeColor, inActiveColor, index}) => {
	const [translateY] = useState(new Animated.Value(0))
	const [textTranslateY] = useState(new Animated.Value(0))
	const [textOpacity] = useState(new Animated.Value(1))

	const moveUpDownTabIcon = (icon, text, opacity) => {
		Animated.parallel([
			Animated.spring(translateY, {
				toValue: icon,
				useNativeDriver: true,
			}),
			Animated.spring(textTranslateY, {
				toValue: text,
				useNativeDriver: true,
			}),
			Animated.spring(textOpacity, {
				toValue: opacity,
				useNativeDriver: true,
			}),
		]).start()
	}

	useEffect(() => {
		if (isFocused) {
			moveUpDownTabIcon(-42, 12, 1)
		} else {
			moveUpDownTabIcon(0, 25, 0)
		}
	}, [index])

	return (
		<View>
			<Animated.View
				style={{
					alignItems: 'center',
					transform: [{translateY: translateY}],
				}}>
				<tabBarIcon.type
					color={isFocused ? activeColor : inActiveColor}
					name={tabBarIcon.icon_name}
					size={isFocused ? tabBarIcon.size * 1.1 : tabBarIcon.size}
				/>
			</Animated.View>
			<Animated.Text
				style={{
					fontFamily: 'Montserrat-600',
					fontSize: 16,
					color: Colors.grape_fruit,
					position: 'absolute',
					alignSelf: 'center',
					transform: [{translateY: textTranslateY}],
					opacity: textOpacity,
				}}>
				{label}
			</Animated.Text>
		</View>
	)
}

function MainScreen() {
	return (
		<Tab.Navigator
			tabBar={props => <MyTabBar {...props} />}
			initialRouteName="HomeTab"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}>
			{TabArr.map((tab, index) => (
				<Tab.Screen
					key={index}
					name={tab.name}
					component={tab.component}
					options={{
						tabBarActiveTintColor: Colors.lychee,
						tabBarInactiveTintColor: Colors.grape_fruit_blur,
						tabBarIcon: {
							icon_name: tab.icon_name,
							type: tab.type,
							size: TAB_ICON_SIZE,
						},
					}}
				/>
			))}
		</Tab.Navigator>
	)
}

export default MainScreen

const styles = StyleSheet.create({
	bottomTab: {
		flexDirection: 'row',
		width: width - MARGIN * 2 + PADDING * 2,
		height: 90,
		position: 'absolute',
		bottom: 24,
		alignSelf: 'center',
		paddingHorizontal: PADDING,
		backgroundColor: Colors.lychee,
		borderRadius: 32,
		elevation: 8,
		shadowColor: Colors.black_blur5,
	},
	tabIcon: {
		flex: 1,
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
	},
	slideTabContainer: {
		width: TAB_WIDTH,
		height: 90,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		left: PADDING,
	},
	slideTab: {
		flex: 1,
		backgroundColor: Colors.grape_fruit,
		width: 60,
		height: 60,
		borderRadius: 100,
		position: 'absolute',
		bottom: 56,
		elevation: 6,
		shadowColor: Colors.black_blur4,
	},
})
