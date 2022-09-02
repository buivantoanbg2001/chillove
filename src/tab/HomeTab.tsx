import React, {useRef, useState, createContext, useCallback, useEffect, useMemo} from 'react'

import {
	StyleSheet,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	Platform,
	Keyboard,
	ActivityIndicator,
} from 'react-native'
import {useBackHandler} from '../hooks/useBackHandler.hook'
import {FlatList} from 'react-native-gesture-handler'
import Colors from '../utils/Colors'
import Post from '../components/Post'
import Icon, {Icons} from '../utils/Icons'
import * as Animatable from 'react-native-animatable'
import BottomSheet, {
	BottomSheetFlatList,
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import {CustomText} from '../utils/CustomComponents'
import {useDispatch} from 'react-redux'
import Comment from '../components/Comment'
import CommentBox from '../components/CommentBox'
import {auth, db, onSnapshot, collection, CollectionReference} from '../firebase/firebase-config'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {PostType, CommentType} from '../models/post.model'
import useKeyboard from '../hooks/useKeyboard.hook'

const MARGIN = 24
const PADDING = 16

export const BottomSheetContext = createContext<{postId: string | undefined}>({postId: undefined})

type Props = {}

type PostRenderType = {
	item: PostType
	index: number
}

type CommentRenderType = {
	item: CommentType
	index: number
}

const HomeTab = (props: Props) => {
	var onEndReachedCalledDuringMomentum: boolean = true
	const [posts, setPosts] = useState<PostType[]>([])
	const [indexCurrentPostComment, setIndexCurrentPostComment] = useState<number>(-1)
	const [indexCurrentPostMore, setIndexCurrentPostMore] = useState<number>(-1)
	const [indexCommentSheet, setIndexCommentSheet] = useState<number>(-1)
	const [indexMoreSheet, setIndexMoreSheet] = useState<number>(-1)
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
	const [limitIndexVisiblePost, setLimitIndexVisiblePost] = useState<number>(10)
	const commentSheetRef = useRef<BottomSheet>(null)
	const moreSheetRef = useRef<BottomSheet>(null)
	const flatListRef = useRef<FlatList>(null)
	const dispatch = useDispatch()
	const navigation = useNavigation<StackNavigationProp<any>>()
	const isKeyboardVisible = useKeyboard()

	const getData = () => {
		setIsLoadingMore(true)
		setTimeout(() => {
			setIsLoadingMore(false)
		}, 1000)
	}

	useEffect(() => {
		const postsDocRef = collection(db, 'posts') as CollectionReference<PostType>
		const unsubscribePosts = onSnapshot<PostType>(postsDocRef, posts => {
			const allPosts: PostType[] = posts.docs.map(post => {
				return {...post.data(), id: post.id.toString()}
			})

			const displayPosts = allPosts
				.filter(post => {
					if (auth.currentUser) {
						return (
							!post.is_private || (post.is_private && post.owner_email == auth.currentUser.email)
						)
					} else {
						return !post.is_private
					}
				})
				.sort((p1, p2) => {
					return (
						new Date(p2.created_at.seconds * 1000 + p2.created_at.nanoseconds / 1000000).getTime() -
						new Date(p1.created_at.seconds * 1000 + p1.created_at.nanoseconds / 1000000).getTime()
					)
				})

			setPosts(displayPosts)
		})

		return () => {
			unsubscribePosts()
		}
	}, [])

	/**
	 * Close the BottomSheet if it is opening when Back button is pressed
	 */
	useBackHandler(() => {
		if (indexMoreSheet >= 0) {
			if (moreSheetRef.current) {
				moreSheetRef.current.close()
			}
			return true
		} else if (indexCommentSheet >= 0) {
			if (commentSheetRef.current) {
				commentSheetRef.current.close()
			}
			return true
		}
		return false
	})

	/**
	 * Render the Backdrop for BottomSheet
	 * @disappearsOnIndex -0.5: cheat =), it will send a bug if we set -1
	 * @pressBehavior if isKeyboardVisible === true, it will send a bug that bottom sheet is not completely collapse
	 */
	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-0.5}
				pressBehavior={isKeyboardVisible ? 'none' : 'close'}
			/>
		),
		[isKeyboardVisible],
	)

	const setTabBarStyle = useCallback((opacity: number, translateY: number) => {
		dispatch({
			type: 'SET_TAB_BAR_STYLE',
			payload: {
				opacity: opacity,
				translateY: translateY,
			},
		})
	}, [])

	const scrollToTop = useCallback(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToOffset({animated: true, offset: 0})
		}
	}, [])

	const handleAddNewPost = useCallback(() => {
		navigation.push('NewPostScreen')
	}, [])

	const openComment = useCallback((index: number) => {
		setTabBarStyle(0, 150)
		if (commentSheetRef.current) {
			commentSheetRef.current.snapToIndex(0)
		}
		setTimeout(() => {
			if (indexCurrentPostComment != index) {
				setIndexCurrentPostComment(index)
			}
		})
	}, [])

	const openMore = useCallback((index: number) => {
		setTabBarStyle(0, 150)
		if (moreSheetRef.current) {
			moreSheetRef.current.snapToIndex(0)
		}
		setTimeout(() => {
			if (indexCurrentPostMore != index) setIndexCurrentPostMore(index)
		})
	}, [])

	/**
	 * Show Tabbar and set currentPost = undefined when starting to close the BottomSheet
	 */
	const onAnimate = useCallback((_: number, toIndex: number) => {
		if (toIndex === -1) {
			setTabBarStyle(1, 0)
			setIndexCurrentPostComment(-1)
			setIndexCurrentPostMore(-1)
		}
	}, [])

	const renderPostItem = useCallback(
		({item, index}: PostRenderType) => (
			<Post post={item} openComment={() => openComment(index)} openMore={() => openMore(index)} />
		),
		[],
	)

	const renderCommentItem = useCallback(
		({item, index}: CommentRenderType) => <Comment comment={item} />,
		[],
	)

	const bottomSheetContextValue = useMemo(() => {
		return {postId: posts[indexCurrentPostComment] ? posts[indexCurrentPostComment].id : undefined}
	}, [indexCurrentPostComment])

	const renderFooter = () => {
		return isLoadingMore ? (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.grape_fruit} />
			</View>
		) : null
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Image Background */}
			<Animatable.Image
				source={{
					uri: 'https://firebasestorage.googleapis.com/v0/b/chillove.appspot.com/o/background%2Fbackground.jpg?alt=media&token=b275b8a1-b713-4ac3-a53e-df6383946c01',
				}}
				style={StyleSheet.absoluteFillObject}
				blurRadius={50}
				animation="rotate"
				iterationCount="infinite"
				easing={'linear'}
				duration={60000}
				useNativeDriver={true}
				resizeMode={'cover'}
			/>

			<Header handleAddNewPost={handleAddNewPost} scrollToTop={scrollToTop} />

			{/* All posts */}
			<FlatList
				ref={flatListRef}
				contentContainerStyle={{paddingBottom: 146, paddingTop: 4}}
				data={posts}
				renderItem={renderPostItem}
				ListFooterComponent={renderFooter}
				onEndReachedThreshold={0.01}
				onMomentumScrollBegin={() => (onEndReachedCalledDuringMomentum = false)}
				onEndReached={() => {
					if (!onEndReachedCalledDuringMomentum) {
						getData()
						onEndReachedCalledDuringMomentum = true
					}
				}}
				keyExtractor={item => item.id}
				showsHorizontalScrollIndicator={false}
				nestedScrollEnabled
				initialNumToRender={5}
				windowSize={5}
				removeClippedSubviews
				maxToRenderPerBatch={2}
			/>

			{/* BottomSheet for 'Comment' */}
			<BottomSheetContext.Provider value={bottomSheetContextValue}>
				<BottomSheet
					ref={commentSheetRef}
					index={-1}
					enablePanDownToClose={isKeyboardVisible ? false : true}
					snapPoints={['66%', '100%']}
					footerComponent={CommentBox}
					backdropComponent={renderBackdrop}
					onAnimate={onAnimate}
					onChange={index => setIndexCommentSheet(index)}>
					<View style={styles.commentContainer}>
						<View style={styles.commentHeader}>
							<CustomText style={{fontSize: 22, fontFamily: 'Montserrat-600'}}>Comments</CustomText>
							<TouchableOpacity>
								<Icon
									type={Icons.Ionicons}
									name="ellipsis-horizontal"
									size={30}
									color={Colors.black}
								/>
							</TouchableOpacity>
						</View>
						{posts[indexCurrentPostComment] && (
							<BottomSheetFlatList
								data={posts[indexCurrentPostComment].comments.sort(
									(c1, c2) =>
										new Date(
											c1.commented_at.seconds * 1000 + c1.commented_at.nanoseconds / 1000000,
										).getTime() -
										new Date(
											c2.commented_at.seconds * 1000 + c2.commented_at.nanoseconds / 1000000,
										).getTime(),
								)}
								renderItem={renderCommentItem}
								keyExtractor={(_, index) => index.toString()}
								showsHorizontalScrollIndicator={false}
								nestedScrollEnabled
								contentContainerStyle={{paddingBottom: 120}}
								initialNumToRender={10}
								windowSize={5}
								removeClippedSubviews
								maxToRenderPerBatch={8}
							/>
						)}
					</View>
				</BottomSheet>
			</BottomSheetContext.Provider>

			{/* BottomSheet for button 'More' */}
			<BottomSheet
				ref={moreSheetRef}
				index={-1}
				enablePanDownToClose
				snapPoints={['20%']}
				backdropComponent={renderBackdrop}
				onAnimate={onAnimate}
				onChange={index => setIndexMoreSheet(index)}>
				<></>
			</BottomSheet>
		</SafeAreaView>
	)
}

type HeaderType = {
	handleAddNewPost: () => void
	scrollToTop: () => void
}

const Header = ({handleAddNewPost, scrollToTop}: HeaderType) => {
	const [disabled, setDisabled] = useState(false)

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={scrollToTop} activeOpacity={0.5}>
				<Image source={require('../../assets/images/header-logo.png')} style={styles.logo} />
			</TouchableOpacity>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity style={styles.icon}>
					<Icon type={Icons.Ionicons} name="search" size={30} color={Colors.black} />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.icon}
					disabled={disabled}
					onPress={() => {
						setDisabled(disabled => !disabled)
						setTimeout(() => setDisabled(disabled => !disabled), 500)
						handleAddNewPost()
					}}>
					<Icon type={Icons.MaterialCommunityIcons} name="pencil" size={30} color={Colors.black} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default HomeTab

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.lychee,
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 30 : 0,
	},
	header: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 24,
		height: 90,
	},
	logo: {
		width: 140,
		height: 50,
		resizeMode: 'contain',
	},
	icon: {
		marginLeft: 16,
	},
	commentContainer: {
		backgroundColor: Colors.white,
		height: '100%',
	},
	commentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: MARGIN / 2,
		paddingHorizontal: MARGIN,
	},
	horizontalIndicator: {
		width: 36,
		height: 5,
		alignSelf: 'center',
		marginTop: PADDING,
		marginBottom: PADDING / 2,
		backgroundColor: Colors.black_blur2,
		borderRadius: 100,
	},
	loadingContainer: {
		// marginBottom: 100,
		alignItems: 'center',
	},
})
