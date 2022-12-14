import React from 'react'
import styles from './ContentContainer.module.css'
import ToastNotification from './ToastNotification'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function ContentContainer() {
    return (
        <div className={styles.layoutContainer}>
            <Header></Header>
            <div className={`${styles.container} ${styles.contentBackground}`}>
                <Outlet></Outlet>
            </div>

            <ToastNotification></ToastNotification>
            <Footer></Footer>
        </div>
    )
}

export default ContentContainer
