import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import AddContact from '../../components/AddContact';
import ContactItem from '../../components/ContactItem';
import { appContext } from '../../AppContext';
import SearchBar from '../../components/SearchBar';
import ImportContacts from '../../components/ImportContacts';

const LastActive: React.FC = () => {
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
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <div className="flex flex-wrap md:flex-nowrap">
          <AddContact />
          <ImportContacts />        
        </div>
        
        <div className="grid grid-col-12">
          {(searchQuery !== '' && queriedContacts.length === 0) && (
            <div className="h-fit flex items-center justify-center">
              <div className="pt-36">No contacts found</div>
            </div>
          )}
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
    </>
  );
};

export default LastActive;
