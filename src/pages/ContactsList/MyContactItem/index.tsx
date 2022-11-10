import { commands, MaxContact } from 'npm-upload-9781'
import { removeContact } from './../../../Store'
import { Link } from 'react-router-dom'

interface IProps {
    contact: MaxContact
}
function MyContactItem({ contact }: IProps) {
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

    return (
        <li>
            <h4>{contact.extradata.name}</h4>
            <div>{getLastSeenString(contact.lastseen)}</div>
            {contact.samechain ? <div>same chain</div> : <div>different chain</div>}
            <button onClick={onRemoveContactClicked}>remove</button>
            <button>
                <Link to={`/contact/${contact.id}`}>contact detail</Link>
            </button>
        </li>
    )
}

export default MyContactItem
