import { useState, useEffect, ChangeEvent } from 'react'
import { commands, Maxima } from 'npm-upload-9781'
import { changeProfileName } from './../../Store'
import styles from './Profile.module.css'
import Modal from './../../layout/Modal'
import copyIcon from './../../assets/copy_120015.svg'
import { useNavigate } from 'react-router-dom'
import leftArrow from './../../assets/left-arrow.svg'

interface IProps {
    myProfile: Maxima
}
function Profile({ myProfile }: IProps) {
    const [openModal, setOpenModal] = useState(false)
    const [newName, setNewName] = useState('')
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value
        // console.log('event new val', newVal)
        setNewName(newVal)
    }

    const onUpdateNameClicked = async () => {
        await changeProfileName(newName)
        setOpenModal(false)
    }

    const onModalCloseClicked = () => {
        setOpenModal(false)
        setNewName('')
    }

    const onCopyButtonClicked = () => {
        navigator.clipboard.writeText(myProfile.contact)
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
            <div className={styles.back} onClick={onBackClicked}>
                <img alt="left_arrow" src={leftArrow} width={40} />
                <b>Back</b>
            </div>
            <div className={styles.profileContainer}>
                <h2>{myProfile.name}</h2>
                <div>
                    <button onClick={() => setOpenModal(true)}>Edit your name</button>
                </div>

                <div style={{ paddingTop: '20px' }}>{myProfile.contact}</div>
                <img
                    alt="copy_icon"
                    src={copyIcon}
                    width={40}
                    className={copied ? `${styles.greenFilter} pointer` : `${styles.purpleColor} pointer`}
                    onClick={onCopyButtonClicked}
                />
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
