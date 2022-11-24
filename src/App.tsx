import { useEffect, useState } from 'react'
import { events, Decimal, MDS } from 'npm-upload-9781'
import ContactsList from './pages/ContactsList'
import ContentContainer from './layout/ContentContainer'
import OnboardingContainer from './layout/OnboardingContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import GettingStarted from './pages/Onboarding/Page1'
import Profile from './pages/Profile'
import { useStore } from './Store'
import ContactDetail from './pages/ContactDetail'
import Header from './layout/Header'
import Page1 from './pages/Onboarding/Page1'
import Page2 from './pages/Onboarding/Page2'
import Page3 from './pages/Onboarding/Page3'
import Page4 from './pages/Onboarding/Page4'
import Page5 from './pages/Onboarding/Page5'

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore: can assign
    MDS.DEBUG_HOST = '127.0.0.1'
    // @ts-ignore: can assign
    MDS.DEBUG_PORT = 9003
    // @ts-ignore: can assign
    MDS.DEBUG_MINIDAPPID = '0xDC4802476504AE37C4D5318A2788D3AD89830D9CDE19F62909DF63C2F7160C9F'
}

function App() {
    const [appInitialised, setAppInitialised] = useState(false)
    const [contactsLoaded, setContactsLoaded] = useState(false)

    const myProfile = useStore((state) => state.profile) // initialised to null
    const getProfile = useStore((state) => state.getProfile)
    const myContacts = useStore((state) => state.contacts) // initialised to []
    const getContacts = useStore((state) => state.getContacts)
    const skipOnboarding = useStore((state) => state.skipOnboarding)

    // Decimal.js is used to handle floating point numbers
    Decimal.set({ precision: 60 })

    useEffect(() => {
        events.onInit(async () => {
            setAppInitialised(true)
            getProfile()
            await getContacts()
            setContactsLoaded(true)
        })
        events.onMaxcontacts(() => {
            console.log('new contacts event')
            getContacts()
        })
    }, [])

    // minima, profile and contacts have loaded
    const dataLoaded = appInitialised && myProfile && contactsLoaded

    // minima, profile and contacts have loaded
    // but the user has not input any data so they are using the app for the first time
    const showOnboarding = dataLoaded && myProfile.name === 'noname' && myContacts.length === 0 && !skipOnboarding

    return (
        <div className="App">
            {dataLoaded ? (
                <>
                    <Routes>
                        <Route element={<OnboardingContainer></OnboardingContainer>}>
                            <Route path="onboardingp1" element={<Page1></Page1>} />
                            <Route path="onboardingp2" element={<Page2></Page2>} />
                            <Route path="onboardingp3" element={<Page3></Page3>} />
                            <Route path="onboardingp4" element={<Page4></Page4>} />
                            <Route path="onboardingp5" element={<Page5></Page5>} />
                        </Route>
                        <Route element={<ContentContainer></ContentContainer>}>
                            <Route
                                path="/"
                                element={
                                    showOnboarding ? (
                                        <Navigate to="onboardingp1" />
                                    ) : (
                                        <ContactsList myContacts={myContacts} myProfile={myProfile}></ContactsList>
                                    )
                                }
                            />
                            <Route path="contact/:id" element={<ContactDetail></ContactDetail>} />
                            <Route path="profile" element={<Profile myProfile={myProfile}></Profile>} />
                        </Route>
                    </Routes>
                </>
            ) : (
                <div>...loading</div>
            )}
        </div>
    )
}

export default App
