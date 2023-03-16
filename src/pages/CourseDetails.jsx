import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestCourseDetails } from 'services/api';
import { Loader } from 'components/Loader/Loader';

export const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async courseId => {
      try {
        setIsLoading(true);
        const fetchedCourseDetails = await requestCourseDetails(courseId);
        setCourse(fetchedCourseDetails);

        console.log(fetchedCourseDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails(courseId);
  }, [courseId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      {course && (
        <div>
          <p>Course: {course.title}</p>
          <img
            style={{
              height: '240px',
              objectFit: 'cover',
              // width: 'auto',
            }}
            src={course.lessons[0].previewImageLink + '/1.webp'}
            alt=""
          />
          <video src={course.meta.courseVideoPreview.link}></video>
        </div>
      )}
    </div>
  );
};

// https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/cover.webp
// https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview/cover.webp
