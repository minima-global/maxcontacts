import styles from './MyProfileItem.module.css'
import contactsIcon from './../../../assets/contactsIcon.svg'
import { Link, useNavigate } from 'react-router-dom'

interface IProps {
    name: string
}
function MyProfileItem({ name }: IProps) {
    const navigate = useNavigate()

    const onViewProfileClicked = () => {
        navigate('/profile')
    }
    return (
        <li className={styles.container} onClick={onViewProfileClicked}>
            <div className={styles.containerItem}>
                <h2>{name}</h2>
                <div>view your profile</div>
            </div>
        </li>
    )
}

export default MyProfileItem
