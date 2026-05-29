import {useState, useCallback} from 'react';
import {Vibration} from 'react-native';

const useTasbih = () => {
  const [count, setCount] = useState(0);
  const [fatimaPhase, setFatimaPhase] = useState('allahu_akbar');

  const increment = useCallback(() => {
    Vibration.vibrate(40);

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
  }, [fatimaPhase, count]);

  const reset = useCallback(() => {
    Vibration.vibrate(60);
    setCount(0);
    setFatimaPhase('allahu_akbar');
  }, []);

  return {count, fatimaPhase, increment, reset};
};

export default useTasbih;
