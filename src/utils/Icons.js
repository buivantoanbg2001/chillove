import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import RNIMigration from 'react-native-vector-icons/RNIMigration';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const Icons = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Feather: Feather,
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  FontAwesome5Pro: FontAwesome5Pro,
  Fontisto: Fontisto,
  Foundation: Foundation,
  Ionicons: Ionicons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Octicons: Octicons,
  RNIMigration: RNIMigration,
  SimpleLineIcons: SimpleLineIcons,
  Zocial: Zocial,
};

const Icon = props => {
  const IconType = props.type;

  return <IconType {...props} />;
};

export {Icons};
export default Icon;
