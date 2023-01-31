import * as React from 'react';
import { useEffect, useState } from 'react';
import onboardingIcon from '../../assets/onboardingIcon.svg';
import minimaLogo from '../../assets/minima_logo.svg';

const Splash = () => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 1500);
  }, [display]);

  return (
    <div className={`fixed top-0 left-0 bg-white w-screen h-screen z-10 splash ${display ? '' : 'splash--hidden'}`}>
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
  )
}

export default Splash;
