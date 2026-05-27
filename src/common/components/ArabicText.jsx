import React from 'react';
import {Text} from 'react-native';

const ArabicText = ({children, className = '', style, ...props}) => {
  return (
    <Text
      className={`font-quran-content text-center ${className}`}
      style={style}
      {...props}>
      {children}
    </Text>
  );
};

export default ArabicText;
