import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  createContext,
} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
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
  const [postCurrent, setPostCurrent] = useState();
  const [indexSheet, setIndexSheet] = useState(-1);
  const flatListRef = useRef(null);
  const sheetRef = useRef(null);
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => ['66%', '100%'], []);

  useBackHandler(() => {
    if (indexSheet >= 0) {
      sheetRef.current.close();
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
    setPostCurrent(post);
    sheetRef.current.snapToIndex(0);
    setTabBarStyle(0, 150);
  };

  const closeComment = () => {
    setTabBarStyle(1, 0);
  };

  const handleSheetChanges = useCallback(index => {
    setIndexSheet(index);
  }, []);

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
        renderItem={({item}) => <Post post={item} openComment={openComment} />}
        keyExtractor={(_, index) => index}
        initialNumToRender={24}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      />
      <BottomSheetContext.Provider value={{indexSheet: indexSheet}}>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          enablePanDownToClose
          snapPoints={snapPoints}
          footerComponent={CommentBox}
          onChange={handleSheetChanges}
          onClose={closeComment}>
          {postCurrent && (
            <View style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                <CustomText
                  style={{fontSize: 22, fontFamily: 'Montserrat-600'}}>
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
                data={postCurrent.comments.sort(
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
    </SafeAreaView>
  );
};

const Header = ({handleAddNewPost, scrollToTop}) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={scrollToTop} activeOpacity={0.5}>
        <Image
          source={require('../../assets/images/header-logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.icon}>
          <Icon
            type={Icons.Ionicons}
            name="search"
            size={30}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          disabled={disabled}
          onPress={() => {
            setDisabled(disabled => !disabled);
            setTimeout(() => setDisabled(disabled => !disabled), 500);
            handleAddNewPost();
          }}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="pencil"
            size={30}
            color={Colors.black}
          />
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
