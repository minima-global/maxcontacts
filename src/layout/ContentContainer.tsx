import React from 'react'
import styles from './ContentContainer.module.css'
import ToastNotification from './ToastNotification'

interface IProps {
    children: React.ReactNode
}
function ContentContainer({ children }: IProps) {
    return (
        <>
            <div className={styles.container}>{children}</div>
            <ToastNotification></ToastNotification>
        </>
    )
}

export default ContentContainer
