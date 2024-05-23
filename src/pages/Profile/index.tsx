import { useContext, useEffect, useState } from 'react';
import Clipboard from 'react-clipboard.js';
import clipboard from '../../assets/clipboard.svg';
import greenTick from '../../assets/green_tick.svg';
import { appContext } from '../../AppContext';
import chevron from '../../assets/chevron.svg';
import ConnectToMasterNodeModal from '../ConnectToMasterNodeModal';
import DisconnectFromMasterNodeModal from '../DisconnectFromMasterNodeModal';

import QRCode from "react-qr-code";
import BiggerQrCode from '../../components/BiggerQRCode';
import renderIcon from '../../utilities/renderIcon';


function Profile() {
  const { _maxima, _address, getMaxima, getMinimaAddress, _notification, promptNotification, promptChangeDisplayName, _setShowAddStaticMLS, _setShowRemoveStaticMLS } = useContext(appContext);
  const hasCopied = _notification.message === 'You have copied your maxima address! ';
  const hasCopiedMaximaAddress = _notification.message === 'You have copied your maxima address!';
  const hasCopiedMinimaAddress = _notification.message === 'You have copied your minima address!';
  const hasCopiedStaticMLSAddress = _notification.message === 'You have copied your static MLS address!';
  const [loaded, setLoaded] = useState(false);
  const [showSection, setShowSection] = useState<string | null>('myMaximaAddress');
  const [_promptQrCode, setPromptQrCode] = useState(false);

  useEffect(() => { 
    if (!loaded) {
      getMaxima();
      getMinimaAddress();
      setLoaded(true);
    }
  }, [loaded, getMinimaAddress, getMaxima]);

  const copyShare = () => {
    promptNotification('You have copied your maxima address!');
  };

  // const copyMinimaAddress = () => {
  //   promptNotification('You have copied your minima address!');
  // };

  const copyMaximaAddress = () => {
    promptNotification('You have copied your maxima address! ');
  };

  const copyStaticMLSAddress = () => {
    promptNotification('You have copied your static MLS address!');
  };

  const toggleShowSection = (section: string) => {
    setShowSection((prevState) => (prevState === section ? null : section));
  };

  const setStaticMLS = () => {
    _setShowAddStaticMLS(true);
  }

  const removeStaticMLS = () => {
    _setShowRemoveStaticMLS(true);
  }
  const promptQrCode = () => {
    setPromptQrCode(prevState => !prevState);
  }
  


  return (
    <>
      <ConnectToMasterNodeModal />
      <DisconnectFromMasterNodeModal />
      <div className="p-5 bg-white" />
      <div className="bg-white p-4 px-6 pt-0">        
        {_maxima.contact && (
        <BiggerQrCode
          data={_maxima.contact}
          dismiss={promptQrCode}
          active={_promptQrCode}
        />
      )}
        <div className="grid grid-cols-[auto_1fr]">        
          
          <div className="mr-2">
            {renderIcon(_maxima)}
          </div>

          <div className="my-auto">
            <div>
              {_maxima && <input value={_maxima.name} readOnly className='truncate focus:outline-none font-bold bg-transparent' />}
              <p onClick={promptChangeDisplayName} className="cursor-pointer text-xs text-custom-grey">
                Edit profile
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-1">
          <Clipboard className="w-full" data-clipboard-text={_maxima && _maxima.contact} onClick={copyShare}>
            <div className={`text-white w-full text-base font-bold py-3 rounded-xl ${hasCopiedMaximaAddress ? 'bg-custom-green' : 'bg-custom-purple'}`}>
              {hasCopiedMaximaAddress ? 'Copied my address' : 'Share contact'}
            </div>
          </Clipboard>
          <div className='my-auto'><div onClick={promptQrCode}><QRCode className='rounded shadow-lg shadow-violet-300' size={42} value={_maxima.contact} /></div></div>
        </div>
        <div className="mt-3">
          {_maxima && _maxima.staticmls && (
            <button onClick={removeStaticMLS} className={`text-white w-full text-base font-bold py-3 rounded-xl bg-slate-600`}>
              Disconnect static MLS
            </button>
          )}
          {_maxima && !_maxima.staticmls && (
            <button onClick={setStaticMLS} className={`text-white w-full text-base font-bold py-3 rounded-xl bg-custom-purple`}>
              Connect Static MLS
            </button>
          )}
        </div>
      </div>
      <div className="my-4">
        <div className="bg-custom-grey px-5">
          <div className="cursor-pointer py-6 px-5 flex" onClick={() => toggleShowSection('myMaximaAddress')}>
            <div className="text-sm font-bold">My Maxima address</div>
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'myMaximaAddress' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {showSection === 'myMaximaAddress' && (
            <div className="pb-5 px-5 text-xs flex">
              <div className="break-all">{_maxima && _maxima.contact}</div>
              <div className="grow w-full flex justify-end items-start">
                <Clipboard data-clipboard-text={_maxima && _maxima.contact} onClick={copyMaximaAddress}>
                  <div>
                    {hasCopied ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                  </div>
                </Clipboard>
              </div>
            </div>
          )}
          {_maxima && _maxima.staticmls && (
            <>
              <hr />
              <div className="cursor-pointer py-6 px-5 flex" onClick={() => toggleShowSection('myStaticMLS')}>
                <div className="text-sm font-bold">My Static MLS address</div>
                <div className="grow flex items-center justify-end">
                  <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'myStaticMLS' ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {showSection === 'myStaticMLS' && (
                <div className="pb-5 px-5 text-xs flex">
                  <div className="break-all">{_maxima && _maxima.mls}</div>
                  <div className="grow w-full flex justify-end items-start">
                    <Clipboard data-clipboard-text={_maxima && _maxima.mls} onClick={copyStaticMLSAddress}>
                      <>
                        {hasCopiedStaticMLSAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                      </>
                    </Clipboard>
                  </div>
                </div>
              )}
            </>
          )}
          <hr />
          <div className="py-6 px-5 flex" onClick={() => toggleShowSection('myMinimaAddress')}>
            <div className="text-sm font-bold">My Minima address</div>
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'myMinimaAddress' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {showSection === 'myMinimaAddress' && (
            <div className="pb-7 px-5 text-xs flex">
              <div className="grow break-all mr-5">{_address && _address.miniaddress}</div>
              <div className="flex justify-end items-start w-10">
                <Clipboard data-clipboard-text={_address && _address.miniaddress} onClick={copyStaticMLSAddress}>
                  <div>
                    {hasCopiedMinimaAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                  </div>
                </Clipboard>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
