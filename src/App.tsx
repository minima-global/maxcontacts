import { useContext } from 'react';
import ContactsList from './pages/AllContacts';
import ContentContainer from './layout/ContentContainer';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import ViewContact from './pages/ViewContact';
import { appContext } from './AppContext';
import LastActive from './pages/LastActive';
import Favourites from './pages/Favourites';
import Splash from './components/Splash';

import 'flowbite';

function App() {
  const { loaded } = useContext(appContext);

  if (!loaded) {
    return <div />;
  }

  return (
    <div className="h-full">
      <Splash />
      <Routes>
        <Route element={<ContentContainer />}>
          <Route path="/" element={<ContactsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/last-active" element={<LastActive />} />
          <Route path="/contacts/:id" element={<ViewContact />} />          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
