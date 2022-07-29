import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import posts from '../data/posts';
import Colors from '../utils/Colors';
import Post from '../components/Post';
import Icon, {Icons} from '../utils/Icons';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Button from '../utils/Button';
import {CustomText} from '../utils/CustomComponents';
import {useDispatch, useSelector} from 'react-redux';
import Comment from '../components/Comment';

const {width, height} = Dimensions.get('window');
const MARGIN = 24;
const PADDING = 16;

const HomeTab = ({navigation}) => {
  const [postCurrent, setPostCurrent] = useState();
  const flatListRef = useRef(null);
  const sheetRef = React.useRef(null);

  const dispatch = useDispatch();

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const handleAddNewPost = () => {
    navigation.push('NewPostScreen');
  };

  const openComment = post => {
    setPostCurrent(post);
    sheetRef.current.snapTo(1);
    setTabBarStyle(0, 150);
  };

  const renderContent = () =>
    postCurrent && (
      <View style={styles.commentContainer}>
        <View style={styles.horizontalIndicator} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: MARGIN / 2,
            paddingHorizontal: MARGIN,
          }}>
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
        <FlatList
          data={postCurrent.comments.sort(
            (c1, c2) => c1.commented_at - c2.commented_at,
          )}
          renderItem={({item}) => <Comment comment={item} />}
          keyExtractor={(_, index) => index}
          initialNumToRender={24}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        />
      </View>
    );

  const setTabBarStyle = (opacity, translateY) => {
    dispatch({
      type: 'SET_TAB_BAR_STYLE',
      payload: {
        opacity: opacity,
        translateY: translateY,
      },
    });
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
        renderItem={({item}) => <Post post={item} openComment={openComment} />}
        keyExtractor={(_, index) => index}
        initialNumToRender={24}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      />

      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={['90%', '66%', 0]}
        borderRadius={42}
        renderContent={renderContent}
        onCloseEnd={() => setTabBarStyle(1, 0)}
      />
    </SafeAreaView>
  );
};

const Header = ({handleAddNewPost, scrollToTop}) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={scrollToTop} activeOpacity={0.5}>
        <Image
          source={require('../assets/images/header-logo.png')}
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
