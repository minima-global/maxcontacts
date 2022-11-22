import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../Store'
import styles from './onboarding.module.css'
import successIcon from './../../assets/Success.svg'

function Page5() {
    const navigate = useNavigate()
    const contacts = useStore((state) => state.contacts)

    let addedString = 'Adding contact...'
    if (contacts.length !== 0) {
        addedString = `${contacts[contacts.length - 1].extradata.name} was added to your contacts!`
    }

    const onGoToContactsClicked = () => {
        navigate('/')
    }

    return (
        <>
            <div className={styles.onboardingContainer}>
                <h2>{addedString}</h2>
                <img alt="onboarding_icon" src={successIcon} width={100} />
                <button onClick={onGoToContactsClicked}>Go to Contacts</button>
            </div>
        </>
    )
}

export default Page5
