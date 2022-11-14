import { useEffect, useState } from 'react'
import { commands, MaxContact, Maxima } from 'npm-upload-9781'
import MyContactItem from './MyContactItem'
import MyPropfileItem from './MyProfileItem'
import SearchItem from './SearchItem'
import NewContact from './NewContact'
import styles from './ContactList.module.css'

interface IProps {
    myProfile: Maxima
    myContacts: MaxContact[]
}
function ContactsList({ myProfile, myContacts }: IProps) {
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
