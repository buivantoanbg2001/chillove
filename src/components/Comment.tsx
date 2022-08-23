import React, {useState} from 'react'
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native'
import {useAppSelector} from '../hooks/redux.hook'
import Colors from '../utils/Colors'
import {CustomText, CustomView} from '../utils/CustomComponents'
import Icon, {Icons} from '../utils/Icons'
import Divider from '../utils/Divider'
import TimeRelative from '../utils/TimeRelative'
import {CommentType} from '../models/post.model'
import {UserType} from '../models/user.model'
import _ from 'lodash'

const {width, height} = Dimensions.get('window')
const PADDING = 16
const MARGIN = 24
const AVATAR_SIZE = 56

type Props = {
	comment: CommentType
}

const Comment = ({comment}: Props) => {
	console.log('render Comment')
	const [seeMore, setSeeMore] = useState(false)

	const users: UserType[] = useAppSelector(state => state.usersReducer)
	const user = users.find(user => user.email == comment.owner_email)

	if (user == undefined) return <></>

	const handleSeeMore = () => {
		setSeeMore(!seeMore)
	}

	return (
		<View style={{marginTop: PADDING}}>
			<View style={styles.container}>
				<CustomView style={{marginRight: PADDING}}>
					<Image source={{uri: user.avatar_url}} style={styles.avatar} />
				</CustomView>
				<View style={{width: width - AVATAR_SIZE - MARGIN * 2 - PADDING}}>
					<CustomText
						style={{
							fontSize: 18,
							fontFamily: 'Montserrat-600',
							marginBottom: PADDING / 2,
						}}>
						{user.username}
					</CustomText>

					<CustomText>{seeMore ? comment.comment : comment.comment.slice(0, 100)}</CustomText>
					{!seeMore && comment.comment.length > 100 && (
						<TouchableOpacity onPress={handleSeeMore} activeOpacity={1} style={{marginTop: 4}}>
							<CustomText style={{color: Colors.gray}}>... more</CustomText>
						</TouchableOpacity>
					)}
					{seeMore && comment.comment.length > 100 && (
						<TouchableOpacity onPress={handleSeeMore} activeOpacity={1} style={{marginTop: 4}}>
							<CustomText style={{color: Colors.gray}}>... less</CustomText>
						</TouchableOpacity>
					)}

					<View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								alignSelf: 'flex-end',
								marginTop: MARGIN / 2,
								marginBottom: PADDING,
							}}>
							<TimeRelative
								style={{fontSize: 15, color: Colors.gray, marginRight: 10}}
								time={comment.commented_at}
							/>
							<Icon type={Icons.Feather} name="calendar" size={15} color={Colors.gray} />
						</View>
					</View>
				</View>
			</View>
			<Divider color={Colors.black_blur1} width={0.4} />
		</View>
	)
}

export default React.memo(Comment, (prev, next) => {
	return _.isEqual(prev.comment, next.comment)
})

// export default Comment

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: MARGIN,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: 20,
	},
})
