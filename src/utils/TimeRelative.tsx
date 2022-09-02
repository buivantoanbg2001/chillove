import React, {useMemo} from 'react'
import {TextProps} from 'react-native'
import {CustomText} from './CustomComponents'
import {formatRelative} from 'date-fns'

type Props = {
	time?: {
		seconds: number
		nanoseconds: number
	}
} & TextProps

const TimeRelative = ({time, ...props}: Props) => {
	if (
		time == undefined ||
		time.seconds == undefined ||
		time.nanoseconds == undefined ||
		time.seconds == null ||
		time.nanoseconds == null
	)
		return <CustomText {...props}>Loading...</CustomText>

	const diff = formatRelative(
		new Date(time.seconds * 1000 + time.nanoseconds / 1000000),
		new Date(),
		{weekStartsOn: 1},
	)

	return useMemo(() => <CustomText {...props}>{diff}</CustomText>, [time])
}

export default TimeRelative
