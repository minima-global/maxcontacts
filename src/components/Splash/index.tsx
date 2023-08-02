import * as React from 'react';
import onboardingIcon from '../../assets/onboardingIcon.svg';
import minimaLogo from '../../assets/minima_logo.svg';
import getAppUID from '../../utilities/getAppUID';

const Splash = () => {
  const localStorageItemName = '__maxContacts_splash';
  const [displaySplash, setDisplaySplash] = React.useState(false);

  React.useEffect(() => {
    const appUID = getAppUID();
    const splash = localStorage.getItem(localStorageItemName);

    if (!splash || splash !== appUID) {
      setDisplaySplash(true);
    }
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const appUID = getAppUID();
      setDisplaySplash(false);
      localStorage.setItem(localStorageItemName, appUID);
    }, 1800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 bg-white w-screen h-full z-10 splash ${displaySplash ? '' : 'splash--hidden'}`}>
      <div className="grid grid-rows-6 h-full">
        <div className="row-span-1"></div>
        <div className="row-span-4 flex items-center justify-center">
          <img src={onboardingIcon} width={135} alt="Onboarding icon" />
        </div>
        <div className="row-span-2 flex items-center justify-center">
          <img src={minimaLogo} width={145} alt="Minima Logo" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
