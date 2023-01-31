import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import AddContact from '../pages/AddContact';
import Notification from '../components/Notification';
import { appContext } from '../AppContext';
import Onboarding from '../pages/Onboarding';
import EditDisplayName from '../pages/EditDisplayName';
import RemoveContactModal from '../pages/RemoveContact';
import EditNickname from '../pages/EditNickname';

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
        <div className="grow relative w-full mx-auto" style={{ maxWidth: '480px' }}>
          <div className={`${hideNavBar ? 'h-screen overflow-scroll' : ''}`}>
            <Outlet />
          </div>
          <Notification />
        </div>
        {!hideNavBar && <NavBar />}
      </div>
    </div>
  );
}

export default ContentContainer;
