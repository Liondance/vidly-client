import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default function Pagination(props) {
  const { listSize, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(listSize / pageSize);
  if (pageCount <= 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={"page-item " + (page === currentPage ? "active" : "")}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
              // style={{ cursor: "pointer" }}
              // href="#"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  listSize: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
