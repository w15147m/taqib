import React from 'react';
import {Text} from 'react-native';
import {useSettings} from '../../context/SettingsContext';

const UrduText = ({children, className = '', style, ...props}) => {
  const {urduFontSize, showTranslation} = useSettings();

  if (!showTranslation) {
    return null;
  }

  return (
    <Text
      className={`text-slate-500 dark:text-slate-400 text-sm font-semibold text-right my-2 leading-6 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 ${className}`}
      style={[{fontSize: urduFontSize}, style]}
      {...props}>
      {children}
    </Text>
  );
};

export default UrduText;
