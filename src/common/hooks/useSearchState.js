import {useState} from 'react';

const useSearchState = () => {
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearch = () => {
    setIsSearching(prev => !prev);
  };

  const closeSearch = () => {
    setIsSearching(false);
  };

  const openSearch = () => {
    setIsSearching(true);
  };

  return {
    isSearching,
    setIsSearching,
    toggleSearch,
    closeSearch,
    openSearch,
  };
};

export default useSearchState;
