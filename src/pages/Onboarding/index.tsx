import React, { useContext, useEffect, useState } from 'react';
import onboardingLogo from '../../assets/onboardingIcon.svg';
import { appContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();
  const {
    _maxima,
    _latestContact,
    _showOnboarding,
    setDisplayName,
    addContact,
    dismissOnboarding,
  } = useContext(appContext);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [contactAddress, setContactAddress] = useState('');

  useEffect(() => {
    if (!_showOnboarding) {
      navigate('/');
    }
  }, [_showOnboarding, navigate]);

  const handleSetDisplayName = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await setDisplayName(name);
    setStep(3);
  };

  const handleNameOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleAddContact = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await addContact(contactAddress);
    setStep(5);
  };

  const handleContactAddress = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContactAddress(evt.target.value);
  };

  const dismissAndGoToProfile = () => {
    dismissOnboarding();
    navigate('/');
  };

  return (
    <>
      <div
        className="h-full text-center max-w-sm px-5 lg:px-0"
        style={{ background: '##BFBFBF' }}
      >
        <>
          {step === 1 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div>
                  <div className="w-full text-center mt-10 mb-14">
                    <img
                      width="137"
                      src={onboardingLogo}
                      alt="max contact logo"
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-3xl font-medium mb-8">
                    Welcome to
                    <br /> Contacts!
                  </p>
                  <p className="w-10/12 mx-auto">
                    Create and manage your contacts in one place. Your contacts
                    can be easily used across other MiniDapps.
                  </p>
                </div>
              </div>
              <div className="py-10">
                <div className="mt-5">
                  <button
                    onClick={() => setStep(2)}
                    className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                  >
                    Create profile
                  </button>
                </div>
                <div className="pt-5 text-center">
                  <div
                    onClick={dismissAndGoToProfile}
                    className="cursor-pointer text-custom-grey font-medium link"
                  >
                    I'll do this later
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <form
              onSubmit={handleSetDisplayName}
              className="h-full flex flex-col"
            >
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  <p className="text-3xl font-medium mb-20">
                    Let’s get you set up
                  </p>
                  <label className="text-left font-bold block mb-3 ml-2 text-sm">
                    Choose a Display Name
                  </label>
                  <input
                    value={name}
                    onChange={handleNameOnChange}
                    type="text"
                    className="rounded rounded-lg bg-transparent py-2 px-3 w-full"
                    style={{ border: '2px solid #7A17F9' }}
                    placeholder="Enter a name"
                  />
                </div>
              </div>
              <div className="py-10">
                <div className="mt-5">
                  <button
                    disabled={name === ''}
                    className="disabled:opacity-40 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                  >
                    Save and continue
                  </button>
                </div>
                <div className="pt-5 text-center">
                  <div
                    onClick={dismissAndGoToProfile}
                    className="cursor-pointer text-custom-grey font-medium link"
                  >
                    I'll do this later
                  </div>
                </div>
              </div>
            </form>
          )}
          {step === 3 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  <div className="w-full text-center mt-10 mb-14">
                    <img
                      width="137"
                      src={onboardingLogo}
                      alt="max contact logo"
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-3xl font-bold mb-20">
                    Nice to meet you,
                    <br /> {_maxima && _maxima.name}!
                  </p>
                </div>
              </div>
              <div className="py-10">
                <div className="mt-5">
                  <button
                    onClick={() => setStep(4)}
                    className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                  >
                    Get started
                  </button>
                </div>
                <div className="pt-5 text-center">
                  <div className="cursor-pointer text-custom-grey font-medium link">
                    I'll do this later
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <form onSubmit={handleAddContact} className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  <p className="text-3xl font-bold mt-10 mb-16">
                    Add your first contact
                  </p>
                  <p className="mb-5">Enter your contact’s Minima address</p>
                  <textarea
                    value={contactAddress}
                    onChange={handleContactAddress}
                    rows={8}
                    className="rounded rounded-lg p-3 text-xs text-left"
                    style={{ border: '2px solid #7A17F9' }}
                  />
                </div>
              </div>
              <div className="py-10">
                <div className="mt-5">
                  <button className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                    Add contact
                  </button>
                  <div className="pt-5 text-center">
                    <div
                      onClick={dismissAndGoToProfile}
                      className="cursor-pointer text-custom-grey font-medium link"
                    >
                      Go to Contacts
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
          {step === 5 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  {_latestContact && (
                    <p className="text-3xl mt-16 mb-16">
                      <strong className="capitalize">
                        {_latestContact.extradata.name}
                      </strong>{' '}
                      was added to your contacts!
                    </p>
                  )}
                  <div
                    className="w-32 h-32 rounded rounded-full flex items-center justify-center text-xs text-left mx-auto mb-16"
                    style={{ background: '#7A17F9' }}
                  >
                    <svg
                      width="49"
                      height="36"
                      viewBox="0 0 49 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.2468 35.1763L0.804199 18.7337L3.96058 15.5773L17.2468 28.8635L45.434 0.67627L48.5904 3.83265L17.2468 35.1763Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="py-10">
                <div className="mt-5" style={{ paddingBottom: '2.95rem' }}>
                  <button
                    onClick={dismissAndGoToProfile}
                    className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}

export default Onboarding;
