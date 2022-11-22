import React from 'react'
import styles from './ContentContainer.module.css'

interface IProps {
    children: React.ReactNode
}
function ContentContainer({ children }: IProps) {
    return (
        <>
            <div className={styles.container}>{children}</div>
        </>
    )
}

export default ContentContainer
