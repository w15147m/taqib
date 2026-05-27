import React from 'react';
import { Text } from 'react-native';

const ContentText = ({ children, className = '', style, ...props }) => {
  return (
    <Text
      className={`font-quran-content text-center ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ContentText;
