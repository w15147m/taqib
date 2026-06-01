import {useLocationContext} from '../../context/LocationContext';

const useLocation = () => {
  return useLocationContext();
};

export default useLocation;
