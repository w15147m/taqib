import React, {createContext, useContext, useState, useEffect} from 'react';
import {getItem, setItem} from '../utils/storage';

const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showArabic, setShowArabic] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState(30);
  const [urduFontSize, setUrduFontSize] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedShowTranslation = await getItem('show_translation');
      const savedShowArabic = await getItem('show_arabic');
      const savedArabicFontSize = await getItem('arabic_font_size');
      const savedUrduFontSize = await getItem('urdu_font_size');

      if (savedShowTranslation !== null) {
        setShowTranslation(savedShowTranslation);
      }
      if (savedShowArabic !== null) {
        setShowArabic(savedShowArabic);
      }
      if (savedArabicFontSize !== null) {
        setArabicFontSize(savedArabicFontSize);
      }
      if (savedUrduFontSize !== null) {
        setUrduFontSize(savedUrduFontSize);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateShowTranslation = async val => {
    setShowTranslation(val);
    await setItem('show_translation', val);
  };

  const updateShowArabic = async val => {
    setShowArabic(val);
    await setItem('show_arabic', val);
  };

  const updateArabicFontSize = async size => {
    setArabicFontSize(size);
    await setItem('arabic_font_size', size);
  };

  const updateUrduFontSize = async size => {
    setUrduFontSize(size);
    await setItem('urdu_font_size', size);
  };

  const resetSettings = async () => {
    setShowTranslation(true);
    setShowArabic(true);
    setArabicFontSize(30);
    setUrduFontSize(16);

    await setItem('show_translation', true);
    await setItem('show_arabic', true);
    await setItem('arabic_font_size', 30);
    await setItem('urdu_font_size', 16);
  };

  return (
    <SettingsContext.Provider
      value={{
        showTranslation,
        showArabic,
        arabicFontSize,
        urduFontSize,
        setShowTranslation: updateShowTranslation,
        setShowArabic: updateShowArabic,
        setArabicFontSize: updateArabicFontSize,
        setUrduFontSize: updateUrduFontSize,
        resetSettings,
        loading,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
