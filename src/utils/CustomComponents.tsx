import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TextProps,
	ViewProps,
	ImageProps,
	TextInputProps,
	TouchableOpacity,
	Animated,
	TouchableOpacityProps,
	ImageSourcePropType,
	Dimensions,
} from 'react-native'
import React from 'react'
import Colors from './Colors'
import LinearGradient from 'react-native-linear-gradient'
import * as Icon from './Icons'

const PADDING = 16
const MARGIN = 24
const {width, height} = Dimensions.get('window')

const CustomText = (props: TextProps) => {
	return (
		<Text {...props} style={[styles.defaultText, props.style]}>
			{props.children}
		</Text>
	)
}

const CustomView = (props: ViewProps) => {
	return (
		<View {...props} style={[styles.defaultView, props.style]}>
			{props.children}
		</View>
	)
}

const CustomImage = (props: ImageProps) => {
	return <Image {...props} style={[styles.defaultImage, props.style]} />
}

const CustomTextInput = (props: TextInputProps) => {
	return (
		<TextInput
			{...props}
			style={[styles.defaultTextInput, props.style]}
			placeholderTextColor={props.placeholderTextColor || Colors.black_blur3}
			selectionColor={props.selectionColor || Colors.black_blur4}>
			{props.children}
		</TextInput>
	)
}

type ButtonProps = {
	title?: string
	titleStyle?: {}
	icon?:
		| Icon.AntDesign
		| Icon.Entypo
		| Icon.EvilIcons
		| Icon.Feather
		| Icon.FontAwesome
		| Icon.FontAwesome5
		| Icon.FontAwesome5Pro
		| Icon.Fontisto
		| Icon.Foundation
		| Icon.Ionicons
		| Icon.MaterialCommunityIcons
		| Icon.MaterialIcons
		| Icon.Octicons
		| Icon.SimpleLineIcons
		| Icon.Zocial
	type?: 'solid' | 'border' | 'none'
} & TouchableOpacityProps

const Button = ({title, titleStyle, icon, type, ...props}: ButtonProps) => {
	return (
		<TouchableOpacity
			{...props}
			style={[
				styles.defaultButton,
				type === 'solid' ? styles.solidButton : type === 'none' ? null : styles.borderButton,
				props.disabled ? {opacity: 0.2} : null,
				props.style,
			]}>
			<>
				{icon}
				{title && (
					<CustomText
						style={[
							styles.title,
							type === 'solid' ? {color: Colors.lychee} : null,
							icon ? {marginLeft: 4} : null,
							titleStyle,
						]}>
						{title}
					</CustomText>
				)}
				{props.children}
			</>
		</TouchableOpacity>
	)
}

export {CustomText, CustomView, CustomImage, CustomTextInput, Button}

const styles = StyleSheet.create({
	defaultText: {
		color: Colors.black,
		fontSize: 14,
		fontFamily: 'Montserrat-500',
	},
	defaultView: {
		backgroundColor: Colors.lychee,
		borderRadius: 32,
		elevation: 8,
		shadowColor: Colors.black_blur5,
	},
	defaultImage: {
		borderRadius: 32,
	},
	defaultTextInput: {
		color: Colors.black,
		fontSize: 14,
		fontFamily: 'Montserrat-500',
		backgroundColor: Colors.lychee,
		borderRadius: 12,
		padding: 12,
	},
	defaultButton: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: width * 0.6,
		padding: 12,
		borderRadius: 12,
	},
	title: {
		color: Colors.dark_grape_fruit,
		fontSize: 16,
		fontFamily: 'Montserrat-600',
	},
	disabled: {
		opacity: 0.2,
	},
	solidButton: {
		backgroundColor: Colors.grape_fruit,
	},
	borderButton: {
		borderColor: Colors.dark_grape_fruit,
		borderWidth: 1,
	},
})
