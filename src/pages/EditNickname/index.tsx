import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';

function EditDisplayName() {
  const { _contacts, _nicknames, _editNickname, dismissEditNickname, promptNotification, editNickname } = useContext(appContext);
  const [nickname, setNickname] = useState('');
  const [step] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = nickname !== '';
  const _contact = _contacts && _contacts.find((c: any) => c.id === _editNickname.contactId);

  useEffect(() => {
    if (_editNickname.display && _nicknames[_editNickname.contactId]) {
      setNickname(_nicknames[_editNickname.contactId]);
    } else if (!_editNickname.display) {
      setNickname('');
    }
  }, [_editNickname, _nicknames]);

  const handleNicknameOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(false);
    editNickname(_contact.id, nickname === '' ? null : nickname);
    dismissEditNickname();
    promptNotification('Changes saved');
  };

  if (!_editNickname.display) {
    return <div />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center  px-5 lg:px-0">
        <div className="absolute z-10 relative bg-white w-full max-w-sm mx-auto rounded rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-2xl text-center">
              {step === 1 && (
                <>
                  <h5 className="font-bold text-xl mt-3 mb-10">
                    Choose a nickname for <span>{_contact.extradata.name}</span>
                  </h5>
                  <p className="text-left font-medium mb-3 ml-2">Choose a nickname</p>
                  <input value={nickname} onChange={handleNicknameOnChange} className="rounded rounded-lg p-3 text-md text-left" style={{ border: '2px solid #7A17F9' }} />
                  {nickname === '' && (
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="disabled:opacity-50 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                      >
                        Remove nickname
                      </button>
                    </div>
                  )}
                  {nickname !== '' && (
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={!isValid || isLoading}
                        className="disabled:opacity-50 text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {!isLoading && (
                    <div className="pt-5 pb-2 text-center">
                      <div onClick={dismissEditNickname} className="cursor-pointer text-custom-grey font-medium link">
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

export default EditDisplayName;
