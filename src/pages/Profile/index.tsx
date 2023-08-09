import { useContext, useEffect, useState } from 'react';
import Clipboard from 'react-clipboard.js';
import link from '../../assets/link.svg';
import clipboard from '../../assets/clipboard.svg';
import greenTick from '../../assets/green_tick.svg';
import signal from '../../assets/signal_cellular_alt.svg';
import { appContext } from '../../AppContext';
import chevron from '../../assets/chevron.svg';
import SetStaticMLSModal from '../SetStaticMLS';

function Profile() {
  const { _maxima, _address, getMaxima, getMinimaAddress, _notification, promptNotification, promptChangeDisplayName, _setShowAddStaticMLS } = useContext(appContext);
  const hasCopied = _notification.message === 'You have copied your maxima address! ';
  const hasCopiedMaximaAddress = _notification.message === 'You have copied your maxima address!';
  const hasCopiedMinimaAddress = _notification.message === 'You have copied your minima address!';
  const hasCopiedStaticMLSAddress = _notification.message === 'You have copied your static MLS address!';
  const [loaded, setLoaded] = useState(false);
  const [showSection, setShowSection] = useState<string | null>('myMaximaAddress');

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

  const copyMinimaAddress = () => {
    promptNotification('You have copied your minima address!');
  };

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

  return (
    <>
      <SetStaticMLSModal />
      <div className="p-5 bg-white" />
      <div className="bg-white p-4 px-6">
        <div className="flex items-stretch">
          {_maxima && <div className="avatar mr-4">{_maxima.name[0]}</div>}
          <div className="flex items-center">
            <div>
              {_maxima && <div className="font-bold text-md mb-1">{_maxima.name}</div>}
              <p onClick={promptChangeDisplayName} className="cursor-pointer text-xs text-custom-grey">
                Edit display name
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Clipboard className="w-full" data-clipboard-text={_maxima && _maxima.contact} onClick={copyShare}>
            <button className={`text-white w-full text-base font-bold py-3 rounded rounded-xl ${hasCopiedMaximaAddress ? 'bg-custom-green' : 'bg-custom-purple'}`}>
              {hasCopiedMaximaAddress ? 'Copied my address' : 'Share contact'}
            </button>
          </Clipboard>
        </div>
        <div className="mt-3">
          <button onClick={setStaticMLS} className={`text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple`}>
            Set Static MLS
          </button>
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
                    {hasCopiedStaticMLSAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                  </div>
                </Clipboard>
              </div>
            </div>
          )}
          {/*{_maxima && _maxima.staticmls && (*/}
          {/*  <>*/}
          {/*    <div className="cursor-pointer py-6 px-5 flex" onClick={() => toggleShowSection('myStaticMLS')}>*/}
          {/*      <div className="text-sm font-bold">My static MLS address</div>*/}
          {/*      <div className="grow flex items-center justify-end">*/}
          {/*        <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'myStaticMLS' ? 'rotate-180' : ''}`} />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    {showSection === 'myStaticMLS' && (*/}
          {/*      <div className="pb-5 px-5 text-xs flex">*/}
          {/*        <div className="break-all">{_maxima && _maxima.contact}</div>*/}
          {/*        <div className="grow w-full flex justify-end items-start">*/}
          {/*          <Clipboard data-clipboard-text={_maxima && _maxima.mls} onClick={copyStaticMLSAddress}>*/}
          {/*            {hasCopiedStaticMLSAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}*/}
          {/*          </Clipboard>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*)}*/}
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
      <div className="my-4">
        <div className="bg-custom-grey py-4 px-5">
          <div className="py-3 px-5 flex">
            <div className="text-sm font-bold">Network:</div>
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={signal} />
            </div>
          </div>
          <div className="py-4 px-5 flex">
            <div className="text-sm font-bold">Chain:</div>
            <div className="grow flex items-center justify-end -mr-0.5">
              <img alt="chevron" src={link} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
