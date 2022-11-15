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
    const navigate = useNavigate()
    const skipOnboarding = useStore((state) => state.skipOnboarding)

    if (myProfile.name === 'noname' && myContacts.length === 0 && !skipOnboarding) {
        navigate('/onboarding')
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
            </div>
        </>
    )
}

export default ContactsList
