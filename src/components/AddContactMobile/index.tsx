import { useContext } from 'react'
import { appContext } from '../../AppContext'
import addPerson from '../../assets/person_add.svg'

function AddContactMobile() {
    const { _hasContacts, promptAddContact } = useContext(appContext)

    return (
        <div className="cursor-pointer grid grid-cols-[22px_1fr] max-w-max px-3 py-2 gap-2 bg-[#7A17F9] rounded-full" onClick={promptAddContact}>
            <div className='my-auto'>
                <img src={addPerson} alt="addPerson" className="w-[20px]"/>         
            </div>              
            <div className='truncate my-auto'>
                <p className='text-xs font-bold text-white truncate'>
                {_hasContacts && "New Contact"}
                {!_hasContacts && "Add your first contact"}
                </p>
            </div>
        </div>
    )
}

export default AddContactMobile;