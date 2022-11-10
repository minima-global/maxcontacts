import React from 'react'
import styles from './Modal.module.css'

interface IProps {
    children: React.ReactNode
    open?: boolean
}
function Modal({ children, open }: IProps) {
    return (
        <>
            <div className={open ? `${styles.modal} ${styles.open}` : `${styles.modal} ${styles.closed}`}>
                <div className={styles.modalContent}>
                    {children}
                    {/* <span className="close" onClick={onCloseClicked}>&times;</span>
                    <p>Some text in the Modal..</p> */}
                </div>
            </div>
        </>
    )
}

export default Modal
