import { useState, useEffect, ChangeEvent } from 'react'
import { commands, Maxima } from 'npm-upload-9781'
import { changeProfileName } from './../../Store'
import styles from './Profile.module.css'
import Modal from './../../layout/Modal'
import copyIcon from './../../assets/copyIcon.svg'
import { useNavigate } from 'react-router-dom'
import leftArrow from './../../assets/left-arrow.svg'
import DisplayField from './../../components/DisplayField'
import profilePic2 from './../../assets/profile_pic2.png'
import star from './../../assets/star.svg'
import link from './../../assets/link.svg'
import cellular from './../../assets/signal_cellular_alt.svg'

interface IProps {
    myProfile: Maxima
}
function Profile({ myProfile }: IProps) {
    const [openModal, setOpenModal] = useState(false)
    const [newName, setNewName] = useState('')
    const [shareAddressText, setShareAddressText] = useState('Share Address')
    const navigate = useNavigate()

    const onShareAddressButtonClicked = () => {
        navigator.clipboard.writeText(myProfile.contact)
        setShareAddressText('Address copied to clipboard')
        setTimeout(() => {
            setShareAddressText('Share Address')
        }, 5000)
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value
        // console.log('event new val', newVal)
        setNewName(newVal)
    }

    const onEditDisplayNameClicked = () => {
        setOpenModal(true)
    }

    const onUpdateNameClicked = async () => {
        await changeProfileName(newName)
        setOpenModal(false)
    }

    const onModalCloseClicked = () => {
        setOpenModal(false)
        setNewName('')
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
            <div className={styles.profileDetailSection}>
                <div className={styles.topRow}>
                    <div className={styles.topRowLeft}>
                        <img alt="profile_pic" src={profilePic2} height={60} />
                        <div>
                            <div className={styles.name}>{myProfile.name}</div>
                            <div onClick={onEditDisplayNameClicked} className="pointer">
                                Edit Display Name
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <button onClick={onShareAddressButtonClicked}>{shareAddressText}</button>
                </div>
            </div>

            <div className={styles.contactFieldsContainer}>
                <DisplayField name="My Address" data={myProfile.contact}></DisplayField>
                <DisplayField name="Local Identity" data={myProfile.localidentity}></DisplayField>
                <DisplayField name="MLS" data={myProfile.mls}></DisplayField>
                <DisplayField name="Public Key" data={myProfile.publickey}></DisplayField>
            </div>

            <div className={styles.booleanContainer}>
                <div className={styles.booleanItem}>
                    <div>Network:</div>
                    <div>
                        <img alt="cellular" src={cellular} width={15} />
                    </div>
                </div>
                <div className={styles.booleanItem}>
                    <div>Chain:</div>
                    <div>
                        <img alt="link" src={link} width={20} />
                    </div>
                </div>
            </div>

            <Modal open={openModal}>
                <h4>Display Name</h4>
                <label>
                    Choose a display name
                    <input value={newName} onChange={onNameChange}></input>
                </label>

                <button className="modal-button" onClick={onUpdateNameClicked}>
                    Save
                </button>

                <a onClick={onModalCloseClicked} className="pointer underline">
                    Cancel
                </a>
            </Modal>
        </>
    )
}

export default Profile
