import styles from './SearchItem.module.css'

function SearchItem() {
    return (
        <>
            <input className={styles.searchInput} placeholder="search contacts"></input>
        </>
    )
}

export default SearchItem
