import { useContext, useEffect } from 'react'
import { appContext } from '../../AppContext'

const Notification = () => {
    const { _notification, dismissNotification } = useContext(appContext)

    useEffect(() => {
        if (_notification) {
            const timer = setTimeout(() => {
                dismissNotification();
            }, 3000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [_notification, dismissNotification]);

    if (!_notification.display) {
        return <div />
    }

    return (
        <div className="fixed left-0 bottom-0 p-5 w-full">
            <div className="w-full text-custom-black py-3 font-medium text-sm text-center bg-custom-pale-yellow rounded rounded-xl">
                {_notification.message}
            </div>
        </div>
    )
}

export default Notification
