import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TextInputProps,
} from 'react-native';
import React from 'react';
import Colors from './Colors';

const CustomText = props => {
  return (
    <Text {...props} style={[styles.defaultText, props.style]}>
      {props.children}
    </Text>
  );
};

const CustomView = props => {
  return (
    <View {...props} style={[styles.defaultView, props.style]}>
      {props.children}
    </View>
  );
};

const CustomImage = props => {
  return (
    <Image {...props} style={[styles.defaultImage, props.style]}>
      {props.children}
    </Image>
  );
};

const CustomTextInput = ({...props}) => {
  return (
    <TextInput
      style={[styles.defaultText, props.style]}
      placeholderTextColor={props.placeholderTextColor || Colors.gray}
      selectionColor={props.selectionColor || Colors.black_blur4}>
      {props.children}
    </TextInput>
  );
};

export {CustomText, CustomView, CustomImage, CustomTextInput};

const styles = StyleSheet.create({
  defaultText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Montserrat-500',
  },
  defaultView: {
    backgroundColor: Colors.lychee,
    borderRadius: 32,
    elevation: 8,
    shadowColor: Colors.black_blur5,
  },
  defaultImage: {
    borderRadius: 32,
  },
});
