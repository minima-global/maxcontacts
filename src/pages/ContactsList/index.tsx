import { useEffect, useState } from 'react'
import { commands, MaxContact, Maxima } from 'npm-upload-9781'
import MyContactItem from './MyContactItem'
import MyPropfileItem from './MyProfileItem'
import SearchItem from './SearchItem'
import NewContact from './NewContact'
import styles from './ContactList.module.css'
import { useNavigate } from 'react-router-dom'
import { useStore } from './../../Store'

interface IProps {
    myProfile: Maxima
    myContacts: MaxContact[]
}
function ContactsList({ myProfile, myContacts }: IProps) {
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '75px',
    }

    const navigate = useNavigate()
    const skipOnboarding = useStore((state) => state.skipOnboarding)

    if (myProfile.name === 'noname' && myContacts.length === 0 && !skipOnboarding) {
        navigate('/onboardingp1')
    }

    return (
        <>
            <div className={styles.contactsListContainer}>
                <MyPropfileItem name={myProfile.name}></MyPropfileItem>
                {/* <SearchItem></SearchItem> */}
                <NewContact></NewContact>
                {myContacts.map((contact, i) => (
                    <MyContactItem contact={contact} key={i}></MyContactItem>
                ))}
                {myContacts.length === 0 ? <div style={centerStyle}>You have no contacts</div> : null}
            </div>
        </>
    )
}

export default ContactsList
