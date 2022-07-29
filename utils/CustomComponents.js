import {StyleSheet, Text, View, Image} from 'react-native';
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

export {CustomText, CustomView, CustomImage};

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
