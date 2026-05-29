import {useSettings} from '../../../context/SettingsContext';

export const useSettingsLogic = () => {
  const settings = useSettings();
  const {arabicFontSize, urduFontSize, setArabicFontSize, setUrduFontSize} =
    settings;

  const adjustFontSize = (type, action) => {
    if (type === 'arabic') {
      const next =
        action === 'increment' ? arabicFontSize + 2 : arabicFontSize - 2;
      setArabicFontSize(Math.max(16, Math.min(50, next)));
    } else {
      const next = action === 'increment' ? urduFontSize + 1 : urduFontSize - 1;
      setUrduFontSize(Math.max(12, Math.min(30, next)));
    }
  };

  return {
    ...settings,
    adjustFontSize,
  };
};

export default useSettingsLogic;
