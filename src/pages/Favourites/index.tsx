import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import AddContact from '../../components/AddContact';
import ContactItem from '../../components/ContactItem';
import { appContext } from '../../AppContext';
import SearchBar from '../../components/SearchBar';

const Favourites: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { queryContacts, getContacts } = useContext(appContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getContacts();
      setLoaded(true);
    }
  }, [loaded, getContacts]);

  const queriedContacts = queryContacts(searchQuery, true);

  return (
    <>
      <div>
        <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
        <AddContact />
        <div className="grid grid-col-12">
          {queriedContacts && queriedContacts.map((c: any) => <ContactItem key={c.id} id={c.id} name={c.extradata.name} lastSeen={c.lastseen} sameChain={c.samechain} favourite={c.favourite} />)}
        </div>
      </div>
    </>
  );
};

export default Favourites;
