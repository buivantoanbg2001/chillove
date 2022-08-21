import {Animated} from 'react-native'
import React, {useEffect, useRef} from 'react'
import Colors from './Colors'
import {CustomText} from './CustomComponents'

type Props = {
	message: string
	onClose: (event: Event) => void
	success?: boolean
	error?: boolean
}

const Toast = ({message, onClose, success, error}: Props) => {
	const opacityValue = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.sequence([
			Animated.timing(opacityValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.delay(3000),
			Animated.timing(opacityValue, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start(onClose)
	}, [])

	return (
		<Animated.View
			style={{
				backgroundColor: success ? Colors.green : error ? Colors.red : Colors.blue,
				opacity: opacityValue,
				padding: 10,
				marginTop: 3,
				borderRadius: 50,
				width: '100%',
			}}>
			<CustomText
				style={{
					color: Colors.lychee,
					textAlign: 'center',
				}}>
				{message}
			</CustomText>
		</Animated.View>
	)
}

export default Toast
