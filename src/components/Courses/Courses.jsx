import PropTypes from 'prop-types';

export const Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          <p>{course.description}</p>
        </li>
      ))}
    </ul>
  );
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};
