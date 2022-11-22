import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../Store'
import styles from './onboarding.module.css'
import onboardingIcon from './../../assets/onboardingIcon.svg'

function Page3() {
    const navigate = useNavigate()
    const profile = useStore((state) => state.profile)
    let name = ''
    profile ? (name = profile.name) : (name = '')

    const onCreateProfileClicked = () => {
        navigate('/onboardingp4')
    }

    return (
        <>
            <div className={styles.onboardingContainer}>
                <img alt="onboarding_icon" src={onboardingIcon} width={100} />
                <h2>Nice to meet you {name}</h2>
                <p>Create and manage your contacts in one place. Your contacts can be easily used across other MiniDapps</p>
                <button onClick={onCreateProfileClicked}>Get Started</button>
                <Link to="/contacts">I'll do this later</Link>
            </div>
        </>
    )
}

export default Page3
