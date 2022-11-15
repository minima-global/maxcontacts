import create from 'zustand'
import { commands, MaxContact, Maxima } from 'npm-upload-9781'

interface StoreState {
    profile: Maxima | null
    getProfile: () => void
    contacts: MaxContact[]
    getContacts: () => void
    getContactById: (id: number) => MaxContact | null
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
        console.log('contacts', response.contacts)
        set((state) => ({ contacts: response.contacts }))
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

        useStore.getState().getProfile()
    } catch (error) {
        useStore.getState().toast.error(`could not update profile name`)
    }
}
