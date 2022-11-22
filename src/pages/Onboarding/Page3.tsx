import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../Store'
import styles from './onboarding.module.css'
import onboardingIcon from './../../assets/onboardingIcon.svg'

function Page3() {
    const navigate = useNavigate()
    const profile = useStore((state) => state.profile)
    const setSkipOnboarding = useStore((state) => state.setSkipOnboarding)
    let name = ''
    profile ? (name = profile.name) : (name = '')

    const onCreateProfileClicked = () => {
        navigate('/onboardingp4')
    }

    const onLaterClicked = () => {
        setSkipOnboarding(true)
        navigate('/')
    }

    return (
        <>
            <div className={styles.onboardingContainer}>
                <img alt="onboarding_icon" src={onboardingIcon} width={100} />
                <h2>Nice to meet you {name}</h2>
                <p>Create and manage your contacts in one place. Your contacts can be easily used across other MiniDapps</p>
                <button onClick={onCreateProfileClicked}>Get Started</button>
                <div onClick={onLaterClicked} className={styles.link}>
                    I'll do this later
                </div>
            </div>
        </>
    )
}

export default Page3
