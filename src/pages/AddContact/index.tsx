import React, { useContext, useState } from 'react';
import { appContext } from '../../AppContext';

function AddContactModal() {
  const { addContact, dismissAddContact, _showAddContact } = useContext(appContext);
  const [contactAddress, setContactAddress] = useState('');
  const [step, setStep] = useState(0);
  const [latestContactName, setLatestContactName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleContactAddress = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactAddress(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      setIsLoading(true);
      const contacts = await addContact(contactAddress);
      setLatestContactName(contacts[contacts.length - 1].extradata.name);
      setIsLoading(false);
      setStep(2);
    } catch {
      setIsLoading(false);
      setStep(0);
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
              {step === 0 && (
                <>
                  <h5 className="text-lg mt-6 mb-10">
                    There was an error adding this contact
                  </h5>
                  <div className="w-32 h-32 rounded rounded-full flex items-center justify-center text-xs text-left mx-auto mb-16" style={{ background: '#7A17F9' }}>
                    <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2468 35.1763L0.804199 18.7337L3.96058 15.5773L17.2468 28.8635L45.434 0.67627L48.5904 3.83265L17.2468 35.1763Z" fill="white" />
                    </svg>
                  </div>
                  <div className="mb-1">
                    <button onClick={dismiss} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                      Close
                    </button>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h5 className="font-bold text-lg mt-3 mb-5">New contact</h5>
                  <p className="mb-5">Enter your contact's Minima address</p>
                  <textarea
                    value={contactAddress}
                    onChange={handleContactAddress}
                    rows={8}
                    className="rounded rounded-lg p-3 text-xs text-left"
                    style={{ border: '2px solid #7A17F9' }}
                  />
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
                    <strong className="capitalize">{latestContactName}</strong> was added
                    <br /> to your contacts
                  </h5>
                  <div className="w-32 h-32 rounded rounded-full flex items-center justify-center text-xs text-left mx-auto mb-16" style={{ background: '#7A17F9' }}>
                    <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2468 35.1763L0.804199 18.7337L3.96058 15.5773L17.2468 28.8635L45.434 0.67627L48.5904 3.83265L17.2468 35.1763Z" fill="white" />
                    </svg>
                  </div>
                  <div className="mb-1">
                    <button onClick={dismiss} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
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
