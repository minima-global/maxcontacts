import React, { useContext } from 'react';
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
  const { _showOnboarding } = useContext(appContext);
  const hideNavBar = ['/onboarding'].includes(location.pathname) || location.pathname.includes('/contacts/');

  if (_showOnboarding) {
    return (
      <div className="h-screen relative flex items-center justify-center">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <AddContact />
      <EditDisplayName />
      <RemoveContactModal />
      <EditNickname />
      <div className="h-screen relative flex flex-col">
        <TitleBar />
        <div className="grow overflow-auto relative w-full mx-auto" style={{ maxWidth: '480px' }}>
          <DesktopNavBar />
          <div className={`${hideNavBar ? 'h-screen overflow-scroll lg:overflow-auto' : ''}`}>
            <Outlet />
          </div>
          <Notification />
        </div>
        {!hideNavBar && <MobileNavBar />}
      </div>
    </div>
  );
}

export default ContentContainer;
