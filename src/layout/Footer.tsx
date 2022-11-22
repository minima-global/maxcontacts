import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import allContactsIcon from './../assets/all_contacts.svg'
import favouritesIcon from './../assets/favourites.svg'
import profileIcon from './../assets/profile.svg'
import recentIcon from './../assets/recent.svg'

function MenuItem({ to, text, icon }: any) {
    return (
        <div className={styles.menuItem}>
            <Link to={to}>
                <img src={icon} width={40} />
                <div>{text}</div>
            </Link>
        </div>
    )
}

function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <MenuItem to="/" text="All Contacts" icon={allContactsIcon}></MenuItem>
                <MenuItem to="/" text="Last Active" icon={recentIcon}></MenuItem>
                <MenuItem to="/" text="Favourites" icon={favouritesIcon}></MenuItem>
                <MenuItem to="/profile" text="Profile" icon={profileIcon}></MenuItem>
            </div>
        </>
    )
}

export default Footer
