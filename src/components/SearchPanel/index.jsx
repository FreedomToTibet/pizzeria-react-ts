import React, { useContext, useRef, useEffect, useState } from 'react';
import { SearchContext } from '../../App';

import styles from './SearchPanel.module.scss';

const SearchPanel = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const timeoutRef = useRef();
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const focusInput = () => {
    setSearchValue('');
		setLocalSearchValue('');
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearchValue(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.panel}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={localSearchValue}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={focusInput}>
        Done
      </button>
    </div>
  );
};

export default SearchPanel;
