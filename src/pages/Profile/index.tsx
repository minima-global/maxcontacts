import React, { useContext } from 'react';
import Clipboard from 'react-clipboard.js';
import link from '../../assets/link.svg';
import clipboard from '../../assets/clipboard.svg';
import greenTick from '../../assets/green_tick.svg';
import signal from '../../assets/signal_cellular_alt.svg';
import { appContext } from '../../AppContext';

function Profile() {
  const { _maxima, _notification, promptNotification, promptChangeDisplayName } = useContext(appContext);
  const hasCopied = _notification.message === 'You have copied your maxima address!';
  const hasCopiedMaximaAddress = _notification.message === 'You have copied your maxima address! ';

  const handleCopy = () => {
    promptNotification('You have copied your maxima address!');
  };

  const copyMaximaAddress = () => {
    promptNotification('You have copied your maxima address! ');
  };

  return (
    <>
      <div className="p-5 bg-white" />
      <div className="bg-white p-4 px-6">
        <div className="flex items-stretch">
          {_maxima && <div className="avatar mr-4">{_maxima.name[0]}</div>}
          <div className="flex items-center">
            <div>
              {_maxima && <div className="font-bold text-md mb-1">{_maxima.name}</div>}
              <p onClick={promptChangeDisplayName} className="cursor-pointer text-xs text-custom-grey">
                Edit Display Name
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Clipboard className="w-full" data-clipboard-text={_maxima && _maxima.contact} onClick={copyMaximaAddress}>
            <button className={`text-white w-full text-base font-bold py-3 rounded rounded-xl ${hasCopiedMaximaAddress ? 'bg-custom-green' : 'bg-custom-purple'}`}>
              {hasCopiedMaximaAddress ? 'Copied contact' : 'Share contact'}
            </button>
          </Clipboard>
        </div>
      </div>
      <div className="my-4">
        <div className="bg-custom-grey px-5 pb-6">
          <div className="py-6 px-5 flex">
            <div className="text-sm font-bold">My address</div>
            <div className="grow flex items-center justify-end">{/*<img alt="chevron" src={chevron} className="flip" />*/}</div>
          </div>
          <div className="px-5 text-xs flex">
            <div className="break-all">{_maxima && _maxima.contact}</div>
            <div className="grow w-full flex justify-end items-start">
              <Clipboard data-clipboard-text={_maxima && _maxima.contact} onClick={handleCopy}>
                {hasCopied ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
              </Clipboard>
            </div>
          </div>
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
