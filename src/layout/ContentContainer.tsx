import React, { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MobileNavBar from './MobileNavBar';
import AddContact from '../pages/AddContact';
import Notification from '../components/Notification';
import { appContext } from '../AppContext';
import Onboarding from '../pages/Onboarding';
import EditDisplayName from '../pages/EditDisplayName';
import RemoveContactModal from '../pages/RemoveContact';
import EditNickname from '../pages/EditNickname';
import DesktopNavBar from './DesktopNavBar';
import TitleBar from '../components/TitleBar';

function ContentContainer() {
  const location = useLocation();
  const { _showOnboarding, refreshContacts } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const hideNavBar = ['/onboarding'].includes(location.pathname) || location.pathname.includes('/contacts/');

  if (_showOnboarding) {
    return (
      <div className="h-screen relative flex items-center justify-center">
        <Onboarding />
      </div>
    );
  }

  const refresh = async () => {
    setIsLoading(true);
    await refreshContacts();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="h-screen">
      <AddContact />
      <EditDisplayName />
      <RemoveContactModal />
      <EditNickname />
      <div className="h-screen relative flex flex-col">
        <TitleBar>
          <button disabled={isLoading} onClick={refresh} className="disabled:cursor-not-allowed text-sm py-1 px-3 rounded border-2 font-bold border-white">
            {!isLoading && 'Refresh'}
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </TitleBar>
        <div className="grow overflow-auto relative w-full mx-auto">
          <DesktopNavBar />
          <div className="mx-auto" style={{ maxWidth: '480px' }}>
            <div className={`${hideNavBar ? 'h-screen overflow-scroll lg:overflow-auto' : ''}`}>
              <Outlet />
            </div>
          </div>
          <Notification />
        </div>
        {!hideNavBar && <MobileNavBar />}
      </div>
    </div>
  );
}

export default ContentContainer;
