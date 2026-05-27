import { useRef, useState } from 'react';

export const useAutoScroll = (offset = 12) => {
  const scrollViewRef = useRef(null);
  const [positions, setPositions] = useState({});

  const handleLayout = (id, event) => {
    const { y } = event.nativeEvent.layout;
    setPositions((prev) => ({ ...prev, [id]: y }));
  };

  const handleOpen = (id) => {
    const yPos = positions[id];
    if (yPos !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, yPos - offset), animated: true });
    }
  };

  return {
    scrollViewRef,
    handleLayout,
    handleOpen,
  };
};

export default useAutoScroll;
