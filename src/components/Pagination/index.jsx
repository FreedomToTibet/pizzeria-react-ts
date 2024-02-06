import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
			className={styles.root}
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={3}
      marginPagesDisplayed={2}
      pageRangeDisplayed={6}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
			onPageChange={({selected}) => onChangePage(selected + 1)}
    />
  );
};
