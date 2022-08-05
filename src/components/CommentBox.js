import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import {CustomText, CustomTextInput} from '../utils/CustomComponents';
import Icon, {Icons} from '../utils/Icons';
import Colors from '../utils/Colors';

const CommentBox = ({animatedFooterPosition}) => {
  const {bottom: bottomSafeArea} = useSafeAreaInsets();

  return (
    <BottomSheetFooter
      bottomInset={bottomSafeArea}
      animatedFooterPosition={animatedFooterPosition}
      style={styles.background}>
      <CustomTextInput
        style={styles.textInput}
        placeholder="Leave a comment..."
      />
      <TouchableOpacity style={styles.addButton}>
        <Icon
          type={Icons.Feather}
          name="arrow-up"
          size={20}
          color={Colors.white}
        />
      </TouchableOpacity>
    </BottomSheetFooter>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.white,
    borderTopWidth: 0.2,
    borderTopColor: Colors.black_blur4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  textInput: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    backgroundColor: Colors.lychee,
    flex: 1,
  },
  addButton: {
    backgroundColor: Colors.grape_fruit,
    width: 32,
    height: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
