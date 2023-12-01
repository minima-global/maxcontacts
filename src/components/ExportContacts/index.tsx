import { useContext } from 'react'
import styles from './index.module.css'
import { appContext } from '../../AppContext'


function ExportContacts() {
    const { _hasContacts, exportContacts } = useContext(appContext)


    if (!_hasContacts) {
      return null;
    }

    return (
        <div className="cursor-pointer p-3 pb-4" onClick={exportContacts}>
            <div className="cursor-pointer px-3">
                <div className="flex items-center">
                    <div className="mr-5">
                        <div className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /><path d="M15 18h7" /><path d="M19 15l3 3l-3 3" /></svg>
                        </div>
                    </div>
                    <div className="font-bold mb-1">
                        Export Contacts
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportContacts;
