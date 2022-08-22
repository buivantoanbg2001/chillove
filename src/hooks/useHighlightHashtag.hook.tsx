import React, {useMemo} from 'react'
import Colors from '../utils/Colors'
import {CustomText} from '../utils/CustomComponents'

const useHighlightHashtag = (text: string) => {
	const regexHashtag = /^#[0-9a-zA-Z_]*[0-9a-zA-Z]+[0-9a-zA-Z_]*$/g

	const highLightHashtag = (line: string) => {
		const word_array = line.split(' ')
		const new_word_arr: string[] = []
		const hashtags: number[] = []

		for (let i = 0; i < word_array.length; i++) {
			if (word_array[i].match(regexHashtag)) {
				hashtags.push(i)
			}
		}

		if (hashtags.length > 0) {
			if (hashtags[0] != 0) {
				new_word_arr.push(word_array.slice(0, hashtags[0]).join(' '))
			}
			new_word_arr.push(word_array[hashtags[0]])

			for (let i = 1; i < hashtags.length; i++) {
				new_word_arr.push(word_array.slice(hashtags[i - 1] + 1, hashtags[i]).join(' '))
				new_word_arr.push(word_array[hashtags[i]])
			}

			if (hashtags[hashtags.length - 1] < word_array.length - 1) {
				new_word_arr.push(word_array.slice(hashtags[hashtags.length - 1] + 1).join(' '))
			}
		} else {
			new_word_arr.push(line)
		}

		return (
			<>
				{new_word_arr.map((item, index) => {
					if (item.match(regexHashtag)) {
						return (
							<CustomText key={index} style={{color: Colors.grape_fruit}}>
								{item}
								{index == new_word_arr.length - 1 ? '' : ' '}
							</CustomText>
						)
					} else {
						return (
							<CustomText key={index}>
								{item}
								{index == new_word_arr.length - 1 ? '' : ' '}
							</CustomText>
						)
					}
				})}
			</>
		)
	}

	return useMemo(() => {
		const lines = text.split('\n')

		return (
			<>
				{lines.map((line, index) => (
					<CustomText key={index}>
						{highLightHashtag(line)}
						{index == lines.length - 1 ? '' : '\n'}
					</CustomText>
				))}
			</>
		)
	}, [text])
}

export default useHighlightHashtag
