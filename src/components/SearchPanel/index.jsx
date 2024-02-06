import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './SearchPanel.module.scss';

const SearchPanel = () => {
	const {searchValue, setSearchValue} = useContext(SearchContext);

	return (
		<div className={styles.panel}>
			<input
				className={styles.input}
				type="text"
				placeholder='Search...'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<button className={styles.button} onClick={() => setSearchValue('')} >Done</button>
		</div>
	);
};

export default SearchPanel;