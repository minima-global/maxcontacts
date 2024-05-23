import * as React from 'react';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { getAddress, maxContactAdd, maxContactExport, maxContactRemove, maxContacts, maxima, maximaSetIcon, maximaSetName, sql } from './__minima__';
import pause from './utilities/pause';
import  { webDownload } from './utilities/webDownload';
import { format } from 'date-fns';
import downloadBlobWithMinima from './__minima__/downloadBlobWithMinima';
// import { faker } from '@faker-js/faker';

export const appContext = createContext({} as any);

// interface ExtraData {
//   name: string;
//   minimaaddress: string;
//   topblock: string;
//   checkblock: string;
//   checkhash: string;
//   mls: string;
// }

// interface FakeData {
//   id: number;
//   publickey: string;
//   currentaddress: string;
//   myaddress: string;
//   lastseen: number;
//   date: string;
//   extradata: ExtraData;
//   chaintip: string;
//   samechain: boolean;
//   favourite: boolean;
// }

// const generateFakeData = (num: number): FakeData[] => {
//   const fakeData: FakeData[] = [];

//   for (let i = 0; i < num; i++) {
//     fakeData.push({
//       id: i + 1,
//       publickey: faker.string.alphanumeric(512),
//       currentaddress: `Mx${faker.string.alphanumeric(60)}@${faker.internet.ip()}:9001`,
//       myaddress: `Mx${faker.string.alphanumeric(60)}@${faker.internet.ip()}:9001`,
//       lastseen: Date.now() - faker.number.int({ min: 0, max: 100000000 }),
//       date: faker.date.recent().toString(),
//       extradata: {
//         name: "234oij23io4io23i4ouo2i3u4oiu23oi4uoi2u34oiu23oi4uoi23u4oi2u3o4iu2oi3u4oi32",
//         minimaaddress: `Mx${faker.string.alphanumeric(60)}`,
//         topblock: faker.number.int({ min: 800000, max: 900000 }).toString(),
//         checkblock: faker.number.int({ min: 800000, max: 900000 }).toString(),
//         checkhash: `0x${faker.string.alphanumeric(64)}`,
//         mls: `Mx${faker.string.alphanumeric(60)}@${faker.internet.ip()}:9001`
//       },
//       chaintip: faker.number.int({ min: 800000, max: 900000 }).toString(),
//       samechain: faker.datatype.boolean(),
//       favourite: faker.datatype.boolean()
//     });
//   }

//   return fakeData;
// };

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef<boolean>(false);
  const [_displayName] = useState('');
  const [_contacts, _setContacts] = useState([]);
  const [_nicknames, _setNicknames] = useState({});
  const [_favourites, _setFavourites] = useState<number[]>([]);
  const [_maxima, _setMaxima] = useState(null);
  const [_address, _setAddress] = useState(null);
  const [_showOnboarding, _setShowOnboarding] = useState(false);
  const [_showAddContact, _setShowAddContact] = useState(false);
  const [_showAddStaticMLS, _setShowAddStaticMLS] = useState(false);
  const [_showRemoveStaticMLS, _setShowRemoveStaticMLS] = useState(false);
  const [_showImportContacts, _setShowImportContacts] = useState(false);
  const [_editNickname, _setEditNickname] = useState<{ display: boolean; contactId: number | null }>({ display: false, contactId: null });
  const [_removeContact, _setRemoveContact] = useState<{ display: boolean; contactId: number | null }>({ display: false, contactId: null });
  const [_showChangeDisplayName, _setShowChangeDisplayName] = useState(false);
  const [_getContactsPending, _setGetContactsPending] = useState(false);
  const [_addedContact, _setAddedContact] = useState(null);
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });

  useEffect(() => {
    if (!loaded.current) {
      (window as any).MDS.init((m: any) => {
        loaded.current = true;

        if (m.event === 'inited') {
          (async () => {
            // await sql(`DROP TABLE IF EXISTS cache;`);
            await sql(`CREATE TABLE IF NOT EXISTS cache (name varchar(255), data longtext);`);
            const showOnboarding = await sql(`SELECT * FROM cache WHERE name = 'SHOW_ONBOARDING'`);
            const nicknames: any = await sql(`SELECT * FROM cache WHERE name = 'NICKNAMES'`);
            const favourites: any = await sql(`SELECT * FROM cache WHERE name = 'FAVOURITES'`);

            if (!showOnboarding) {
              _setShowOnboarding(true);
            }

            if (nicknames) {
              _setNicknames(JSON.parse(nicknames.DATA));
            }

            if (favourites) {
              _setFavourites(JSON.parse(favourites.DATA));
            }
          })();
        } else if (m.event === 'MAXIMACONTACTS') {
          maxContacts().then((response: any) => {

            // update contacts (might as well)
            _setContacts(response.contacts);

            // get the latest contact
            const sortedContacts = response.contacts.sort((a: any, b: any) => b.id - a.id);

            if (sortedContacts.length > 0) {
              _setAddedContact(sortedContacts[0].extradata.name);
            }
          });
        }
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded.current) {
      getMaxima();
    }
  }, [loaded]);

  const _hasContacts = React.useMemo(() => {
    return _contacts && _contacts.length !== 0;
  }, [_contacts]);

  const setDisplayName = async (displayName: string) => {
    return maximaSetName(displayName === '' ? 'noname' : displayName).then(() => {
      return getMaxima();
    });
  };

  const setDisplayIcon = async (icon: string) => {
    return maximaSetIcon(icon).then(() => {
      return getMaxima();
    });
  };

  const addContact = async (contactAddress: string) => {
    return maxContactAdd(contactAddress);
  };

  const exportContacts = async () => {
    const contactList = await maxContactExport();
    const name = `myMaximaContacts_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.txt`;
    

    if (
      window.navigator.userAgent.includes("Minima Browser")
    ) {
  
      return downloadBlobWithMinima(name, contactList);
    }

    webDownload(contactList, name, "text/plain");
  }

  const removeContact = async (contactId: number) => {
    let previousLength = _contacts.length;

    return maxContactRemove(contactId).then(async () => {
      let contacts = await getContacts();

      return new Promise(async (resolve) => {
        if (contacts.length === previousLength) {
          for (let i = 0; i < 3; i++) {
            await pause();
            contacts = await getContacts();

            if (contacts.length !== previousLength) {
              break;
            }
          }
        }

        resolve(contacts);
      });
    });
  };

  const getContacts = React.useCallback(async () => {
    if (_getContactsPending) {
      return [];
    }

    _setGetContactsPending(true);

    return maxContacts()
      .then((response: any) => {

        _setContacts(response.contacts);
        // _setContacts(generateFakeData(500) as any);
        return response.contacts;
      })
      .finally(() => {
        _setGetContactsPending(false);
      });
  }, [_getContactsPending]);

  const getMaxima = async () => {
    return maxima().then((response: any) => {
      return _setMaxima(response);
    });
  };

  const getMinimaAddress = async () => {
    return getAddress().then((response: any) => {
      return _setAddress(response);
    });
  };

  const dismissOnboarding = async () => {
    _setShowOnboarding(false);
    await sql(`INSERT INTO cache (name, data) VALUES ('SHOW_ONBOARDING', '1')`);
  };

  const promptAddContact = async () => {
    _setShowAddContact(true);
  };

  const dismissAddContact = async () => {
    _setShowAddContact(false);
  };

  const promptNotification = (message: string, callback: unknown) => {
    _setNotification({ display: true, message, callback });
  };

  const dismissNotification = () => {
    _setNotification({ display: false, message: '', callback: null });
  };

  const promptChangeDisplayName = async () => {
    _setShowChangeDisplayName(true);
  };

  const dismissChangeDisplay = async () => {
    _setShowChangeDisplayName(false);
  };

  const promptRemoveContact = async (contactId: number) => {
    _setRemoveContact({ display: true, contactId });
  };

  const dismissRemoveContact = async () => {
    _setRemoveContact({ display: false, contactId: null });
  };

  const promptImportContacts = async () => {
    _setShowImportContacts(true);
  }
  
  const dismissImportContacts = async () => {
    _setShowImportContacts(false);
  }


  const editNickname = async (contactId: number, nickname: number) => {
    const updatedNicknames = {
      ..._nicknames,
      [contactId]: nickname,
    };

    // update favourites
    _setNicknames(updatedNicknames);

    const nicknames = await sql(`SELECT * FROM cache WHERE name = 'NICKNAMES'`);

    if (!nicknames) {
      await sql(`INSERT INTO cache (name, data) VALUES ('NICKNAMES', '${JSON.stringify(updatedNicknames)}')`);
    } else {
      await sql(`UPDATE cache SET data = '${JSON.stringify(updatedNicknames)}' WHERE name = 'NICKNAMES'`);
    }
  };

  const promptEditNickname = async (contactId: number) => {
    _setEditNickname({ display: true, contactId });
  };

  const dismissEditNickname = async () => {
    _setEditNickname({ display: false, contactId: null });
  };

  const toggleFavourite = async (contactId: number) => {
    const updatedFavourites = _favourites.includes(contactId) ? _favourites.filter((i: any) => i !== contactId) : [..._favourites, contactId];

    // update favourites
    _setFavourites(updatedFavourites);

    const favourites = await sql(`SELECT * FROM cache WHERE name = 'FAVOURITES'`);

    if (!favourites) {
      await sql(`INSERT INTO cache (name, data) VALUES ('FAVOURITES', '${JSON.stringify(updatedFavourites)}')`);
    } else {
      await sql(`UPDATE cache SET data = '${JSON.stringify(updatedFavourites)}' WHERE name = 'FAVOURITES'`);
    }
  };

  const queryContacts = React.useCallback(
    (searchQuery: string, sort = false) => {
      if (_contacts) {
        let contacts: any = [..._contacts];
        const transformedSearchQuery = searchQuery.toLowerCase();

        if (searchQuery !== '') {
          contacts = _contacts.filter((i: any) => i.extradata.name.toLowerCase().includes(transformedSearchQuery));
        }

        contacts = contacts.map((i: any) => ({
          ...i,
          favourite: _favourites.includes(i.id),
        }));

        if (sort) {
          contacts = contacts.sort((a: any, b: any) => b.lastseen - a.lastseen);
        }

        return contacts;
      }

      return false;
    },
    [_contacts, _favourites]
  );

  const _latestContact = useMemo(() => {
    if (_contacts) {
      return _contacts[_contacts.length - 1];
    }

    return null;
  }, [_contacts]);

  const refreshContacts = () => {
    return maxContacts().then((response: any) => {

      // update contacts (might as well)
      _setContacts(response.contacts);

      // get the latest contact
      const sortedContacts = response.contacts.sort((a: any, b: any) => b.id - a.id);

      if (sortedContacts.length > 0) {
        _setAddedContact(sortedContacts[0].extradata.name);
      }
    });
  }

  const value = {
    addContact,
    exportContacts,
    removeContact,
    getMaxima,
    getContacts,
    queryContacts,
    editNickname,
    setDisplayName,
    setDisplayIcon,
    promptAddContact,
    dismissAddContact,
    dismissOnboarding,
    promptNotification,
    dismissNotification,
    promptChangeDisplayName,
    dismissChangeDisplay,
    promptRemoveContact,
    dismissRemoveContact,
    toggleFavourite,
    promptEditNickname,
    dismissEditNickname,
    getMinimaAddress,
    _maxima,
    _address,
    _contacts,
    _displayName,
    _nicknames,
    _favourites,
    _editNickname,
    _showOnboarding,
    _showAddContact,
    _hasContacts,
    _notification,
    _latestContact,
    _showChangeDisplayName,
    _removeContact,
    loaded: loaded.current,
    _addedContact,
    _setAddedContact,
    _showAddStaticMLS,
    _setShowAddStaticMLS,
    _showRemoveStaticMLS,
    _setShowRemoveStaticMLS,
    refreshContacts,
    _showImportContacts,
    promptImportContacts,
    dismissImportContacts
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
