import { Link, useNavigate } from 'react-router-dom'
import { useStore, createContact } from '../../Store'
import styles from './onboarding.module.css'
import { useState, ChangeEvent } from 'react'

function Page4() {
    const navigate = useNavigate()
    const [contactAddress, setContactAddress] = useState('')
    const setSkipOnboarding = useStore((state) => state.setSkipOnboarding)

    const onContactAddressChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newAddress = event.target.value
        setContactAddress(newAddress)
    }

    const onAddContactClicked = async () => {
        await createContact(contactAddress)
        navigate('/onboardingp5')
    }

    const onLaterClicked = () => {
        setSkipOnboarding(true)
        navigate('/')
    }

    const placeholderText =
        'e.g. MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G152JZF6TWH3UNKQRAW6BHUB5WWTJQB854D68PUDWPRVP9ZHQQQ4HBWWBERK2WG09FBTVD6JM91B790UM1TYR91EF75W8EDS66RPVGT9BJ7CSY2B68TPJGZE1S2EVZ4C4JAQT381KEDCEFD7A1J9S32Y0VFB7DEVAFZ09SVPTFW85R0Y5HEKCA7UFZ712NYSBWCC8W4P36UYRP410608006VJWPSC@193.187.129.51:9041'

    return (
        <>
            <div className={styles.onboardingContainer}>
                <h3>Add your first contact</h3>

                <label>
                    Enter your contacts Minima address
                    <textarea rows={6} placeholder={placeholderText} value={contactAddress} onChange={onContactAddressChange}></textarea>
                </label>

                <button onClick={onAddContactClicked}>Add Contact</button>
                <div onClick={onLaterClicked} className={styles.link}>
                    I'll do this later
                </div>
            </div>
        </>
    )
}

export default Page4
