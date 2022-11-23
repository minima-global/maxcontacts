import styles from './SearchItem.module.css'
import search from './../../../assets/Search.svg'

function SearchItem() {
    return (
        <div className={styles.searchItem}>
            <img alt="search" src={search} width={20} />
            <input className={styles.searchInput} placeholder="search contacts"></input>
        </div>
    )
}

export default SearchItem
