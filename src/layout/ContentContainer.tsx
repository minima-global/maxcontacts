import { useContext, useState } from 'react';
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
import BatchImportModal from '../pages/BatchImport';

function ContentContainer() {
  const location = useLocation();
  const { _showOnboarding, refreshContacts } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const hideNavBar = ['/onboarding'].includes(location.pathname) || location.pathname.includes('/contacts/');

  if (_showOnboarding) {
    return (
      <div className="h-full relative flex items-center justify-center">
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
    <div>
      <AddContact />
      <BatchImportModal/>
      <EditDisplayName />
      <RemoveContactModal />
      <EditNickname />
      <div className="h-screen flex flex-col">
        <TitleBar>
          <button disabled={isLoading} onClick={refresh} className="disabled:cursor-not-allowed text-sm py-1 px-2 font-bold border-white">
            {!isLoading && <img src="./assets/refresh-cw.svg" alt="refresh" className="w-5 h-5" />}
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </TitleBar>
        <div className="flex flex-col lg:flex-row flex-grow items-stretch">
          <div className="hidden lg:block max-w-[58px] w-full col-span-1 bg-red-300">
            <DesktopNavBar />
          </div>
          <div className="flex-1 flex-grow">
            <div className="max-w-[640px] mx-auto lg:px-4">
              <Outlet />
            </div>
          </div>
          {!hideNavBar && <MobileNavBar />}
          <Notification />
        </div>
      </div>
    </div>
  );
}

export default ContentContainer;
