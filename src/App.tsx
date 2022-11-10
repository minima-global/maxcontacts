import { useEffect, useState } from 'react'
import { events, Decimal, MDS } from 'npm-upload-9781'
import ContactsList from './pages/ContactsList'
import ContentContainer from './layout/ContentContainer'
import { Routes, Route } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted'
import { useStore } from './Store'
import ContactDetail from './pages/ContactDetail'

// @ts-ignore: can assign
MDS.DEBUG_HOST = '127.0.0.1'
// @ts-ignore: can assign
MDS.DEBUG_PORT = 9003
// @ts-ignore: can assign
MDS.DEBUG_MINIDAPPID = '0xBEA3B27EE83632F942399C51209464F6F76E0D4EFE6C3065F852F7A682BDEAA6'

function App() {
    const [appInitialised, setAppInitialised] = useState(false)

    const myContacts = useStore((state) => state.contacts)
    const getContacts = useStore((state) => state.getContacts)

    // Decimal.js is used to handle floating point numbers
    Decimal.set({ precision: 60 })

    useEffect(() => {
        events.onInit(() => {
            setAppInitialised(true)
            getContacts()
        })
    }, [])

    return (
        <div className="App">
            <h1>Contacts</h1>
            {appInitialised ? (
                <ContentContainer>
                    <Routes>
                        <Route path="/" element={<GettingStarted></GettingStarted>}></Route>
                        <Route path="/contacts" element={<ContactsList myContacts={myContacts}></ContactsList>} />
                        <Route path="/contact/:id" element={<ContactDetail></ContactDetail>} />
                        {/* <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="dashboard" element={<Dashboard />} /> */}
                    </Routes>
                    {/* <MyProfile></MyProfile>
                    <NewContact refresh={onRefreshContactList}></NewContact>
                    <ContactsList myContacts={myContacts} refresh={onRefreshContactList}></ContactsList> */}
                </ContentContainer>
            ) : (
                <div>...loading</div>
            )}
        </div>
    )
}

export default App
