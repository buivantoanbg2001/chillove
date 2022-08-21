import React, {useState, useRef} from 'react'
import {StyleSheet, View, Image, Dimensions, TouchableOpacity, Animated} from 'react-native'
import Colors from '../utils/Colors'
import {useSelector} from 'react-redux'
import {CustomText} from '../utils/CustomComponents'
import PaginationDot from 'react-native-animated-pagination-dot'
import Icon, {Icons} from '../utils/Icons'
import FastImage from 'react-native-fast-image'
import useHighlightHashtag from '../hooks/useHighlightHashtag.hook'
import Video from 'react-native-video'
import TimeRelative from '../utils/TimeRelative'

const {width} = Dimensions.get('window')
const PADDING = 16
const MARGIN = 24

const Post = ({post, openComment, openMore}) => {
	const [seeMore, setSeeMore] = useState(false)

	const users = useSelector(state => state.usersReducer)
	const user = users[post.owner_email]

	const handleSeeMore = () => {
		setSeeMore(!seeMore)
	}

	return (
		<AestheticMode
			post={post}
			user={user}
			seeMore={seeMore}
			handleSeeMore={handleSeeMore}
			openComment={openComment}
			openMore={openMore}
		/>
	)
}

const AestheticMode = ({post, user, seeMore, handleSeeMore, openComment, openMore}) => {
	return (
		<View style={styles.container}>
			<Image
				source={{uri: 'https://i.imgur.com/MeKBRsb.png'}}
				style={[StyleSheet.absoluteFillObject, {opacity: 0.3}]}
				blurRadius={23}
			/>
			<View style={{minHeight: 88}}>
				<PostImages post={post} />
				<PostInfo post={post} user={user} />
			</View>
			<PostButton post={post} openComment={openComment} openMore={openMore} />
			<Caption post={post} seeMore={seeMore} handleSeeMore={handleSeeMore} />
			<Hashtag post={post} />
		</View>
	)
}

const PostImages = ({post}) => {
	if (post.images.length == 0) return <></>

	const [currentImage, setCurrentImage] = useState(0)
	const scrollX = useRef(new Animated.Value(0)).current

	let onScroll = e => {
		let pageNumber = Math.min(
			Math.max(Math.floor(e.nativeEvent.contentOffset.x / (width - 24 * 2) + 0.5), 0),
			post.images.length,
		)
		setCurrentImage(pageNumber)
	}

	return (
		<View>
			<Animated.FlatList
				horizontal
				data={post.images}
				renderItem={({item, index}) => {
					const opacity = scrollX.interpolate({
						inputRange: [
							(index - 1) * (width - MARGIN * 2),
							(index - 0.3) * (width - MARGIN * 2),
							index * (width - MARGIN * 2),
							(index + 0.3) * (width - MARGIN * 2),
							(index + 1) * (width - MARGIN * 2),
						],
						outputRange: [0, 1, 1, 1, 0],
					})

					const scale = scrollX.interpolate({
						inputRange: [
							(index - 1) * (width - MARGIN * 2),
							index * (width - MARGIN * 2),
							(index + 1) * (width - MARGIN * 2),
						],
						outputRange: [0.75, 1, 0.75],
					})

					return (
						<Animated.View
							style={[styles.postImage, {opacity: opacity, transform: [{scale: scale}]}]}>
							<FastImage
								source={{uri: item, priority: FastImage.priority.low}}
								style={StyleSheet.absoluteFillObject}
							/>

							{/* <Video
								source={{
									uri: 'https://firebasestorage.googleapis.com/v0/b/chillove.appspot.com/o/ELANTRA%20video%2030S.mp4?alt=media&token=9a501299-524f-4a17-958b-4fcbd0901049',
								}}
								style={{width: 100, height: 100, position: 'absolute'}}
								paused
							/> */}
						</Animated.View>
					)
				}}
				keyExtractor={(_, index) => index}
				pagingEnabled
				initialNumToRender={24}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
					useNativeDriver: true,
					listener: onScroll,
				})}
			/>
			<View style={styles.paginationDot}>
				<PaginationDot
					activeDotColor={Colors.grape_fruit}
					curPage={currentImage}
					maxPage={post.images.length}
				/>
			</View>
			<View style={styles.paginationNumber}>
				<CustomText
					style={{
						fontSize: 12,
						color: Colors.grape_fruit,
						fontFamily: 'Montserrat-700',
					}}>
					{Math.max(currentImage + 1, 0)}
					<CustomText style={{fontSize: 8}}> / {post.images.length}</CustomText>
				</CustomText>
			</View>
		</View>
	)
}

const PostInfo = ({post, user}) => {
	return (
		<View style={styles.postInfo}>
			<View style={styles.avatar_container}>
				<Image source={{uri: user.avatar_url}} style={{width: 50, height: 50}} />
			</View>
			<View style={{marginLeft: 12}}>
				<CustomText
					style={{
						color: Colors.black,
						fontSize: 18,
						fontFamily: 'Montserrat-600',
					}}>
					{user.username}
				</CustomText>
				<TimeRelative style={{color: Colors.gray}} time={post.created_at} />
			</View>
		</View>
	)
}

const PostButton = ({post, openComment, openMore}) => {
	return (
		<View style={styles.postButton}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<TouchableOpacity style={{marginRight: 20}} onPress={openComment}>
					<Icon
						type={Icons.Ionicons}
						name="chatbubble-ellipses-outline"
						size={28}
						color={Colors.black}
						style={{transform: [{scaleX: -1}]}}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon type={Icons.Ionicons} name="bookmarks-outline" size={28} color={Colors.black} />
				</TouchableOpacity>
			</View>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{post.is_private && (
					<View style={{marginRight: 12, opacity: 0.2}}>
						<Icon type={Icons.Ionicons} name="lock-closed" size={18} color={Colors.black} />
					</View>
				)}
				<TouchableOpacity onPress={openMore}>
					<Icon type={Icons.Ionicons} name="ellipsis-horizontal" size={24} color={Colors.black} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const Caption = ({post, seeMore, handleSeeMore}) => {
	const highlightHashtag = text => {
		return useHighlightHashtag(text)
	}

	return (
		<TouchableOpacity
			style={{marginHorizontal: 24, marginBottom: 8}}
			onPress={handleSeeMore}
			activeOpacity={1}>
			<CustomText>
				{seeMore ? highlightHashtag(post.caption) : highlightHashtag(post.caption.slice(0, 100))}
				{!seeMore && post.caption.length >= 100 && (
					<CustomText style={{color: Colors.gray}}> ...more</CustomText>
				)}
			</CustomText>
		</TouchableOpacity>
	)
}

const Hashtag = ({post}) => {
	return (
		<View style={styles.hashtag}>
			{post.hashtags.map((hashtag, index) => (
				<TouchableOpacity key={index} style={{marginRight: 10}}>
					<CustomText style={{color: Colors.grape_fruit}}>{hashtag}</CustomText>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default Post

const styles = StyleSheet.create({
	container: {
		width: width - MARGIN * 2,
		marginHorizontal: MARGIN,
		marginTop: PADDING * 0.5,
		marginBottom: PADDING * 1.5,
		borderRadius: 32,
		overflow: 'hidden',
	},
	postImage: {
		width: width - PADDING * 2 - MARGIN * 2,
		height: 420,
		borderRadius: 32,
		margin: PADDING,
		overflow: 'hidden',
	},
	postInfo: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: -10,
		left: 30,
		borderRadius: 30,
		padding: 16,
		backgroundColor: Colors.white_blur9,
		elevation: 16,
		shadowColor: Colors.black_blur1,
	},
	paginationDot: {
		position: 'absolute',
		alignSelf: 'center',
		top: 30,
		flexDirection: 'row',
	},
	paginationNumber: {
		position: 'absolute',
		top: 28.5,
		right: 36,
		paddingHorizontal: 6,
		paddingBottom: 1,
		borderRadius: 8,
		backgroundColor: Colors.white_blur9,
	},
	avatar_container: {
		borderRadius: 18,
		elevation: 8,
		shadowColor: Colors.black_blur8,
		overflow: 'hidden',
	},
	postButton: {
		flexDirection: 'row',
		paddingHorizontal: 24,
		marginTop: 24,
		marginBottom: 12,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	hashtag: {
		paddingHorizontal: 24,
		marginBottom: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})
