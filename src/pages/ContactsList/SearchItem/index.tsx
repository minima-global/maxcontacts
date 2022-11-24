import styles from './SearchItem.module.css'
import search from './../../../assets/Search.svg'
import { useState, ChangeEvent } from 'react'

interface IProps {
    searchQuery: string
    onSearchQueryChange: (q: string) => void
}
function SearchItem({ searchQuery, onSearchQueryChange }: IProps) {
    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value
        // notify parent
        onSearchQueryChange(newVal)
    }

    return (
        <div className={styles.searchItem}>
            <img alt="search" src={search} width={20} />
            <input value={searchQuery} onChange={onSearchChange} className={styles.searchInput} placeholder="search contacts"></input>
        </div>
    )
}

export default SearchItem
