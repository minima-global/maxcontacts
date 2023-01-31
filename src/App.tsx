import { useEffect, useState } from 'react';
import ContactsList from './pages/AllContacts';
import ContentContainer from './layout/ContentContainer';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import ViewContact from './pages/ViewContact';
import AppProvider from './AppContext';
import LastActive from './pages/LastActive';
import Favourites from './pages/Favourites';
import Splash from './components/Splash';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (window as any).MDS.init(() => {
      setLoaded(true);
    }, []);
  });

  if (!loaded) {
    return <div />;
  }

  return (
    <AppProvider>
      <div>
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
    </AppProvider>
  );
}

export default App;
