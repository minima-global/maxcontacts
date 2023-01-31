import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import SearchBar from '../../components/SearchBar';
import AddContact from '../../components/AddContact';
import ContactItem from '../../components/ContactItem';

const ContactsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { queryContacts, getContacts } = useContext(appContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getContacts();
      setLoaded(true);
    }
  }, [loaded, getContacts]);

  const queriedContacts = queryContacts(searchQuery);

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      <AddContact />
      <div className="grid grid-col-12">
        {queriedContacts &&
          queriedContacts.map((c: any) => (
            <ContactItem
              key={c.id}
              id={c.id}
              name={c.extradata.name}
              lastSeen={c.lastseen}
              sameChain={c.samechain}
              favourite={c.favourite}
            />
          ))}
      </div>
    </div>
  );
};

export default ContactsList;
