import create from 'zustand'
import { commands, MaxContact, Maxima } from 'npm-upload-9781'

export interface MaxContactPlus extends MaxContact {
    favourite: boolean
    nickname: string
}

interface StoreState {
    profile: Maxima | null
    getProfile: () => void
    contacts: MaxContactPlus[]
    getContacts: () => void
    getContactById: (id: number) => MaxContactPlus | null
    skipOnboarding: boolean
    setSkipOnboarding: (skip: boolean) => void
    // toast stuff
    isToastOpen: boolean
    closeToast: () => void
    message: string
    toastType: 'success' | 'error' | 'warning'
    toast: {
        success: (message: string) => void
        error: (message: string) => void
        warning: (message: string) => void
    }
}

export const useStore = create<StoreState>()((set, get) => ({
    profile: null,
    getProfile: async () => {
        const maxima = await commands.maxima()
        console.log('profile', maxima)
        set((state) => ({ profile: maxima }))
    },
    contacts: [],
    // updates the store
    getContacts: async () => {
        const response = await commands.maxcontacts()

        // decorate contact with favourite and nickname data stored locally
        const updatedContacts = decorateContacts(response.contacts)

        console.log('contacts', updatedContacts)

        set((state) => ({ contacts: updatedContacts }))
    },
    getContactById: (id: number) => {
        const foundContact = get().contacts.find((contact) => contact.id === id)
        if (typeof foundContact === 'undefined') {
            console.error(`contact id ${id} not found`)
            return null
        } else {
            return foundContact
        }
    },
    skipOnboarding: false,
    setSkipOnboarding: (skip: boolean) => {
        set((state) => ({ skipOnboarding: skip }))
    },
    // toast stuff
    isToastOpen: false,
    closeToast: () => set(() => ({ isToastOpen: false })),
    message: '',
    toastType: 'success',
    toast: {
        success: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'success',
                message,
            })),
        error: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'error',
                message,
            })),
        warning: (message: string) =>
            set((state) => ({
                isToastOpen: true,
                toastType: 'warning',
                message,
            })),
    },
}))

export const removeContact = async (contactId: number) => {
    const action = 'remove'
    const id = contactId.toString()
    const response = await commands.maxcontacts({ action, id })
    console.log('remove contact response', response)
    useStore.getState().toast.success(`contact removed`)

    // do not refresh contacts in store
    // the maxcontacts event will notify us when the contact has been fully added
}

export const createContact = async (newContactAddress: string) => {
    const action = 'add'
    const contact = newContactAddress

    try {
        const response: any = await commands.maxcontacts({ action, contact }) // maxcontacts returns a different object for 'add' action
        console.log('add contact response', response)

        if (response.maxima.delivered) {
            useStore.getState().toast.success(`new contact added`)
            // do not refresh contacts in store
            // the maxcontacts event will notify us when the contact has been fully added
        } else {
            useStore.getState().toast.error(`unknown contact not added`)
        }
    } catch (error) {
        useStore.getState().toast.error(`unknown contact not added`)
    }
}

export const changeProfileName = async (newProfileName: string) => {
    const action = 'setname'
    const name = newProfileName

    try {
        const response = await commands.maxima({ action, name })
        console.log('name change response', response)
        useStore.getState().toast.success(`profile name successfully updated`)

        await useStore.getState().getProfile()
    } catch (error) {
        useStore.getState().toast.error(`could not update profile name`)
    }
}

//////////// localstorage ////////////////////

// update the local data persisted for each contact
// eg nickname and favourite
export const updateLocalData = (contact: MaxContactPlus) => {
    const { favourite, nickname, id } = contact

    // get data from local storage
    const oldData = getLocalData()

    // remove the old data for this contact
    const updated = oldData.filter((contactData) => contactData.id !== id)

    // add the new contact data
    updated.push({ favourite, nickname, id })

    // store them back in local storage
    setLocalData(updated)

    // get all contacts so they can be decorated with the new data, and cause a page refresh
    useStore.getState().getContacts()
}

////////// private localstorage helpers /////////

const LOCALSTORAGE_KEY = 'contactdata'
interface MaxContactPlusData {
    favourite: boolean
    nickname: string
    id: number
}

// get the whole local data store object
const getLocalData: () => MaxContactPlusData[] = () => {
    const localDataString = localStorage.getItem(LOCALSTORAGE_KEY)
    if (localDataString) {
        const dataObj: MaxContactPlusData[] = JSON.parse(localDataString)
        return dataObj
    } else {
        return []
    }
}

// pass the whole datastore object with updated fields
const setLocalData = (newData: MaxContactPlusData[]) => {
    const localDataString = JSON.stringify(newData)
    localStorage.setItem(LOCALSTORAGE_KEY, localDataString)
}

// add the data we store locally to each contact (eg favourites, nickname)
const decorateContacts = (contacts: MaxContactPlus[]) => {
    const updatedContacts = contacts.map((contact) => {
        let favourite = false
        let nickname = ''

        // check if we have local data for this contact
        const localData = getLocalData()
        const foundContact = localData.find((localContactData) => localContactData.id === contact.id)
        if (typeof foundContact !== 'undefined') {
            favourite = foundContact.favourite
            nickname = foundContact.nickname
        }

        return {
            ...contact,
            favourite,
            nickname,
        }
    })

    return updatedContacts
}
