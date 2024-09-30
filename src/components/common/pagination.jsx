/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize); // số movies / số movies trên 1 trang
  if (pagesCount === 1) return null;
  const pages =_.range(1, pagesCount + 1);

  return (
    <nav
      aria-label="Page navigation example"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={ (page === currentPage) ? "pagination active" : "pagination" }>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
