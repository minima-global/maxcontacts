import link from '../../assets/link.svg';
import chevron from '../../assets/chevron.svg';
import backArrow from '../../assets/back_arrow.svg';
import starOutline from '../../assets/star_outline.svg';
import starFilled from '../../assets/star_filled.svg';
import signal from '../../assets/signal_cellular_alt.svg';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Clipboard from 'react-clipboard.js';
import greenTick from '../../assets/green_tick.svg';
import clipboard from '../../assets/clipboard.svg';

function ViewContact() {
  const params = useParams();
  const navigate = useNavigate();
  const { _contacts, _nicknames, _maxima, _notification, _favourites, getContacts, promptNotification, promptRemoveContact, toggleFavourite, promptEditNickname } =
    useContext(appContext);
  const [showSection, setShowSection] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getContacts();
      setLoaded(true);
    }
  }, [loaded, getContacts]);

  const goBack = () => {
    navigate(-1);
  };

  const _contact = _contacts.find((c: any) => c.id === Number(params.id));

  if (!_contact) {
    return <div />;
  }

  const hasNickname = _nicknames[_contact.id];
  const isFavourited = _favourites.includes(_contact.id);

  const copyPublicKeyText = `You have copied ${_contact.extradata.name}'s contact address!`;
  // const copyMyAddressText = `You have copied ${_contact.extradata.name}'s address!`;
  const copyCurrentAddressText = `You have copied ${_contact.extradata.name}'s current address!`;
  const copySharePublicKeyText = `You have copied ${_contact.extradata.name}'s contact address! `;

  const hasCopiedPublicKey = _notification.message === copyPublicKeyText;
  // const hasCopiedMyAddress = _notification.message === copyMyAddressText;
  const hasCopiedCurrentAddress = _notification.message === copyCurrentAddressText;
  const hasCopiedSharePublicKey = _notification.message === copySharePublicKeyText;

  const toggleShowSection = (section: string) => {
    setShowSection((prevState) => (prevState === section ? null : section));
  };

  const editNickname = () => {
    promptEditNickname(_contact.id);
  };

  return (
    <>
      <div className="p-5">
        <button className="flex items-center" onClick={goBack}>
          <img alt="Back arrow" src={backArrow} width={20} className="mr-3" />
          <span className="font-bold">Back</span>
        </button>
      </div>
      <div className="bg-white p-4 px-6">
        <div className="flex items-stretch">
          <div className="avatar mr-4">
            {!hasNickname ? _contact.extradata.name[0] : hasNickname[0]}
          </div>
          <div className="w-full flex items-center">
            <div className="w-full">
              <div className="font-bold text-md mb-1 capitalize">
                {hasNickname && (
                  <span>
                    {hasNickname} <span className="text-custom-grey-2">({_contact.extradata.name})</span>
                  </span>
                )}
                {!hasNickname && _contact.extradata.name}
              </div>
              <p onClick={editNickname} className="cursor-pointer text-xs text-custom-grey">
                {hasNickname ? 'Edit' : 'Add'} nickname
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end" style={{ minWidth: '25px' }}>
            <span className="cursor-pointer" onClick={() => toggleFavourite(_contact.id)}>
              {isFavourited ? <img src={starFilled} alt="Star filled" width="25" /> : <img src={starOutline} alt="Star outline" width="25" />}
            </span>
          </div>
        </div>
        <div className="mt-5">
          <Clipboard className="w-full" data-clipboard-text={_maxima && _maxima.contact} onClick={() => promptNotification(copySharePublicKeyText)}>
            <button className={`text-white w-full text-base font-bold py-3 rounded rounded-xl ${hasCopiedSharePublicKey ? 'bg-custom-green' : 'bg-custom-purple'}`}>
              {hasCopiedSharePublicKey ? 'Copied contact' : 'Share contact'}
            </button>
          </Clipboard>
        </div>
      </div>
      <div className="my-4">
        <div className="bg-custom-grey px-5">
          <div onClick={() => toggleShowSection('publicKey')} className="cursor-pointer py-6 px-5 flex">
            <div className="text-sm font-bold">Maxima Public key</div>
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'publicKey' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {showSection === 'publicKey' && (
            <>
              <hr />
              <div className="pt-5 pb-5 px-5 text-xs flex">
                <div className="break-all">{_contact.publickey}</div>
                <div className="grow w-full flex justify-end items-start">
                  <Clipboard data-clipboard-text={_maxima && _maxima.contact} onClick={() => promptNotification(copyPublicKeyText)}>
                    {hasCopiedPublicKey ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                  </Clipboard>
                </div>
              </div>
            </>
          )}
          <hr />
          <div onClick={() => toggleShowSection('currentAddress')} className="cursor-pointer py-6 px-5 flex">
            <div className="text-sm font-bold">Current Maxima address</div>
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'currentAddress' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <hr />
          {showSection === 'currentAddress' && (
            <>
              <hr />
              <div className="pt-5 pb-5 px-5 text-xs flex">
                <div className="break-all">{_contact.currentaddress}</div>
                <div className="grow w-full flex justify-end items-start">
                  <Clipboard data-clipboard-text={_contact.currentaddress} onClick={() => promptNotification(copyCurrentAddressText)}>
                    {hasCopiedCurrentAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}
                  </Clipboard>
                </div>
              </div>
            </>
          )}
          {/*<div onClick={() => toggleShowSection('myAddress')} className="cursor-pointer py-6 px-5 flex">*/}
          {/*  <div className="text-sm font-bold">Their address</div>*/}
          {/*  <div className="grow flex items-center justify-end">*/}
          {/*    <img alt="chevron" src={chevron} className={`transition-transform ${showSection === 'myAddress' ? 'rotate-180' : ''}`} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*{showSection === 'myAddress' && (*/}
          {/*  <>*/}
          {/*    <hr />*/}
          {/*    <div className="pt-5 pb-5 px-5 text-xs flex">*/}
          {/*      <div className="break-all">{_contact.myaddress}</div>*/}
          {/*      <div className="grow w-full flex justify-end items-start">*/}
          {/*        <Clipboard data-clipboard-text={_contact.myaddress} onClick={() => promptNotification(copyMyAddressText)}>*/}
          {/*          {hasCopiedMyAddress ? <img alt="copied" src={greenTick} /> : <img alt="copy" src={clipboard} />}*/}
          {/*        </Clipboard>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </>*/}
          {/*)}*/}
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
            <div className="grow flex items-center justify-end">
              <img alt="chevron" src={link} />
            </div>
          </div>
          <div className="py-4 px-5 flex">
            <div className="text-sm font-bold">Same chain:</div>
            <div className="grow flex items-center justify-end text-sm">{_contact && _contact.samechain ? 'True' : 'False'}</div>
          </div>
        </div>
        <div className="py-5 text-center">
          <div onClick={() => promptRemoveContact(_contact && _contact.id)} className="cursor-pointer text-custom-grey font-medium link">
            Remove Contact
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewContact;
