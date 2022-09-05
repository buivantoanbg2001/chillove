import React from 'react'
import {View, ViewProps} from 'react-native'

type Props = {
	color: string
	width: number
} & ViewProps

const Divider = ({color, width, ...props}: Props) => {
	return (
		<View
			{...props}
			style={[
				{
					borderColor: color,
					borderWidth: width / 2,
					backgroundColor: color,
				},
				props.style,
			]}
		/>
	)
}

export default Divider
