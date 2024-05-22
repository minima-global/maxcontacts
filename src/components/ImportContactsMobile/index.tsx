import { useContext } from 'react'

import { appContext } from '../../AppContext'


function ImportContactsMobile() {
    const { promptImportContacts } = useContext(appContext)

    return (
        <div className="cursor-pointer grid grid-cols-[22px_1fr] max-w-max px-3 py-2 gap-2 bg-[#7A17F9] rounded-full"  onClick={promptImportContacts}>
        <div className='my-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
              </div>              
              <div className='truncate my-auto'>
                  <p className='text-xs font-bold text-white truncate'>
                  Batch
                  </p>
              </div>
          </div>
    )
}

export default ImportContactsMobile;
