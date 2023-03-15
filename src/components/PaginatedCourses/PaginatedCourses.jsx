import { Courses } from 'components/Courses/Courses';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export const PaginatedCourses = ({ courses, coursesPerPage }) => {
  // We start with an empty list of items.
  const [currentCourses, setCurrentCourses] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (courses.length === 0) return;

    // Fetch items from another resources.
    const endOffset = itemOffset + coursesPerPage;
    console.log(`Loading courses from ${itemOffset} to ${endOffset}`);
    setCurrentCourses(courses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(courses.length / coursesPerPage));
  }, [itemOffset, coursesPerPage, courses]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * coursesPerPage) % courses.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
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
