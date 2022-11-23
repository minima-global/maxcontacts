import styles from './DisplayField.module.css'
import { useState } from 'react'
import openChev from './../../assets/open.svg'
import closedChev from './../../assets/closed.svg'
import copyIcon from './../../assets/copyIcon.svg'

const DisplayField = ({ name, data }: { name: string; data: string }) => {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const onFieldClicked = () => {
        setOpen((open) => !open)
    }

    const onCopyButtonClicked = () => {
        navigator.clipboard.writeText(data)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <div className={styles.displayFieldContainer}>
            <div className={`${styles.displayTitle} pointer`} onClick={onFieldClicked}>
                <div>{name}</div>
                <div>{open ? <img alt="open" src={openChev} width={15} /> : <img alt="closed" src={closedChev} width={15} />}</div>
            </div>
            {open ? (
                <>
                    <div className={styles.divider}></div>
                    <div className={styles.displayData}>
                        <div>{data}</div>
                        <div>
                            <img
                                alt="copy_icon"
                                src={copyIcon}
                                width={20}
                                className={copied ? `${styles.greenFilter} pointer` : `pointer`}
                                style={{ marginBottom: '10px' }}
                                onClick={onCopyButtonClicked}
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default DisplayField
