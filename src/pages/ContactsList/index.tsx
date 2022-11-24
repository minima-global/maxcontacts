import { useEffect, useState } from 'react'
import { MaxContact } from 'npm-upload-9781'
import MyContactItem from './MyContactItem'
import SearchItem from './SearchItem'
import NewContact from './NewContact'
import styles from './ContactList.module.css'

interface IProps {
    myContacts: MaxContact[]
}
function ContactsList({ myContacts }: IProps) {
    const [filteredContacts, setFilteredContacts] = useState<MaxContact[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const myFilteredContacts = myContacts.filter((contact) => {
            const name = contact.extradata.name.toLowerCase()
            const filter = searchQuery.toLowerCase()
            return name.includes(filter)
        })
        setFilteredContacts(myFilteredContacts)
    }, [myContacts, searchQuery])

    const onSearchQueryChange = (query: string) => {
        // console.log(query)
        setSearchQuery(query)
    }

    // duplicate contact x10 for testing
    // let myContactsTest = []
    // for (let i = 0; i < 10; i++) {
    //     if (myContacts.length !== 0) {
    //         myContactsTest.push(myContacts[0])
    //     }
    // }

    const NoContactsMessage = () => {
        const centerStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '75px',
        }

        if (myContacts.length === 0) {
            return <div style={centerStyle}>You have no contacts</div>
        }
        if (filteredContacts.length === 0) {
            return <div style={centerStyle}>No search results</div>
        }
        return null
    }

    return (
        <>
            <div className={styles.contactsListContainer}>
                {/* <MyPropfileItem name={myProfile.name}></MyPropfileItem> */}
                <SearchItem searchQuery={searchQuery} onSearchQueryChange={onSearchQueryChange}></SearchItem>
                <NewContact></NewContact>
                {filteredContacts.map((contact, i) => (
                    <MyContactItem contact={contact} key={i}></MyContactItem>
                ))}
                <NoContactsMessage></NoContactsMessage>
            </div>
        </>
    )
}

export default ContactsList
