import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../Store'
import styles from './onboarding.module.css'
import onboardingIcon from './../../assets/onboardingIcon.svg'
import { useState, ChangeEvent } from 'react'
import { changeProfileName } from './../../Store'

function Page2() {
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState('')
    const setSkipOnboarding = useStore((state) => state.setSkipOnboarding)

    const onDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value
        setDisplayName(newName)
    }

    const onUpdateNameClicked = async () => {
        await changeProfileName(displayName)
        navigate('/onboardingp3')
    }

    const onLaterClicked = () => {
        setSkipOnboarding(true)
        navigate('/')
    }

    return (
        <>
            <div className={styles.onboardingContainer}>
                <h3>Let's get you set up</h3>
                <label>
                    Choose a display name
                    <input value={displayName} onChange={onDisplayNameChange}></input>
                </label>

                <button onClick={onUpdateNameClicked}>Save and continue</button>
                <div onClick={onLaterClicked} className={styles.link}>
                    I'll do this later
                </div>
            </div>
        </>
    )
}

export default Page2
