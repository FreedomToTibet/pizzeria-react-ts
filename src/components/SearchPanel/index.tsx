import React, { useContext, useRef, useEffect, useState, FC } from 'react';
import { SearchContext } from '../../pages/AppLayout';

import styles from './SearchPanel.module.scss';

const SearchPanel: FC = () => {
	const context = useContext(SearchContext);
  if (!context) {
    throw new Error('SearchPanel must be used within a SearchContext.Provider');
  }
  const { searchValue, setSearchValue } = context;
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const focusInput = () => {
    setSearchValue('');
		setLocalSearchValue('');
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
