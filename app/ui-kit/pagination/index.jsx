import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import style from './style.m.scss';

class Pagination extends PureComponent {
  render() {
    return (
      <ReactPaginate
        containerClassName={style.root}
        pageClassName={style.page}
        breakClassName={style.break}
        activeClassName={style.active_page}
        activeLinkClassName={style.active_page_link}
        previousClassName={style.previous_page}
        nextClassName={style.next_page}
        {...this.props}
      />
    );
  }
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
