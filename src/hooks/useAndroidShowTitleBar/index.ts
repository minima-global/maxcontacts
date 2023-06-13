import { useEffect, useState } from 'react';

const useAndroidShowTitleBar = () => {
  const [isMinimaBrowser, setIsMinimaBrowser] = useState(false);

  const openTitleBar = () => {
    if (!isMinimaBrowser) return;
    // @ts-ignore
    Android.showTitleBar();
  };

  useEffect(() => {
    if ((window as any).navigator.userAgent.includes('Minima Browser')) {
      setIsMinimaBrowser(true);
    }
  }, []);

  return openTitleBar;
};

export default useAndroidShowTitleBar;
