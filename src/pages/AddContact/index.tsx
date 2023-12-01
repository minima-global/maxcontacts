import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import onboardingIcon from '../../assets/onboardingIcon.svg';
import warningRed from '../../assets/warning_red.svg';

function AddContactModal() {
  const { addContact, _addedContact, _setAddedContact, dismissAddContact, _showAddContact } = useContext(appContext);
  const [contactAddress, setContactAddress] = useState('');
  const [step, setStep] = useState(1);
  const [latestContactName, setLatestContactName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [listenForUpdate, setListenForUpdate] = useState(false);

  useEffect(() => {
    if (listenForUpdate && _addedContact) {
      setListenForUpdate(false);
      setStep(3);
      setIsLoading(false);
      setLatestContactName(_addedContact);
      _setAddedContact('');
    }
  }, [listenForUpdate, _addedContact, _setAddedContact]);

  useEffect(() => {
    if (listenForUpdate) {
      // timeout after 15 seconds, if the contact event did not execute, set loading to false
      // and tell the user it failed
      const timeout = setTimeout(() => {
        setStep(1);
        setIsLoading(false);
        setInvalidAddress(true);
        setListenForUpdate(false);
      }, 15000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [listenForUpdate]);

  const handleContactAddress = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvalidAddress(false);
    setContactAddress(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      setIsLoading(true);
      setStep(2);
      _setAddedContact(null);
      await addContact(contactAddress);
      setListenForUpdate(true);
    } catch {
      setIsLoading(false);
      setStep(1);
      setInvalidAddress(true);
    }
  };

  const dismiss = () => {
    setStep(1);
    setContactAddress('');
    dismissAddContact();
  };

  if (!_showAddContact) {
    return <div />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
        <div className="absolute z-10 relative bg-white w-11/12 mx-auto rounded rounded-2xl max-w-lg">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-lg mt-3 mb-5">New contact</h5>
                  <p className="mb-5">Enter your contact's Maxima address</p>
                  <textarea
                    value={contactAddress}
                    onChange={handleContactAddress}
                    rows={8}
                    placeholder="MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G1F2029RM3DPR3UY5EBJ51WZFURST7SMQPC2S70DEQM8Y329GAZT81E9VF16QB0BG63AS29HUNA7SQB9Q3JNG9CKYES1CBN5RS4NAWA6Q4WNV5HABTPHCSW8AG0J9ZCWVSY04V82TQ5AD7DR01GZ82CFD2Q9VQA9KDGNNSFGYPKD57H6NPV6AEE622KM1744AJ6YJAEWBKKBPBC106080071RMFH7@176.124.220.57:9001"
                    className={`rounded rounded-lg p-3 text-xs text-left ${invalidAddress ? 'input--invalid' : ''}`}
                    style={{ border: '2px solid #7A17F9' }}
                  />
                  {invalidAddress && (
                    <div className="bg-custom-faded-red flex p-3 rounded rounded-xl mt-2 font-medium">
                      <img src={warningRed} alt="warning" className="mr-4" />
                      This address is not recognised.
                    </div>
                  )}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={contactAddress === '' || isLoading}
                      className="disabled:opacity-50 disabled:mb-1 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                    >
                      Add contact
                    </button>
                  </div>
                  {!isLoading && (
                    <div className="pt-5 pb-3 text-center">
                      <div onClick={dismiss} className="cursor-pointer text-custom-grey font-medium link">
                        Cancel
                      </div>
                    </div>
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  <h5 className="text-lg mt-6 mb-10">
                    <strong className="capitalize">Adding contact...</strong>
                  </h5>
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-left mx-auto mb-16">
                    <img src={onboardingIcon} width={135} alt="Onboarding icon" />
                  </div>
                  <div className="mb-1">
                    <button disabled={true} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple bg-custom-purple--disabled">
                      Close
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h5 className="text-lg mt-6 mb-10">
                    <strong>{latestContactName}</strong> was added
                    <br /> to your contacts
                  </h5>
                  <div className="w-32 h-32 rounded-full flex items-center justify-center text-xs text-left mx-auto mb-16" style={{ background: '#7A17F9' }}>
                    <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2468 35.1763L0.804199 18.7337L3.96058 15.5773L17.2468 28.8635L45.434 0.67627L48.5904 3.83265L17.2468 35.1763Z" fill="white" />
                    </svg>
                  </div>
                  <div className="mb-1">
                    <button onClick={dismiss} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded-xl bg-custom-purple">
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="fixed bg-black h-screen w-screen bg-opacity-80"></div>
      </div>
    </>
  );
}

export default AddContactModal;
