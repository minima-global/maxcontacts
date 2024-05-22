import { useContext } from 'react'
import { appContext } from '../../AppContext'


function ExportContactsMobile() {
    const { _hasContacts, exportContacts } = useContext(appContext)

    if (!_hasContacts) {
      return null;
    }

    return (
        <div className="cursor-pointer grid grid-cols-[22px_1fr] max-w-max px-3 py-2 gap-2 bg-[#7A17F9] rounded-full"  onClick={exportContacts}>
      <div className='my-auto'>
      <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /><path d="M15 18h7" /><path d="M19 15l3 3l-3 3" /></svg>
            </div>              
            <div className='truncate my-auto'>
                <p className='text-xs font-bold text-white truncate'>
                Export Contacts
                </p>
            </div>
        </div>
    )
}

export default ExportContactsMobile;
