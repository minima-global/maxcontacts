import { useEffect } from 'react'
import styles from './ToastNotification.module.css'
import { useStore } from './../Store'

function ToastNotification() {
    const toastOpen = useStore((state) => state.isToastOpen)
    const closeToast = useStore((state) => state.closeToast)
    const toastType = useStore((state) => state.toastType)
    const toastMessage = useStore((state) => state.message)

    useEffect(() => {
        if (toastOpen) {
            setTimeout(() => {
                closeToast()
            }, 7000)
        }
    }, [toastOpen])

    const getClasses = () => {
        if (toastOpen) {
            if (toastType === 'success') {
                return `${styles.show} ${styles.success}`
            } else {
                return `${styles.show} ${styles.error}`
            }
        } else {
            return styles.hide
        }
    }

    return (
        <>
            <div id={styles.snackbar} className={getClasses()}>
                {toastMessage}
            </div>
        </>
    )
}

export default ToastNotification
