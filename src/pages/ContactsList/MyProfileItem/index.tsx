import styles from './MyProfileItem.module.css'
import contactsIcon from './../../../assets/contactsIcon.svg'

interface IProps {
    name: string
}
function MyProfileItem({ name }: IProps) {
    return (
        <li className={styles.container}>
            <div className={styles.containerItem}>
                <img alt="contacts_icon" src={contactsIcon} width={40} />
            </div>
            <div className={styles.containerItem}>
                <div>{name}</div>
                <div>view profile</div>
            </div>
        </li>
    )
}

export default MyProfileItem
