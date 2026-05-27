import React from 'react';
import { Text } from 'react-native';

const HeaderText = ({ children, className = '', style, ...props }) => {
  return (
    <Text
      className={`font-quran-header text-right ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};

export default HeaderText;
