import styles from './DisplayField.module.css'

const DisplayField = ({ name, data }: { name: string; data: string }) => {
    return (
        <>
            <div className={styles.displayTitle}>{name}</div>
            <div className={styles.displayData}>{data}</div>
        </>
    )
}

export default DisplayField
