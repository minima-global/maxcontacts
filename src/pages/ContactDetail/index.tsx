import { useEffect, useState } from 'react'
import { useStore } from './../../Store'
import { useParams } from 'react-router-dom'
import { MaxContact } from 'npm-upload-9781'
import ContactDetailPage from './ContactDetailPage'

function ContactDetail() {
    const [aContact, setAContact] = useState<MaxContact | null>(null)
    const { id } = useParams()
    const getContacts = useStore((state) => state.getContactById)

    useEffect(() => {
        if (id) {
            const contact = getContacts(parseInt(id))
            if (contact) {
                setAContact(contact)
            } else {
                // cant find contact
                // set a notification
                // redirect away
            }
        }
    }, [id, getContacts])

    return (
        <>
            {aContact ? (
                <>
                    <ContactDetailPage contact={aContact}></ContactDetailPage>
                </>
            ) : (
                <div>contact not ready</div>
            )}
        </>
    )
}

export default ContactDetail
