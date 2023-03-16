import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CoursesList,
  CoursesListItem,
  CoursesListItemWrapper,
} from './Courses.styled';

export const Courses = ({ currentCourses }) => {
  return (
    <CoursesList>
      {currentCourses &&
        currentCourses.map(course => (
          <CoursesListItem key={course.id}>
            <Link to={`courses/${course.id}`}>
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
                <h3 style={{ minHeight: '72px' }}>{course.title}</h3>
                <h5 style={{ minHeight: '72px' }}>{course.description}</h5>
                <div>
                  {course.lessonsCount && (
                    <span>Lessons: {course.lessonsCount}</span>
                  )}
                  {course.rating && <span>Rating: {course.rating}</span>}
                  {course.meta.skills && (
                    <ul>
                      Skills:
                      {course.meta.skills.map(skill => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CoursesListItemWrapper>
            </Link>
          </CoursesListItem>
        ))}
    </CoursesList>
  );
};

Courses.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
