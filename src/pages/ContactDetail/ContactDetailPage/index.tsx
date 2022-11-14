import { MaxContact } from 'npm-upload-9781'
import copyIcon from './../../../assets/copy_120015.svg'
import { removeContact } from './../../../Store'
import { useNavigate } from 'react-router-dom'
import styles from './ContactDetail.module.css'
import exclamation from './../../../assets/exclamation.svg'
import tick from './../../../assets/tick.svg'
import { useState } from 'react'
import leftArrow from './../../../assets/left-arrow.svg'

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

    const onCopyButtonClicked = () => {
        navigator.clipboard.writeText(contact.myaddress)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    const onBackClicked = () => {
        navigate('/')
    }

    return (
        <>
            <div className={styles.back}>
                <img alt="left_arrow" src={leftArrow} width={40} onClick={onBackClicked} />
                <b>Back</b>
            </div>

            <div className={styles.contactDetailContainer}>
                <h2>{contact.extradata.name}</h2>
                <div>{contact.myaddress}</div>
                <img
                    alt="copy_icon"
                    src={copyIcon}
                    width={40}
                    className={copied ? `${styles.greenFilter} pointer` : `${styles.purpleColor} pointer`}
                    onClick={onCopyButtonClicked}
                />

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
