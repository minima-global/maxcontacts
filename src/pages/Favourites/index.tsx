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
  const onlyFavourites = queriedContacts.filter((i: any) => i.favourite);

  return (
    <>
      <div>
        <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
        <AddContact />
        <div className="grid grid-col-12">
          {(searchQuery !== '' && onlyFavourites.length === 0) && (
            <div className="h-fit flex items-center justify-center">
              <div className="pt-36">No results</div>
            </div>
          )}
          {(searchQuery === '' && onlyFavourites.length === 0) && (
            <div className="h-fit flex items-center justify-center">
              <div className="pt-36">No favourites</div>
            </div>
          )}
          {onlyFavourites && onlyFavourites.map((c: any) => <ContactItem key={c.id} id={c.id} name={c.extradata.name} lastSeen={c.lastseen} sameChain={c.samechain} favourite={c.favourite} />)}
        </div>
      </div>
    </>
  );
};

export default Favourites;
