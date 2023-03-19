import PropTypes from 'prop-types';
import {
  CoursesList,
  CoursesListItem,
  CoursesListItemWrapper,
  StyledLink,
} from './Courses.styled';

export const Courses = ({ currentCourses }) => {
  return (
    <CoursesList>
      {currentCourses &&
        currentCourses.map(course => (
          <CoursesListItem key={course.id}>
            <StyledLink to={`courses/${course.id}`}>
              <img
                style={{
                  height: '240px',
                  objectFit: 'cover',
                  width: '100%',
                }}
                src={course.previewImageLink + '/cover.webp'}
                alt=""
              />
              <CoursesListItemWrapper>
                <h3 style={{ minHeight: '72px' }}>{course.title}</h3>
                <h5 style={{ minHeight: '72px' }}>{course.description}</h5>
                <div>
                  {course.lessonsCount && (
                    <h6>Lessons: {course.lessonsCount}</h6>
                  )}

                  {course.rating && <h6>Rating: {course.rating}</h6>}
                  {course.meta.skills && (
                    <ul>
                      <h6>Skills:</h6>
                      {course.meta.skills.map(skill => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CoursesListItemWrapper>
            </StyledLink>
          </CoursesListItem>
        ))}
    </CoursesList>
  );
};

Courses.propTypes = {
  currentCourses: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
