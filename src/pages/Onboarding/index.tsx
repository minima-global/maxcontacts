import React, { useContext, useEffect, useState } from 'react';
import onboardingLogo from '../../assets/onboardingIcon.svg';
import { appContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import warningRed from '../../assets/warning_red.svg';

function Onboarding() {
  const navigate = useNavigate();
  const { _maxima, _latestContact, _showOnboarding, setDisplayName, addContact, dismissOnboarding } = useContext(appContext);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (_maxima && _maxima.name && _maxima.name !== 'noname' && name === '' && !loaded) {
      setName(_maxima.name);
      setLoaded(true);
    }
  }, [loaded, _maxima, name]);

  useEffect(() => {

    if ((_maxima && _maxima.name && _maxima.name !== 'noname')) {
        dismissOnboarding();
    } else if (!_showOnboarding) {      
      navigate('/');
    }
  }, [_showOnboarding, navigate, _maxima]);

  const handleSetDisplayName = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await setDisplayName(name);
    setStep(3);
  };

  const handleNameOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleAddContact = async (evt: React.FormEvent) => {
    try {
      evt.preventDefault();
      setIsLoading(true);
      await addContact(contactAddress);
      setStep(5);
    } catch {
      setInvalidAddress(true);
      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactAddress = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvalidAddress(false);
    setContactAddress(evt.target.value);
  };

  const dismissAndGoToProfile = () => {
    dismissOnboarding();
    navigate('/');
  };

  return (
    <>
      <div className="h-full lg:h-fit text-center max-w-sm px-5 lg:px-32 lg:p-10 lg:pt-16 onboarding-desktop">
        <>
          {step === 1 && (
            <div className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div>
                  <div className="w-full text-center mt-10 mb-14">
                    <img width="137" src={onboardingLogo} alt="max contact logo" className="mx-auto" />
                  </div>
                  <p className="text-3xl font-bold mb-8 leading-10">
                    Welcome to
                    <br /> Contacts!
                  </p>
                  <p className="w-10/12 mx-auto">Create and manage your contacts in one place. Your contacts can be easily used across other MiniDapps.</p>
                </div>
              </div>
              <div className="py-10 lg:pt-10 lg:pb-4">
                <div className="mt-5">
                  <button onClick={() => setStep(2)} className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                    Create profile
                  </button>
                </div>
                <div className="pt-5 text-center">
                  <div onClick={dismissAndGoToProfile} className="cursor-pointer text-custom-grey font-medium link">
                    I'll do this later
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <form onSubmit={handleSetDisplayName} className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  <p className="text-3xl font-bold leading-10 mb-20">Let’s get you set up</p>
                  <label className="text-left font-bold block mb-3 ml-2 text-sm">Choose a Display Name</label>
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
              <div className="py-10 lg:pt-10 lg:pb-4">
                <div className="mt-5">
                  <button disabled={name === ''} className="disabled:opacity-40 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                    Save and continue
                  </button>
                </div>
                <div className="pt-5 text-center">
                  <div onClick={dismissAndGoToProfile} className="cursor-pointer text-custom-grey font-medium link">
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
                    <img width="137" src={onboardingLogo} alt="max contact logo" className="mx-auto" />
                  </div>
                  <p className="text-3xl font-bold leading-10 mb-20">
                    Nice to meet you,
                    <br /> {_maxima && _maxima.name}!
                  </p>
                </div>
              </div>
              <div className="py-10 lg:pt-10 lg:pb-4">
                <div className="mt-5">
                  <button onClick={dismissAndGoToProfile} className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                    Get started
                  </button>
                </div>
                <div onClick={() => setStep(4)} className="pt-5 text-center">
                  <div className="cursor-pointer text-custom-grey font-medium link">Add a contact</div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <form onSubmit={handleAddContact} className="h-full flex flex-col">
              <div className="flex items-center grow">
                <div className="text-center w-full px-3">
                  <p className="text-3xl font-bold mt-10 mb-16 lg:mt-0">Add your first contact</p>
                  <p className="mb-5">Enter your contact’s Maxima address</p>
                  <textarea
                    value={contactAddress}
                    onChange={handleContactAddress}
                    rows={9}
                    placeholder="MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G1F2029RM3DPR3UY5EBJ51WZFURST7SMQPC2S70DEQM8Y329GAZT81E9VF16QB0BG63AS29HUNA7SQB9Q3JNG9CKYES1CBN5RS4NAWA6Q4WNV5HABTPHCSW8AG0J9ZCWVSY04V82TQ5AD7DR01GZ82CFD2Q9VQA9KDGNNSFGYPKD57H6NPV6AEE622KM1744AJ6YJAEWBKKBPBC106080071RMFH7@176.124.220.57:9001"
                    style={{ border: '2px solid #7A17F9' }}
                    className={`rounded rounded-lg p-3 text-xs text-left ${invalidAddress ? 'input--invalid' : ''}`}
                  />
                  {invalidAddress && (
                    <div className="bg-custom-faded-red flex p-3 rounded rounded-xl mt-2 font-medium">
                      <img src={warningRed} alt="warning" className="mr-4" />
                      This address is not recognised.
                    </div>
                  )}
                </div>
              </div>
              <div className="py-10 lg:pt-10 lg:pb-4">
                <div className="mt-5">
                  {!isLoading && <button className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">Add contact</button>}
                  {isLoading && (
                    <button disabled={true} className="flex items-center justify-center text-white w-full text-base font-bold py-3 rounded rounded-xl button-loading bg-custom-purple bg-custom-purple--disabled">
                      <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </button>
                  )}
                  <div className="pt-5 text-center">
                    <div onClick={dismissAndGoToProfile} className="cursor-pointer text-custom-grey font-medium link">
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
                    <p className="text-3xl mt-16 mb-16 lg:mt-4">
                      <strong>{_latestContact.extradata.name}</strong> was added to your contacts!
                    </p>
                  )}
                  <div className="w-32 h-32 rounded rounded-full flex items-center justify-center text-xs text-left mx-auto mb-16" style={{ background: '#7A17F9' }}>
                    <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2468 35.1763L0.804199 18.7337L3.96058 15.5773L17.2468 28.8635L45.434 0.67627L48.5904 3.83265L17.2468 35.1763Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="py-10 lg:pt-10 lg:pb-4">
                <div className="mt-5 pb-2">
                  <button onClick={dismissAndGoToProfile} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
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
