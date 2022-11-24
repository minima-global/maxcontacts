import { useEffect, useState } from 'react'
import { useStore } from './../../Store'
import { useParams } from 'react-router-dom'
import { MaxContactPlus } from './../../Store'
import ContactDetailPage from './ContactDetailPage'

function ContactDetail() {
    const [aContact, setAContact] = useState<MaxContactPlus | null>(null)
    const { id } = useParams()
    const getContacts = useStore((state) => state.getContactById)

    // When we update contacts, getContacts doesnt cause a re-render for some reason.
    // So grab the contacts directly and use it in the useEffect to trigger a re-render
    const contacts = useStore((state) => state.contacts)

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
    }, [id, getContacts, contacts])

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
