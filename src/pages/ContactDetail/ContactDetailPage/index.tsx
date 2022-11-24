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
import profilePic from './../../../assets/profile_pic.png'
import star from './../../../assets/star.svg'
interface IProps {
    contact: MaxContact
}
function ContactDetailPage({ contact }: IProps) {
    const [shareContactText, setShareContactText] = useState('Share Contact')
    const navigate = useNavigate()

    const onShareContactButtonClicked = () => {
        navigator.clipboard.writeText(contact.currentaddress)
        setShareContactText('Address copied to clipboard')
        setTimeout(() => {
            setShareContactText('Share Contact')
        }, 5000)
    }

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

            <div className={styles.contactDetailSection}>
                <div className={styles.topRow}>
                    <div className={styles.topRowLeft}>
                        <img alt="profile_pic" src={profilePic} height={60} />
                        <div>
                            <div className={styles.name}>{contact.extradata.name}</div>
                            <div>Add nickname</div>
                        </div>
                    </div>
                    <div>
                        <img alt="star" src={star} height={30} />
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <button onClick={onShareContactButtonClicked}>{shareContactText}</button>
                </div>
            </div>

            <div className={styles.contactFieldsContainer}>
                <DisplayField name="Current Address" data={contact.currentaddress}></DisplayField>
                <DisplayField name="My Address" data={contact.myaddress}></DisplayField>
                <DisplayField name="Public Key" data={contact.publickey}></DisplayField>
                <DisplayField name="Mini Address" data={contact.extradata.minimaaddress}></DisplayField>
                <DisplayField name="MLS" data={contact.extradata.mls}></DisplayField>
                <DisplayField name="Top Block" data={contact.extradata.topblock}></DisplayField>
            </div>

            <div className={styles.booleanContainer}>
                <div className={styles.booleanItem}>
                    <div>Network:</div>
                    <div>icon</div>
                </div>
                <div className={styles.booleanItem}>
                    <div>Chain:</div>
                    <div>icon</div>
                </div>
                <div className={styles.booleanItem}>
                    <div>Same Chain:</div>
                    <div>icon</div>
                </div>
            </div>

            <div className={`${styles.remove} pointer underline`} onClick={onRemoveContactClicked}>
                <div>Remove contact</div>
            </div>
        </>
    )
}

export default ContactDetailPage
