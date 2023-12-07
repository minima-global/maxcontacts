import { useContext,  useState } from 'react';
import { appContext } from '../../AppContext';
import onboardingIcon from '../../assets/onboardingIcon.svg';
import InputImportContacts from '../../components/InputImportContacts';

function BatchImportModal() {
  const {  dismissImportContacts, _showImportContacts } = useContext(appContext);
  const [step, setStep] = useState(1);
  const [_length, setLength] = useState(null);
  


  const dismiss = () => {
    setStep(1);
    dismissImportContacts();
  };

  if (!_showImportContacts) {
    return <div />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
        <div className="z-10 relative bg-white w-11/12 mx-auto rounded-2xl max-w-lg">
            <div className="bg-white p-5 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-lg mt-3 mb-5">Batch Import</h5>
                  <p className="mb-5">Attach your exported contacts txt file below</p>
                  <InputImportContacts setStep={setStep} setLength={setLength} />

                  
                  <div className="pt-5 pb-3 text-center">
                    <div onClick={dismiss} className="cursor-pointer text-custom-grey font-medium link">
                      Cancel
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h5 className="text-lg mt-6 mb-10">
                    <strong className="capitalize">Importing contacts...</strong>
                  </h5>
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-left mx-auto mb-16">
                    <img src={onboardingIcon} width={135} alt="Onboarding icon" />
                  </div>
                  <div className="mb-1">
                    <button disabled={true} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded-xl bg-custom-purple bg-custom-purple--disabled">
                      Close
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h5 className="text-lg mt-6 mb-10">
                     Imported {_length} contacts!
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
        </div>
        <div className="fixed bg-black h-screen w-screen bg-opacity-80"></div>
      </div>
    </>
  );
}

export default BatchImportModal;
