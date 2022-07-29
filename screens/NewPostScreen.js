import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../utils/Button';
import posts from '../data/posts';
import {CustomText, CustomView} from '../utils/CustomComponents';
import Icon, {Icons} from '../utils/Icons';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const PADDING = 16;
const MARGIN = 24;

const colorSet = [
  {
    background: Colors.grape_fruit_bg,
    text: Colors.grape_fruit,
    blur: Colors.grape_fruit_blur,
  },
  {
    background: Colors.tangerine_bg,
    text: Colors.tangerine,
    blur: Colors.tangerine_blur,
  },
  {
    background: Colors.spinach_bg,
    text: Colors.spinach,
    blur: Colors.spinach_blur,
  },
];

const NewPostScreen = ({navigation}) => {
  const [privatePost, setPrivatePost] = useState(false);
  const [random, setRandom] = useState([0, 1, 2]);

  useEffect(() => {
    const tmp = [];
    for (var i = 0; i < 3; i++) {
      tmp.push(Math.floor(Math.random() * 3));
    }
    setRandom(tmp);
  }, []);

  const addNewPost = () => {
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then(image => {
        if (image != null) {
          console.log(image);
        }
      })
      .catch(e => {
        if (e.code == 'E_PICKER_CANCELLED') {
          console.log(
            'Sorry, there was an issue attempting to get the image/video you selected. Please try again',
          );
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
        {/* <Button solid title={'Open'} onPress={openGallery} /> */}
        <View style={styles.containerElement}>
          <Image
            source={{uri: 'https://i.imgur.com/MeKBRsb.png'}}
            style={[StyleSheet.absoluteFillObject, {opacity: 0.3}]}
            blurRadius={23}
          />
          <View
            style={{
              marginHorizontal: MARGIN - PADDING,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="document-text-outline"
              size={14}
              color={Colors.black}
            />
            <CustomText
              style={{
                color: Colors.black,
                fontFamily: 'Montserrat-600',
                marginLeft: 8,
              }}>
              Caption
            </CustomText>
          </View>
          <TextInput
            style={styles.caption}
            selectionColor={Colors.black_blur7}
            placeholderTextColor={Colors.black_blur3}
            placeholder=" ... I❤U ... "
            multiline
            autoFocus={true}
            // onChangeText={}
          />
        </View>

        <View
          style={[
            styles.containerElement,
            {
              width: width - MARGIN,
              marginRight: 0,
              paddingRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}>
          <Image
            source={{uri: 'https://i.imgur.com/MeKBRsb.png'}}
            style={[StyleSheet.absoluteFillObject, {opacity: 0.3}]}
            blurRadius={23}
          />
          <View
            style={{
              marginHorizontal: MARGIN - PADDING,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons name="camera-outline" size={14} color={Colors.black} />
            <CustomText
              style={{
                color: Colors.black,
                fontFamily: 'Montserrat-600',
                marginLeft: 8,
              }}>
              Add Photos/Videos
            </CustomText>
          </View>

          <View style={styles.paginationNumber}>
            <CustomText
              style={{
                fontSize: 12,
                color: Colors.grape_fruit,
                fontFamily: 'Montserrat-700',
              }}>
              {Math.max(7, 0)}
              <CustomText style={{fontSize: 8}}> / {23}</CustomText>
            </CustomText>
          </View>

          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 84,
                height: 84,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.white_blur7,
                borderRadius: 28,
                marginRight: 8,
              }}
              onPress={openGallery}>
              <Ionicons
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
              data={posts[0].image_urls}
              renderItem={({item}) => (
                <Image
                  source={{uri: item}}
                  style={{
                    width: 84,
                    height: 84,
                    marginHorizontal: 4,
                  }}
                />
              )}
              keyExtractor={(_, index) => index}
              initialNumToRender={24}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={[styles.containerElement, {width: width - MARGIN * 4}]}>
          <Image
            source={{uri: 'https://i.imgur.com/MeKBRsb.png'}}
            style={[StyleSheet.absoluteFillObject, {opacity: 0.3}]}
            blurRadius={23}
          />

          <View
            style={{
              marginHorizontal: MARGIN - PADDING,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="lock-closed-outline"
              size={14}
              color={Colors.black}
            />
            <CustomText
              style={{
                color: Colors.black,
                fontFamily: 'Montserrat-600',
                marginLeft: 8,
              }}>
              Private Post
            </CustomText>
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
          style={{
            marginTop: 40,
            marginBottom: 32,
            marginHorizontal: MARGIN * 3,
          }}
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
  containerElement: {
    padding: PADDING,
    width: width - MARGIN * 2,
    marginHorizontal: MARGIN,
    marginVertical: PADDING,
    borderRadius: 32,
    overflow: 'hidden',
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
  paginationNumber: {
    position: 'absolute',
    top: 17,
    right: MARGIN,
    paddingHorizontal: 6,
    paddingBottom: 1,
    borderRadius: 8,
    backgroundColor: Colors.white_blur7,
  },
  switch: {
    position: 'absolute',
    top: 12,
    right: PADDING,
  },
  headerText: {
    color: Colors.grape_fruit,
    fontSize: 24,
    fontFamily: 'Montserrat-600',
    paddingBottom: 5,
  },
});
