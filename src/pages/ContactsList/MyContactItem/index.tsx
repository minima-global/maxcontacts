import { commands, MaxContact } from 'npm-upload-9781'
import { removeContact } from './../../../Store'
import { Link, useNavigate } from 'react-router-dom'
import styles from './MyContactItem.module.css'
import exclamation from './../../../assets/exclamation.svg'
import tick from './../../../assets/tick.svg'
import profilePic from './../../../assets/profile_pic.png'
import link from './../../../assets/link.svg'
import cellular from './../../../assets/signal_cellular_alt.svg'

interface IProps {
    contact: MaxContact
}
function MyContactItem({ contact }: IProps) {
    const navigate = useNavigate()

    const onRemoveContactClicked = async () => {
        removeContact(contact.id)
    }

    const getTimeDiff = (timeMilli: number) => {
        const nowMilli = new Date().getTime()
        const diff = nowMilli - timeMilli

        // console.log('last seen', new Date(timeMilli))
        // console.log('now', new Date(nowMilli))
        // console.log('diff', diff)

        let diffMilli = diff

        // calculate days and remove
        const dd = Math.floor(diffMilli / 24 / 60 / 60 / 1000)
        diffMilli -= dd * 24 * 60 * 60 * 1000

        // calculate hours and remove
        const hh = Math.floor(diffMilli / 60 / 60 / 1000)
        diffMilli -= hh * 60 * 60 * 1000

        // calculate minutes and remove
        let mm = Math.floor(diffMilli / 60 / 1000)
        diffMilli -= mm * 60 * 1000

        // if there are no hours, start from 1 minute
        if (hh === 0) {
            mm++
        }

        return {
            dd,
            hh,
            mm,
        }
    }

    const getLastSeenString = (lastSeenMilli: number) => {
        const diff = getTimeDiff(lastSeenMilli)
        let daysAgo = ''
        let hoursAgo = ''
        let minutesAgo = ''
        if (diff.dd > 0) {
            daysAgo = `${diff.dd} days`
        }
        if (diff.hh > 0) {
            hoursAgo = `${diff.hh} hours`
        }
        if (diff.mm > 0) {
            minutesAgo = `${diff.mm} minutes`
        }
        return `last seen ${daysAgo} ${hoursAgo} ${minutesAgo} ago`
    }

    const onContactClicked = () => {
        navigate(`/contact/${contact.id}`)
    }

    return (
        <>
            <div onClick={onContactClicked} className={`${styles.myContactItem} pointer`}>
                <div className={styles.leftSection}>
                    <img alt="profile_pic" src={profilePic} width={60} />
                    <div className={styles.textSection}>
                        <div className={styles.name}>{contact.extradata.name}</div>
                        <div>{getLastSeenString(contact.lastseen)}</div>
                    </div>
                </div>

                <div className={styles.greenIconSection}>
                    <img alt="cellular" src={cellular} width={15} />
                    <img alt="link" src={link} width={20} />
                </div>
            </div>
        </>
    )
}

export default MyContactItem
