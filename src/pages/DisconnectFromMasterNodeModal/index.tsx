import { FormEvent, useContext, useState } from 'react';
import { appContext } from '../../AppContext';
import { clearStaticMLS } from '../../__minima__';
import onboardingIcon from '../../assets/onboardingIcon.svg';

function DisconnectFromMasterNodeModal() {
  const { _showRemoveStaticMLS, _setShowRemoveStaticMLS, getMaxima } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (evt: FormEvent) => {
    try {
      evt.preventDefault();
      await clearStaticMLS();
      await getMaxima();
      setStep(2);
    } catch {
      // ignore
    }
  };

  const dismiss = () => {
    setStep(1);
    setIsLoading(false);
    _setShowRemoveStaticMLS(false);
  };

  if (!_showRemoveStaticMLS) {
    return <div />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
        <div className="absolute z-10 relative bg-white w-11/12 mx-auto rounded rounded-2xl max-w-md mb-8 lg:mb-0">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-xl mt-2 mb-8">Disconnect Static MLS</h5>
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="disabled:opacity-50 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                    >
                      Disconnect
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
                  <h5 className="text-xl mt-3 mb-4">
                    <strong>Disconnected Static MLS</strong>
                  </h5>
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-left mx-auto mb-8">
                    <img src={onboardingIcon} width={135} alt="Onboarding icon" />
                  </div>
                  <div className="mb-1">
                    <button onClick={dismiss} className="cursor-pointer text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple bg-custom-purple--disabled">
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

export default DisconnectFromMasterNodeModal;
