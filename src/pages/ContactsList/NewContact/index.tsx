import { useState, ChangeEvent } from 'react'
import Modal from './../../../layout/Modal'
import { createContact } from './../../../Store'
import newContactIcon from './../../../assets/newContactIcon.svg'
import styles from './NewContact.module.css'

interface IProps {}
function NewContact() {
    const [newContactAddress, setNewContactAddress] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const onContactAddressChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = event.target.value
        // console.log('event new val', newVal)
        setNewContactAddress(newVal)
    }

    const onAddContactClicked = async () => {
        await createContact(newContactAddress)

        setNewContactAddress('')
        setOpenModal(false)
    }

    const placeholderText =
        'e.g. MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G152JZF6TWH3UNKQRAW6BHUB5WWTJQB854D68PUDWPRVP9ZHQQQ4HBWWBERK2WG09FBTVD6JM91B790UM1TYR91EF75W8EDS66RPVGT9BJ7CSY2B68TPJGZE1S2EVZ4C4JAQT381KEDCEFD7A1J9S32Y0VFB7DEVAFZ09SVPTFW85R0Y5HEKCA7UFZ712NYSBWCC8W4P36UYRP410608006VJWPSC@193.187.129.51:9041'

    const onModalCloseClicked = () => {
        setOpenModal(false)
        setNewContactAddress('')
    }

    return (
        <>
            <div className={`${styles.newContactListItem} pointer`} onClick={() => setOpenModal(true)}>
                <div className={styles.newContactListItemDetail}>
                    <img alt="contacts_icon" src={newContactIcon} width={80} />
                    <div>New Contact</div>
                </div>
            </div>

            <Modal open={openModal}>
                <h4>New Contact</h4>
                <label>
                    Enter your contacts Minima address
                    <textarea rows={6} placeholder={placeholderText} value={newContactAddress} onChange={onContactAddressChange}></textarea>
                </label>

                <button className="modal-button" onClick={onAddContactClicked}>
                    add contact
                </button>
                <a onClick={onModalCloseClicked} className="pointer underline">
                    close
                </a>
            </Modal>
        </>
    )
}

export default NewContact
