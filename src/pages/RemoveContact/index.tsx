import React, { useContext, useState } from 'react';
import { appContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function RemoveContactModal() {
  const navigate = useNavigate();
  const { _removeContact, _contacts, dismissRemoveContact, removeContact } = useContext(appContext);
  const [step] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    removeContact(_removeContact.contactId);
    dismissRemoveContact();
    setIsLoading(false);
    navigate('/');
  };

  if (!_removeContact.display) {
    return <div />;
  }

  const _contact = _contacts && _contacts.find((c: any) => c.id === _removeContact.contactId);

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center px-5 lg:px-0">
        <div className="absolute z-10 relative bg-white mx-auto rounded rounded-2xl w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-lg mt-3 mb-10 max-w-sm mx-auto">
                    Are you sure you want to remove
                    <br /> <span>{_contact && _contact.extradata.name}</span> from your contacts?
                  </h5>
                  <div className="mt-5">
                    <button type="submit" disabled={isLoading} className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple">
                      Remove contact
                    </button>
                  </div>
                  {!isLoading && (
                    <div className="pt-5 pb-2 text-center">
                      <div onClick={dismissRemoveContact} className="cursor-pointer text-custom-grey font-medium link">
                        Cancel
                      </div>
                    </div>
                  )}
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

export default RemoveContactModal;
