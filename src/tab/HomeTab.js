import React, {useRef, useState, createContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useBackHandler} from '../hooks/useBackHandler.hook';
import {FlatList} from 'react-native-gesture-handler';
import posts from '../data/posts';
import Colors from '../utils/Colors';
import Post from '../components/Post';
import Icon, {Icons} from '../utils/Icons';
import * as Animatable from 'react-native-animatable';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {CustomText} from '../utils/CustomComponents';
import {useDispatch} from 'react-redux';
import Comment from '../components/Comment';
import CommentBox from '../components/CommentBox';

const MARGIN = 24;
const PADDING = 16;

export const BottomSheetContext = createContext();

const HomeTab = ({navigation}) => {
	const [currentCommentPost, setCurrentCommentPost] = useState();
	const [currentMorePost, setCurrentMorePost] = useState();
	const [indexCommentSheet, setIndexCommentSheet] = useState(-1);
	const [indexMoreSheet, setIndexMoreSheet] = useState(-1);
	const commentSheetRef = useRef(null);
	const moreSheetRef = useRef(null);
	const flatListRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (indexCommentSheet == -1 && indexMoreSheet == -1) {
			setTabBarStyle(1, 0);
		} else {
			setTabBarStyle(0, 150);
		}
	}, [indexCommentSheet, indexMoreSheet]);

	useBackHandler(() => {
		if (indexMoreSheet >= 0) {
			moreSheetRef.current.close();
			return true;
		} else if (indexCommentSheet >= 0) {
			commentSheetRef.current.close();
			return true;
		}
		return false;
	});

	const setTabBarStyle = (opacity, translateY) => {
		dispatch({
			type: 'SET_TAB_BAR_STYLE',
			payload: {
				opacity: opacity,
				translateY: translateY,
			},
		});
	};

	const scrollToTop = () => {
		flatListRef.current.scrollToOffset({animated: true, offset: 0});
	};

	const handleAddNewPost = () => {
		navigation.push('NewPostScreen');
	};

	const openComment = post => {
		setTabBarStyle(0, 150);
		setCurrentCommentPost(post);
		commentSheetRef.current.snapToIndex(0);
	};

	const openMore = post => {
		setTabBarStyle(0, 150);
		setCurrentMorePost(post);
		moreSheetRef.current.snapToIndex(0);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Animatable.Image
				source={{
					uri: 'https://i.imgur.com/obASxu0.jpg',
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
			<FlatList
				ref={flatListRef}
				contentContainerStyle={{paddingBottom: 146, paddingTop: 6}}
				data={posts.sort((p1, p2) => p2.created_at - p1.created_at)}
				renderItem={({item}) => <Post post={item} openComment={openComment} openMore={openMore} />}
				keyExtractor={(_, index) => index}
				initialNumToRender={24}
				showsHorizontalScrollIndicator={false}
				nestedScrollEnabled
			/>
			<BottomSheetContext.Provider value={{indexSheet: indexCommentSheet}}>
				<BottomSheet
					ref={commentSheetRef}
					index={-1}
					enablePanDownToClose
					snapPoints={['66%', '100%']}
					footerComponent={CommentBox}
					onChange={index => setIndexCommentSheet(index)}>
					{currentCommentPost && (
						<View style={styles.commentContainer}>
							<View style={styles.commentHeader}>
								<CustomText style={{fontSize: 22, fontFamily: 'Montserrat-600'}}>
									Comments
								</CustomText>
								<TouchableOpacity>
									<Icon
										type={Icons.Ionicons}
										name="ellipsis-horizontal"
										size={30}
										color={Colors.black}
									/>
								</TouchableOpacity>
							</View>
							<BottomSheetFlatList
								data={currentCommentPost.comments.sort(
									(c1, c2) => c1.commented_at - c2.commented_at,
								)}
								renderItem={({item}) => <Comment comment={item} />}
								keyExtractor={(_, index) => index}
								initialNumToRender={24}
								showsHorizontalScrollIndicator={false}
								nestedScrollEnabled
								contentContainerStyle={{paddingBottom: 120}}
							/>
						</View>
					)}
				</BottomSheet>
			</BottomSheetContext.Provider>
			<BottomSheet
				ref={moreSheetRef}
				index={-1}
				enablePanDownToClose
				snapPoints={['20%']}
				onChange={index => setIndexMoreSheet(index)}></BottomSheet>
		</SafeAreaView>
	);
};

const Header = ({handleAddNewPost, scrollToTop}) => {
	const [disabled, setDisabled] = useState(false);
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
						setDisabled(disabled => !disabled);
						setTimeout(() => setDisabled(disabled => !disabled), 500);
						handleAddNewPost();
					}}>
					<Icon type={Icons.MaterialCommunityIcons} name="pencil" size={30} color={Colors.black} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeTab;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.lychee,
		flex: 1,
	},
	header: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 24,
		paddingBottom: 5,
		marginTop: Platform.OS === 'android' ? 30 : 0,
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
});
