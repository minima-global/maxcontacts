import { MaxContact } from 'npm-upload-9781'
import copyIcon from './../../../assets/copy_120015.svg'
import { removeContact } from './../../../Store'
import { useNavigate } from 'react-router-dom'
import styles from './ContactDetail.module.css'
import exclamation from './../../../assets/exclamation.svg'
import tick from './../../../assets/tick.svg'
import { useState } from 'react'
import leftArrow from './../../../assets/left-arrow.svg'
import DisplayField from './../../../components/DisplayField'

interface IProps {
    contact: MaxContact
}
function ContactDetailPage({ contact }: IProps) {
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const onRemoveContactClicked = async () => {
        await removeContact(contact.id)

        // redirect to list
        navigate('/')

        // notification
    }

    const onBackClicked = () => {
        navigate('/')
    }

    return (
        <>
            <div className={styles.back} onClick={onBackClicked}>
                <img alt="left_arrow" src={leftArrow} width={40} />
                <b>Back</b>
            </div>

            <div className={styles.contactDetailContainer}>
                <h2>{contact.extradata.name}</h2>
                <DisplayField name="Maxima Address" data={contact.myaddress}></DisplayField>
                <DisplayField name="Public Key" data={contact.publickey}></DisplayField>
                <DisplayField name="Mini Address" data={contact.extradata.minimaaddress}></DisplayField>
                <DisplayField name="MLS" data={contact.extradata.mls}></DisplayField>
                <DisplayField name="Top Block" data={contact.extradata.topblock}></DisplayField>

                {contact.samechain ? (
                    <div className={styles.chainRow}>
                        <img alt="contacts_icon" src={tick} width={20} className={`${styles.space} ${styles.greenFilter} pointer`} />
                        same chain
                    </div>
                ) : (
                    <div className={styles.chainRow}>
                        <img alt="contacts_icon" src={exclamation} width={20} className={`${styles.space} ${styles.redFilter} pointer`} />
                        different chain
                    </div>
                )}
                <button className={styles.margin} onClick={onRemoveContactClicked}>
                    Remove contact
                </button>
            </div>
        </>
    )
}

export default ContactDetailPage
