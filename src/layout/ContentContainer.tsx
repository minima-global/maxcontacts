import React from 'react'
import styles from './ContentContainer.module.css'
import ToastNotification from './ToastNotification'
import Header from './Header'
import Footer from './Footer'

interface IProps {
    children: React.ReactNode
}
function ContentContainer({ children }: IProps) {
    return (
        <div className={styles.layoutContainer}>
            <Header></Header>
            <div className={styles.container}>{children}</div>
            <Footer></Footer>
            <ToastNotification></ToastNotification>
        </div>
    )
}

export default ContentContainer
