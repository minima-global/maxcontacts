import React, { useContext, useEffect, useRef, useState } from 'react'
import { appContext } from '../../AppContext'
import CloseIcon from '../../components/UI/icons/CloseIcon'
import renderIcon from '../../utilities/renderIcon'

import { compressImage, base64ToBlob } from '../../utilities/compressImage'

function EditDisplayName() {
    const { _maxima, _showChangeDisplayName, dismissChangeDisplay, promptNotification, setDisplayName, setDisplayIcon } = useContext(appContext)
    const [name, setName] = useState('')
    const [step] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [previewIcon, setPreviewIcon] = useState<{file: File, preview: string}|null>(null);
    const [compressedFileSize, setCompressFileSize] = useState<number|null>(null);
    const [clearIcon, setClearIcon] = useState(false);
    const inputRef = useRef<HTMLInputElement | null> (null);

    
    useEffect(() => {
        if (_maxima) {
            setName(_maxima.name)
        }
    }, [_maxima])

    useEffect(() => {
        if (!_showChangeDisplayName) {            
            setPreviewIcon(null);
            setClearIcon(false);
            setIsLoading(false);
        }
    }, [_showChangeDisplayName]);

    const handleDisplayName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value)
    }



    const handleChangeIcon = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {  files } = evt.target;

        if (!files) {
            return setPreviewIcon(null);
        }

        if (files.length===0) {
            return;
        }

        if (files) {     
            const imageSrc = await handleFileToBase64(files[0]);    
            const blob = base64ToBlob(imageSrc as string);
            const compressedFileSize = new File([blob], "test");            
            setCompressFileSize(compressedFileSize.size as number);
            setPreviewIcon({file: files[0], preview: imageSrc as string});
        }
    };

    const handleFileToBase64 = (file: File) => {
        return new Promise((resolve) => {
            const fileRead = new FileReader();
            fileRead.readAsDataURL(file);
            fileRead.onload = async () => {
                const base64 = fileRead.result as string;
                const compressedBase64 = await compressImage(base64);
                resolve(compressedBase64);
            };
            
            fileRead.onerror = () => {                
                resolve("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPGcgY29sb3I9IiMwMDAwMDAiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtZmFtaWx5PSJVYnVudHUiIGxldHRlci1zcGFjaW5nPSIwIiB3b3JkLXNwYWNpbmc9IjAiIHdoaXRlLXNwYWNlPSJub3JtYWwiIGZpbGw9ImdyYXkiPg0KICAgICAgICA8cGF0aCBkPSJNOCAyYTIuODQgMi44NCAwIDAgMC0xLjEyLjIyMWMtLjM0NS4xNDEtLjY1MS4zNDgtLjkwNi42MTV2LjAwM2wtLjAwMS4wMDJjLS4yNDguMjY5LS40NC41OTItLjU3NC45Ni0uMTM3LjM2Ny0uMjAzLjc2OS0uMjAzIDEuMiAwIC40MzUuMDY1Ljg0MS4yMDMgMS4yMDkuMTM1LjM2MS4zMjcuNjguNTc0Ljk1bC4wMDEuMDAyYy4yNTQuMjY3LjU1OC40NzcuOTAxLjYyNHYuMDAzYy4zNDYuMTQxLjcyMy4yMSAxLjEyLjIxLjM5NSAwIC43Ny0uMDY5IDEuMTE3LS4yMXYtLjAwMmMuMzQzLS4xNDcuNjQ0LS4zNTcuODkyLS42MjUuMjU1LS4yNjguNDUtLjU5LjU4Ni0uOTUyLjEzOC0uMzY4LjIwNC0uNzc0LjIwNC0xLjIxaC4wMWMwLS40My0uMDY1LS44MzEtLjIwMy0xLjE5OGEyLjc3MSAyLjc3MSAwIDAgMC0uNTg1LS45NjMgMi41IDIuNSAwIDAgMC0uODk3LS42MThBMi44MzUgMi44MzUgMCAwIDAgNy45OTkgMnpNOC4wMjQgMTAuMDAyYy0yLjMxNyAwLTMuNTYxLjIxMy00LjQ4Ni45MS0uNDYyLjM1LS43NjcuODI1LS45MzkgMS4zNzgtLjE3Mi41NTMtLjIyNi45NzUtLjIyOCAxLjcxTDggMTQuMDAyaDUuNjI5Yy0uMDAxLS43MzYtLjA1Mi0xLjE1OS0uMjI1LTEuNzEyLS4xNzItLjU1My0uNDc3LTEuMDI3LS45NC0xLjM3Ni0uOTIzLS42OTctMi4xMjQtLjkxMi00LjQ0LS45MTJ6IiBzdHlsZT0ibGluZS1oZWlnaHQ6MTI1JTstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidVYnVudHUsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LXBvc2l0aW9uOm5vcm1hbDtmb250LXZhcmlhbnQtY2Fwczpub3JtYWw7Zm9udC12YXJpYW50LW51bWVyaWM6bm9ybWFsO2ZvbnQtdmFyaWFudC1hbHRlcm5hdGVzOm5vcm1hbDtmb250LWZlYXR1cmUtc2V0dGluZ3M6bm9ybWFsO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDt0ZXh0LXRyYW5zZm9ybTpub25lO3RleHQtb3JpZW50YXRpb246bWl4ZWQ7c2hhcGUtcGFkZGluZzowO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiLz4NCiAgICA8L2c+DQo8L3N2Zz4=");
            };            
        });
    }

    

    const handleClear = (evt) => {
        evt.stopPropagation();
        setPreviewIcon(null);
        setCompressFileSize(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };    

    const handleClearDefaultIcon = () => {
        setClearIcon(true);
    }

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault()
        setDisplayName(name);
        if (!clearIcon && previewIcon) {
            setDisplayIcon(previewIcon.preview);
        }
        if (clearIcon) {
            setClearIcon(false);
            setDisplayIcon("0x00");
        }
        setIsLoading(false) 
        dismissChangeDisplay()
        promptNotification('Changes saved')
    }

    if (!_showChangeDisplayName) {
        return <div />
    }

    const fileTooBig = compressedFileSize && compressedFileSize > 55000;

    return (
        <>
            <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center">
                <div className="z-10 relative bg-white w-full max-w-sm mx-auto rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white p-5 rounded-2xl text-center">
                            {step === 1 && (
                                <>
                                    <h5 className="font-bold text-xl mt-3 mb-3">Your profile</h5>

                                    <div className='mb-3 flex items-center justify-center'>
                                        {!previewIcon && !clearIcon && <div className="relative group">{renderIcon(_maxima, handleClearDefaultIcon)}</div>}
                                        {clearIcon && !previewIcon && <div className="avatar">{_maxima.name.charAt(0).toUpperCase()}</div>}
                                        {previewIcon && <div><img className='avatar' src={previewIcon.preview} alt="preview-icon" /></div>}
                                    </div>
                                    
                                    <p className="text-left font-medium mb-3 ml-2">Choose an icon</p>                               
                                    <div className="mb-2">
                                        <div onClick={() => inputRef.current?.click()} className="cursor-pointer text-left p-3 border-2 rounded-lg bg-[#7A17F9] border-[#7A17F9] truncate">
                                            <input onChange={handleChangeIcon} ref={inputRef} type="file" accept=".png,.jpeg,.jpg,.svg" className='hidden' />
                                            <div className='grid grid-cols-[1fr_16px]'>
                                                <div className='truncate'>
                                                    <span className='text-white truncate'>{previewIcon === null && "Select a profile avatar"} {previewIcon !== null && "Selected avatar"}</span>
                                                    {previewIcon && <span className="block truncate break-all text-white text-opacity-80 text-xs">{previewIcon.file.name}</span>}
                                                </div>
                                                {previewIcon !== null &&                                                
                                                    <div onClick={handleClear} className='my-auto text-white'>
                                                        <CloseIcon extraClass="" fill="currentColor" />
                                                    </div>
                                                }
                                            </div>                                            
                                        </div>
                                        {fileTooBig && <div className='my-2 bg-red-100 p-1 text-left rounded px-2'> <span className='text-xs'>File exceeds the maximum allowed amount of 50kb</span></div>}
                                    </div>




                                    <p className="text-left font-medium mb-3 ml-2">Choose a Display Name</p>
                                    <input
                                        value={name}
                                        onChange={handleDisplayName}
                                        className="rounded-lg p-3 text-md text-left"
                                        style={{ border: '2px solid #7A17F9' }}
                                    />
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={fileTooBig || isLoading}
                                            className="text-white w-full text-base font-bold py-3 rounded-xl bg-custom-purple"
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
