import { useContext } from 'react'
import styles from './index.module.css'
import { appContext } from '../../AppContext'
import addPerson from '../../assets/person_add.svg'

function AddContact() {
    const { _hasContacts, promptAddContact } = useContext(appContext)

    return (
        <div className="cursor-pointer p-3 pb-4" onClick={promptAddContact}>
            <div className="cursor-pointer px-3">
                <div className="flex items-center">
                    <div className="mr-5">
                        <div className={styles.button}>
                            <img alt="addPerson" src={addPerson} />
                        </div>
                    </div>
                    <div className="font-bold mb-1">
                        {_hasContacts && `New contact`}
                        {!_hasContacts && `Add your first contact`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContact
