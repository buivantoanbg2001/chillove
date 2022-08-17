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
	solid?: boolean
	title?: string
	source?: ImageSourcePropType
	iconAnimStyle?: {}
	iconStyle?: {}
	titleStyle?: {}
	gap?: number
} & TouchableOpacityProps

const Button = ({
	solid,
	title,
	source,
	iconAnimStyle,
	iconStyle,
	titleStyle,
	gap,
	...props
}: ButtonProps) => {
	return solid ? (
		<TouchableOpacity
			{...props}
			style={[styles.solidButtonWrapper, props.style, props.disabled ? styles.disabled : null]}>
			{title && (
				<LinearGradient
					start={{x: 0.3, y: -1}}
					end={{x: 0.7, y: 2}}
					style={[styles.solid, props.disabled ? styles.disabled : null]}
					colors={[Colors.light_grape_fruit, Colors.dark_grape_fruit]}>
					<CustomText style={[styles.titleSolidButton]}>{title}</CustomText>
				</LinearGradient>
			)}
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			{...props}
			style={[styles.defaultButton, props.style, props.disabled ? styles.disabled : null]}>
			{source &&
				(iconAnimStyle ? (
					<Animated.Image source={source} style={[iconStyle, iconAnimStyle]} />
				) : (
					<Image source={source} style={iconStyle} />
				))}

			{title && (
				<View style={{marginStart: gap || 0}}>
					<CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
				</View>
			)}
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
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: width * 0.1,
	},
	solidButtonWrapper: {
		borderRadius: 50,
		marginHorizontal: width * 0.1,
	},
	solid: {
		padding: 12,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleSolidButton: {
		color: Colors.lychee,
		fontSize: 18,
	},
	title: {
		color: 'red',
		fontSize: 14,
	},
	disabled: {
		opacity: 0.2,
	},
})
