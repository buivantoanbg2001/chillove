import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  Dimensions,
} from 'react-native';
import Colors from '../utils/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, CustomText} from '../utils/CustomComponents';
import Icon, {Icons} from '../utils/Icons';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');
const PADDING = 16;
const MARGIN = 24;

const NewPostScreen = ({navigation}) => {
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState([]);
  const [privatePost, setPrivatePost] = useState(false);

  const addNewPost = () => {
    /**
     * @todo Add post to Firebase
     * @success navigation.goBack();
     * @error showToast("Post failed")
     */
  };

  const goBack = () => {
    /**
     * @todo Warning the current post will be not saved
     * @success navigation.goBack();
     * @error Do not do anything
     */
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then(image => {
        if (image != null) {
          setPostImage(image);
        }
      })
      .catch(e => {
        console.log('Error code', e.code);

        if (e.code == 'E_PICKER_CANCELLED') {
          setPostImage([]);
        }
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
      <Header addNewPost={addNewPost} goBack={goBack} />
      <ScrollView>
        <View style={styles.elementContainer}>
          <View style={styles.elementHeader}>
            <Icon
              type={Icons.Ionicons}
              name="document-text-outline"
              size={14}
              color={Colors.black}
            />
            <CustomText style={styles.elementTitle}>Caption</CustomText>
          </View>
          <TextInput
            style={styles.caption}
            selectionColor={Colors.black_blur7}
            placeholderTextColor={Colors.black_blur3}
            placeholder=" ... I❤U ... "
            multiline
            autoFocus={true}
            value={caption}
            onChangeText={text => setCaption(text)}
          />
        </View>

        <View
          style={[
            styles.elementContainer,
            {
              width: width - MARGIN,
              marginRight: 0,
              paddingRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}>
          <View style={styles.elementHeader}>
            <Icon
              type={Icons.Ionicons}
              name="camera-outline"
              size={14}
              color={Colors.black}
            />
            <CustomText style={styles.elementTitle}>
              Add Photos/Videos
            </CustomText>
          </View>

          <View style={styles.paginationNumber}>
            <CustomText style={styles.imagePostCount}>
              {postImage.length}
              <CustomText style={{fontSize: 8}}> / {23}</CustomText>
            </CustomText>
          </View>

          <View
            style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.openGalleryButton}
              onPress={openGallery}>
              <Icon
                type={Icons.Ionicons}
                name="camera-outline"
                size={36}
                color={Colors.grape_fruit}
              />
            </TouchableOpacity>
            <FlatList
              contentContainerStyle={{
                paddingRight: MARGIN - 4,
                paddingLeft: PADDING - 8 - 4,
              }}
              horizontal
              data={postImage}
              renderItem={({item}) => (
                <Image source={{uri: item.path}} style={styles.postImage} />
              )}
              keyExtractor={(_, index) => index}
              initialNumToRender={24}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={[styles.elementContainer, {width: width - MARGIN * 4}]}>
          <View style={styles.elementHeader}>
            <Icon
              type={Icons.Ionicons}
              name="lock-closed-outline"
              size={14}
              color={Colors.black}
            />
            <CustomText style={styles.elementTitle}>Private Post</CustomText>
          </View>

          <Switch
            style={styles.switch}
            trackColor={{
              false: Colors.white_blur5,
              true: Colors.grape_fruit_blur,
            }}
            thumbColor={privatePost ? Colors.grape_fruit : Colors.white}
            ios_backgroundColor={Colors.white_blur5}
            onChange={() => setPrivatePost(!privatePost)}
            value={privatePost}
          />
        </View>

        <Button
          solid
          title="POST"
          style={styles.postButton}
          onPress={addNewPost}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({addNewPost, goBack}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <Icon
          type={Icons.Octicons}
          name="chevron-left"
          size={34}
          color={Colors.black}
        />
      </TouchableOpacity>
      <CustomText style={styles.headerText}>New Post</CustomText>
      <TouchableOpacity onPress={addNewPost}>
        <Icon
          type={Icons.Octicons}
          name="check"
          size={34}
          color={Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elementContainer: {
    padding: PADDING,
    width: width - MARGIN * 2,
    marginHorizontal: MARGIN,
    marginVertical: PADDING,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: Colors.white_blur5,
  },
  elementHeader: {
    marginHorizontal: MARGIN - PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementTitle: {
    fontFamily: 'Montserrat-600',
    marginLeft: 8,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    height: 90,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  caption: {
    fontFamily: 'Montserrat-500',
    color: Colors.grape_fruit,
    backgroundColor: Colors.white_blur7,
    borderRadius: 24,
    padding: 12,
    minHeight: 80,
    maxHeight: 120,
    textAlignVertical: 'top',
    marginTop: MARGIN - PADDING,
  },
  openGalleryButton: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white_blur7,
    borderRadius: 28,
    marginRight: 8,
  },
  imagePostCount: {
    fontSize: 12,
    color: Colors.grape_fruit,
    fontFamily: 'Montserrat-700',
  },
  paginationNumber: {
    position: 'absolute',
    top: 17,
    right: MARGIN,
    paddingHorizontal: 6,
    paddingBottom: 1,
    borderRadius: 8,
    backgroundColor: Colors.white_blur7,
  },
  postImage: {
    width: 84,
    height: 84,
    marginHorizontal: 4,
  },
  switch: {
    position: 'absolute',
    top: 12,
    right: PADDING,
  },
  postButton: {
    marginTop: 40,
    marginBottom: 32,
    marginHorizontal: MARGIN * 3,
  },
  headerText: {
    color: Colors.grape_fruit,
    fontSize: 24,
    fontFamily: 'Montserrat-600',
    paddingBottom: 5,
  },
});
