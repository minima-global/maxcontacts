import * as React from 'react'
import search from '../../assets/Search.svg'

interface SearchBarProps {
    searchQuery: string
    onSearchQueryChange: React.Dispatch<React.SetStateAction<string>>
}

const SearchItem: React.FC<SearchBarProps> = ({ searchQuery, onSearchQueryChange }) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchQueryChange(event.target.value)
    }

    return (
        <label className="block pt-4 px-4 lg:px-0 pb-2">
            <div className="flex bg-white  rounded-xl py-4 px-4">
                <img alt="search" src={search} width={20} height={20} className="mr-4" />
                <input value={searchQuery} onChange={handleOnChange} className="text-sm focus:outline-none" placeholder="Search by name"></input>
            </div>
        </label>
    )
}

export default SearchItem
