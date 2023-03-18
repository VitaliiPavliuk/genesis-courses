import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestCourseDetails } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Video } from 'components/Video/Video';

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
          <h3>Course: {course.title}</h3>
          <Video videoLink={course.meta.courseVideoPreview.link}></Video>
          {/* <video
            controls
            autoPlay={true}
            src={course.meta.courseVideoPreview.link}
          ></video> */}
          <ul>
            {course.lessons.map((lesson, i) => {
              return (
                <li key={lesson.id}>
                  <h5>{lesson.title}</h5>
                  <img
                    style={{
                      height: '240px',
                      objectFit: 'cover',
                      // width: 'auto',
                    }}
                    src={
                      course.lessons[i].previewImageLink +
                      '/lesson-' +
                      lesson.order +
                      '.webp'
                    }
                    alt=""
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/cover.webp
// https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview/cover.webp
