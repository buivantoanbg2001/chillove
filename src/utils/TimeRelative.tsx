import React, {useMemo} from 'react'
import {TextProps} from 'react-native'
import {CustomText} from './CustomComponents'

const aMinute = 60 * 1000
const aHour = aMinute * 60
const aDay = aHour * 24
const aMonth = aDay * 30
const aYear = aDay * 365

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

	const diff =
		new Date().getTime() - new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getTime()

	return useMemo(
		() => (
			<CustomText {...props}>
				{diff < 10000
					? 'Just now'
					: diff < aMinute
					? Math.floor(diff / 1000) + ' seconds ago'
					: diff < aHour
					? Math.floor(diff / aMinute) + ' minutes ago'
					: diff < aDay
					? Math.floor(diff / aHour) + ' hours ago'
					: diff < aMonth
					? Math.floor(diff / aDay) + ' days ago'
					: diff < aYear
					? Math.floor(diff / aMonth) + ' months ago'
					: Math.floor(diff / aYear) + ' years ago'}
			</CustomText>
		),
		[time],
	)
}

export default TimeRelative
