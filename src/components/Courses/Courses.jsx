import PropTypes from 'prop-types';
import {
  CoursesList,
  CoursesListItem,
  CoursesListItemWrapper,
} from './Courses.styled';

export const Courses = ({ courses }) => {
  return (
    <CoursesList>
      {courses.map(course => (
        <CoursesListItem key={course.id}>
          <img
            style={{
              height: '240px',
              objectFit: 'cover',
              // width: 'auto',
            }}
            src={course.previewImageLink + '/cover.webp'}
            alt=""
          />
          <CoursesListItemWrapper>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </CoursesListItemWrapper>
        </CoursesListItem>
      ))}
    </CoursesList>
  );
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};
