import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <Link to="/">All Contacts</Link>
                <Link to="/">Last Active</Link>
                <Link to="/">Favourites</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </>
    )
}

export default Footer
