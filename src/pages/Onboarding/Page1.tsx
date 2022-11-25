import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../Store'
import styles from './onboarding.module.css'
import onboardingIcon from './../../assets/onboardingIcon.svg'

function Page1() {
    const navigate = useNavigate()
    const setSkipOnboarding = useStore((state) => state.setSkipOnboarding)

    const onCreateProfileClicked = () => {
        navigate('/onboardingp2')
    }

    const onLaterClicked = () => {
        setSkipOnboarding(true)
        navigate('/')
    }

    return (
        <>
            <div className={styles.onboardingContainer}>
                <img alt="onboarding_icon" src={onboardingIcon} width={100} />
                <h2>Welcome to Contacts!</h2>
                <p>Create and manage your contacts in one place. Your contacts can be easily used across other MiniDapps</p>
                <div className={styles.actionButtons}>
                    <button onClick={onCreateProfileClicked}>Create profile</button>
                    <div onClick={onLaterClicked} className={styles.link}>
                        I'll do this later
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page1
