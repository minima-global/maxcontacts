import React, { useContext, useEffect, useState } from 'react'
import { appContext } from '../../AppContext'

function EditDisplayName() {
    const { _maxima, _showChangeDisplayName, dismissChangeDisplay, promptNotification, setDisplayName } = useContext(appContext)
    const [name, setName] = useState('')
    const [step] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (_maxima) {
            setName(_maxima.name)
        }
    }, [_maxima])

    const handleDisplayName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value)
    }

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault()
        setDisplayName(name)
        setIsLoading(false)
        dismissChangeDisplay()
        promptNotification('Changes saved')
    }

    if (!_showChangeDisplayName) {
        return <div />
    }

    const isValid = true

    return (
        <>
            <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
                <div className="absolute z-10 relative bg-white w-full max-w-sm mx-auto rounded rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white p-5 rounded-2xl text-center">
                            {step === 1 && (
                                <>
                                    <h5 className="font-bold text-xl mt-3 mb-10">Your display name</h5>
                                    <p className="text-left font-medium mb-3 ml-2">Choose a Display Name</p>
                                    <input
                                        value={name}
                                        onChange={handleDisplayName}
                                        className="rounded rounded-lg p-3 text-md text-left"
                                        style={{ border: '2px solid #7A17F9' }}
                                    />
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={!isValid || isLoading}
                                            className="text-white w-full text-base font-bold py-3 rounded rounded-xl bg-custom-purple"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    {!isLoading && (
                                        <div className="pt-5 pb-2 text-center">
                                            <div onClick={dismissChangeDisplay} className="cursor-pointer text-custom-grey font-medium link">
                                                Cancel
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </form>
                </div>
                <div className="fixed bg-black h-screen w-screen bg-opacity-80"></div>
            </div>
        </>
    )
}

export default EditDisplayName
