import { useEffect, useState } from 'react'
import { commands, MaxContact } from 'npm-upload-9781'
import MyContactItem from './MyContactItem'
import MyPropfileItem from './MyProfileItem'
import SearchItem from './SearchItem'
import NewContact from './NewContact'

interface IProps {
    myContacts: MaxContact[]
}
function ContactsList({ myContacts }: IProps) {
    return (
        <>
            <section>
                <h3>Contacts List</h3>
                <ul>
                    <MyPropfileItem name="neil"></MyPropfileItem>
                    <SearchItem></SearchItem>
                    <NewContact></NewContact>
                    {myContacts.map((contact, i) => (
                        <MyContactItem contact={contact} key={i}></MyContactItem>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default ContactsList
