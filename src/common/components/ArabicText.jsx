import React from 'react';
import {Text} from 'react-native';
import {useSettings} from '../../context/SettingsContext';

const ArabicText = ({children, className = '', style, ...props}) => {
  const {arabicFontSize, showArabic} = useSettings();

  if (!showArabic) {
    return null;
  }

  return (
    <Text
      className={`font-quran-content text-center ${className}`}
      style={[{fontSize: arabicFontSize}, style]}
      {...props}>
      {children}
    </Text>
  );
};

export default ArabicText;
