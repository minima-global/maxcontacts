import React from 'react'
import styles from './ContentContainer.module.css'
import { Outlet } from 'react-router-dom'

function OnboardingContainer() {
    return (
        <>
            <div className={`${styles.container} ${styles.onboardingBackground}`}>
                <div className={styles.spacer}></div>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default OnboardingContainer
