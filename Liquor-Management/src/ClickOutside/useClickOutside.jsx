import {useEffect} from 'react';

const useClickOutside = (ref, handler) => {

  useEffect(() => {
    const listener = (e) => {
      // If the ref is not displayed or if clicked on the ref dont call the handler
      if (!ref.current || ref.current.contains(e.target)){
        return;
      }
      // else if ref is displayed and clicked outside of it call the handler
      handler(e);
    };

    document.addEventListener('mousedown',listener);
    document.addEventListener('touchstart',listener);

    return () => {
      document.removeEventListener('mousedown',listener);
      document.removeEventListener('touchstart',listener);
    };
  },[ref,handler]);
  
};

export default useClickOutside;