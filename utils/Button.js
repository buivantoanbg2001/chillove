import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import Colors from './Colors';
import {CustomText} from './CustomComponents';
import LinearGradient from 'react-native-linear-gradient';

const Button = props => {
  return props.solid ? (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      disabled={props.disable}>
      {props.title && (
        <LinearGradient
          start={{x: 0.3, y: -1}}
          end={{x: 0.7, y: 2}}
          style={[
            styles.solid,
            props.style,
            props.disable ? {opacity: 0.2} : null,
          ]}
          colors={[Colors.light_grape_fruit, Colors.dark_grape_fruit]}>
          <CustomText style={[styles.titleSolidButton]}>
            {props.title}
          </CustomText>
        </LinearGradient>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.disable ? {opacity: 0.2} : null,
      ]}
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      disabled={props.disable}>
      {props.source &&
        (props.iconAnimStyle ? (
          <Animated.Image
            source={props.source}
            style={[props.iconStyle, props.iconAnimStyle]}
          />
        ) : (
          <Image source={props.source} style={props.iconStyle} />
        ))}

      {props.title && (
        <View style={{marginStart: props.gap || 0}}>
          <CustomText style={[styles.title, props.titleStyle]}>
            {props.title}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: Colors.grape_fruit,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSolidButton: {
    color: Colors.lychee,
    fontSize: 18,
  },
  title: {
    color: 'red',
    fontSize: 14,
  },
  disable: {
    opacity: 0.2,
  },
});
