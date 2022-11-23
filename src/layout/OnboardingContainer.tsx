import React from 'react'
import styles from './ContentContainer.module.css'
import { Outlet } from 'react-router-dom'

function OnboardingContainer() {
    return (
        <>
            <div className={styles.container}>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default OnboardingContainer
