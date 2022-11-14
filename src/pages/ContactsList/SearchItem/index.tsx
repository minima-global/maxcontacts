import styles from './SearchItem.module.css'

function SearchItem() {
    return (
        <>
            <li>
                <input className={styles.searchInput} placeholder="search contacts"></input>
            </li>
        </>
    )
}

export default SearchItem
