import { useEffect, useState } from 'react'
import { events, Decimal, MDS } from 'npm-upload-9781'
import ContactsList from './pages/ContactsList'
import ContentContainer from './layout/ContentContainer'
import { Routes, Route } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted'
import Profile from './pages/Profile'
import { useStore } from './Store'
import ContactDetail from './pages/ContactDetail'
import Header from './layout/Header'

// @ts-ignore: can assign
MDS.DEBUG_HOST = '127.0.0.1'
// @ts-ignore: can assign
MDS.DEBUG_PORT = 9003
// @ts-ignore: can assign
MDS.DEBUG_MINIDAPPID = '0xC33D4A71ED92515668DBD669274F595EBFAB68748220453383032A2BDDE0B915'

function App() {
    const [appInitialised, setAppInitialised] = useState(false)

    const myProfile = useStore((state) => state.profile) // initialised to null
    const getProfile = useStore((state) => state.getProfile)
    const myContacts = useStore((state) => state.contacts) // initialised to []
    const getContacts = useStore((state) => state.getContacts)

    // Decimal.js is used to handle floating point numbers
    Decimal.set({ precision: 60 })

    useEffect(() => {
        events.onInit(() => {
            setAppInitialised(true)
            getProfile()
            getContacts()
        })
    }, [])

    return (
        <div className="App">
            <Header></Header>
            {appInitialised && myProfile ? (
                <ContentContainer>
                    <Routes>
                        <Route path="/" element={<ContactsList myContacts={myContacts} myProfile={myProfile}></ContactsList>} />
                        <Route path="/contact/:id" element={<ContactDetail></ContactDetail>} />
                        <Route path="/profile" element={<Profile myProfile={myProfile}></Profile>} />
                    </Routes>
                </ContentContainer>
            ) : (
                <div>...loading</div>
            )}
        </div>
    )
}

export default App
