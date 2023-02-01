import * as React from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { maxContactAdd, maxContactRemove, maxContacts, maxima, maximaSetName, sql } from './__minima__';
import pause from './utilities/pause';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [_displayName] = useState('');
  const [_contacts, _setContacts] = useState([]);
  const [_nicknames, _setNicknames] = useState({});
  const [_favourites, _setFavourites] = useState<number[]>([]);
  const [_maxima, _setMaxima] = useState(null);
  const [_showOnboarding, _setShowOnboarding] = useState(false);
  const [_showAddContact, _setShowAddContact] = useState(false);
  const [_editNickname, _setEditNickname] = useState<{ display: boolean; contactId: number | null }>({ display: false, contactId: null });
  const [_removeContact, _setRemoveContact] = useState<{ display: boolean; contactId: number | null }>({ display: false, contactId: null });
  const [_showChangeDisplayName, _setShowChangeDisplayName] = useState(false);
  const [_getContactsPending, _setGetContactsPending] = useState(false);
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });

  useEffect(() => {
    getMaxima();
  }, []);

  /**
   * Boot-up
   */
  useEffect(() => {
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
  }, []);

  const _hasContacts = React.useMemo(() => {
    return _contacts && _contacts.length !== 0;
  }, [_contacts]);

  const setDisplayName = async (displayName: string) => {
    return maximaSetName(displayName === '' ? 'noname' : displayName).then(() => {
      return getMaxima();
    });
  };

  const addContact = async (contactAddress: string) => {
    let previousLength = _contacts.length;

    return maxContactAdd(contactAddress).then(async () => {
      let contacts = await getContacts();

      return new Promise(async (resolve) => {
        if (contacts.length === previousLength) {
          for (let i = 0; i < 5; i++) {
            await pause();
            contacts = await getContacts();

            if (contacts.length !== previousLength) {
              break;
            }
          }

          resolve(contacts);
        }

        resolve(contacts);
      });
    });
  };

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

  const editNickname = async (contactId: number, nickname: number) => {
    const updatedNicknames = {
      ..._nicknames,
      [contactId]: nickname,
    };

    // update favourites
    _setNicknames(updatedNicknames);

    const favourites = await sql(`SELECT * FROM cache WHERE name = 'FAVOURITES'`);

    if (!favourites) {
      await sql(`INSERT INTO cache (name, data) VALUES ('NICKNAMES', '${JSON.stringify(updatedNicknames)}')`);
    } else {
      await sql(`UPDATE cache SET data = '${JSON.stringify(updatedNicknames)}' WHERE name = 'NICKNAMES'`);
    }
  };

  const promptEditNickname = async (contactId: number) => {
    _setEditNickname({ display: true, contactId })
  };

  const dismissEditNickname = async () => {
    _setEditNickname({ display: false, contactId: null })
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

  const value = {
    addContact,
    removeContact,
    getMaxima,
    getContacts,
    queryContacts,
    editNickname,
    setDisplayName,
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
    _maxima,
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
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
