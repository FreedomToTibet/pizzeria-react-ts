import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({ pageCount, onChangePage, currentPage }) => {
	
  return (
    <ReactPaginate
			className={styles.root}
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={null}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
			onPageChange={({selected}) => onChangePage(selected + 1)}
			forcePage={currentPage - 1}
    />
  );
};
