import {useState, useCallback} from 'react';
import {Vibration} from 'react-native';

const PRESETS = [
  {id: 'fatima', name: 'تسبیحِ فاطمہ زہراؑ', type: 'fatima'},
  {
    id: 'salawat',
    name: 'صلوات',
    type: 'single',
    text: 'اَللّٰھُمَّ صَلِّ عَلٰی مُحَمَّدٍ وَّآلِ مُحَمَّدٍ',
    defaultLimit: 100,
  },
  {
    id: 'istighfar',
    name: 'استغفار',
    type: 'single',
    text: 'اَسْتَغْفِرُ اللّٰہَ رَبِّی وَ اَتُوْبُ اِلَیْہِ',
    defaultLimit: 100,
  },
  {
    id: 'tauheed',
    name: 'لَا اِلٰہَ اِلَّا اللّٰہُ',
    type: 'single',
    text: 'لَا اِلٰہَ اِلَّا اللّٰہُ',
    defaultLimit: 100,
  },
  {
    id: 'subhanallah',
    name: 'سُبْحَانَ اللّٰہِ',
    type: 'single',
    text: 'سُبْحَانَ اللّٰہِ',
    defaultLimit: 100,
  },
  {
    id: 'alhamdulillah',
    name: 'اَلْحَمْدُ لِلّٰہِ',
    type: 'single',
    text: 'اَلْحَمْدُ لِلّٰہِ',
    defaultLimit: 100,
  },
  {
    id: 'allahuakbar',
    name: 'اَللّٰہُ اَکْبَرُ',
    type: 'single',
    text: 'اَللّٰہُ اَکْبَرُ',
    defaultLimit: 100,
  },
  {
    id: 'custom',
    name: 'کسٹم تسبیح',
    type: 'single',
    text: '',
    defaultLimit: 100,
  },
];

const useTasbih = () => {
  const [count, setCount] = useState(0);
  const [selectedPresetId, setSelectedPresetId] = useState('fatima');
  const [fatimaPhase, setFatimaPhase] = useState('allahu_akbar');
  const [customText, setCustomText] = useState('');
  const [customLimit, setCustomLimit] = useState('100');
  const [isCompleted, setIsCompleted] = useState(false);

  const increment = useCallback(() => {
    Vibration.vibrate(40);

    if (selectedPresetId === 'fatima') {
      if (fatimaPhase === 'allahu_akbar') {
        if (count < 34) {
          setCount(prev => prev + 1);
        } else {
          Vibration.vibrate([0, 80, 40, 80]);
          setCount(1);
          setFatimaPhase('alhamdulillah');
        }
      } else if (fatimaPhase === 'alhamdulillah') {
        if (count < 33) {
          setCount(prev => prev + 1);
        } else {
          Vibration.vibrate([0, 80, 40, 80]);
          setCount(1);
          setFatimaPhase('subhanallah');
        }
      } else if (fatimaPhase === 'subhanallah') {
        if (count < 33) {
          setCount(prev => prev + 1);
        } else {
          Vibration.vibrate([0, 100, 50, 100, 50, 100]);
          setFatimaPhase('completed');
        }
      }
    } else {
      const limit = parseInt(customLimit, 10) || 100;
      if (count < limit) {
        const nextCount = count + 1;
        setCount(nextCount);
        if (nextCount >= limit) {
          Vibration.vibrate([0, 100, 50, 100, 50, 100]);
          setIsCompleted(true);
        }
      }
    }
  }, [selectedPresetId, fatimaPhase, count, customLimit]);

  const reset = useCallback(() => {
    Vibration.vibrate(60);
    setCount(0);
    setFatimaPhase('allahu_akbar');
    setIsCompleted(false);
  }, []);

  const changePreset = useCallback(presetId => {
    Vibration.vibrate(40);
    setSelectedPresetId(presetId);
    setCount(0);
    setFatimaPhase('allahu_akbar');
    setIsCompleted(false);

    const preset = PRESETS.find(p => p.id === presetId);
    if (preset && preset.type === 'single') {
      setCustomText(preset.text);
      setCustomLimit(String(preset.defaultLimit));
    } else {
      setCustomText('');
      setCustomLimit('100');
    }
  }, []);

  return {
    count,
    selectedPresetId,
    fatimaPhase,
    customText,
    setCustomText,
    customLimit,
    setCustomLimit,
    isCompleted,
    increment,
    reset,
    changePreset,
    PRESETS,
  };
};

export default useTasbih;
