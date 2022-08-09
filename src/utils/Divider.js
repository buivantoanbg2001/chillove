import React from 'react'
import {View} from 'react-native'

const Divider = props => {
	return (
		<View
			style={[
				{
					borderColor: props.color,
					borderWidth: props.width / 2,
					backgroundColor: props.color,
				},
				props.style,
			]}
		/>
	)
}

export default Divider
