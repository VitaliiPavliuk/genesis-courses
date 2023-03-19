import { Courses } from 'components/Courses/Courses';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

export const AllCourses = ({ courses, coursesPerPage }) => {
  const [currentCourses, setCurrentCourses] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (courses.length === 0) return;

    const endOffset = itemOffset + coursesPerPage;
    setCurrentCourses(courses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(courses.length / coursesPerPage));
  }, [itemOffset, coursesPerPage, courses]);

  const handlePageClick = event => {
    const newOffset = (event.selected * coursesPerPage) % courses.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Courses currentCourses={currentCourses} />
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

AllCourses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  coursesPerPage: PropTypes.number.isRequired,
};
