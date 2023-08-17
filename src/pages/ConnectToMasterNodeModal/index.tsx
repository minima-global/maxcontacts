import { FormEvent, useContext, useState } from 'react';
import { appContext } from '../../AppContext';
import warningRed from '../../assets/warning_red.svg';
import { staticMLS } from '../../__minima__';
import onboardingIcon from '../../assets/onboardingIcon.svg';

function ConnectToMasterNodeModal() {
  const { _showAddStaticMLS, _setShowAddStaticMLS, getMaxima } = useContext(appContext);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (evt: FormEvent) => {
    try {
      evt.preventDefault();
      setInvalidAddress(false);
      await staticMLS(address);
      await getMaxima();
      setStep(2);
    } catch {
      setInvalidAddress(true);
    }
  };

  const dismiss = () => {
    setStep(1);
    setAddress('');
    setIsLoading(false);
    setInvalidAddress(false);
    _setShowAddStaticMLS(false);
  };

  if (!_showAddStaticMLS) {
    return <div />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
        <div className="absolute z-10 relative bg-white w-11/12 mx-auto rounded rounded-2xl max-w-lg mb-8 lg:mb-0">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-xl mt-2 mb-6">Connect Static MLS</h5>
                  <div className="text-sm">
                    <p className="mb-4">Setting a Static MLS improves the reliability of the connection with your contacts.</p>
                    <p className="mb-4">A Static MLS node must be a node running on a server with a static IP address.</p>
                    <p className="mb-7">Run the maxima command on the Static MLS node and paste the p2pidentity into the box below.</p>
                  </div>
                  <textarea
                    rows={8}
                    value={address}
                    onChange={(evt) => setAddress(evt.target.value)}
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
                      disabled={address === '' || isLoading}
                      className="disabled:opacity-50 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                    >
                      Connect
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
                  <h5 className="text-xl mt-3 mb-10">
                    <strong>Connected Static MLS</strong>
                  </h5>
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-left mx-auto mb-16">
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

export default ConnectToMasterNodeModal;
