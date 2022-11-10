import { useState, useEffect, ChangeEvent } from 'react'
import { commands, MaxContact } from 'npm-upload-9781'

interface IProps {
    refresh: () => void
}
function Profile() {
    const [myName, setMyName] = useState('')
    const [myContact, setMyContact] = useState('')
    const [newName, setNewName] = useState('')

    useEffect(() => {
        commands.maxima().then((myMaxima) => {
            console.log('myMaxima', myMaxima)
            setMyName(myMaxima.name)
            setMyContact(myMaxima.contact)
        })
    }, [])

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value
        // console.log('event new val', newVal)
        setNewName(newVal)
    }

    const onUpdateNameClicked = async () => {
        const action = 'setname'
        const name = newName
        commands.maxima({ action, name }).then((response) => {
            console.log('set name response', response)
            setNewName('')
            commands.maxima().then((myMaxima) => {
                console.log('myMaxima', myMaxima)
                setMyName(myMaxima.name)
                setMyContact(myMaxima.contact)
            })
        })
    }

    return (
        <>
            <section>
                <h3>My Profile</h3>
                <h4>{myName}</h4>
                <input value={newName} onChange={onNameChange}></input>
                <button onClick={onUpdateNameClicked}>update name</button>

                <div style={{ paddingTop: '20px' }}>{myContact}</div>
            </section>
        </>
    )
}

export default Profile
