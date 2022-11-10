import { MaxContact } from 'npm-upload-9781'

import { removeContact } from './../../../Store'
import { useNavigate } from 'react-router-dom'

interface IProps {
    contact: MaxContact
}
function ContactDetailPage({ contact }: IProps) {
    const navigate = useNavigate()

    const onRemoveContactClicked = async () => {
        await removeContact(contact.id)

        // redirect to list
        navigate('/contacts')

        // notification
    }

    return (
        <>
            <h4>Contact Detail Page</h4>
            <div>{contact.extradata.name}</div>
            <div>{contact.myaddress}</div>
            <div>{contact.extradata.minimaaddress}</div>
            <div>{contact.samechain ? 'same chain' : 'different chain'}</div>
            <button onClick={onRemoveContactClicked}>remove contact</button>
        </>
    )
}

export default ContactDetailPage
