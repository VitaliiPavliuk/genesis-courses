import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestCourseDetails } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Video } from 'components/Video/Video';

export const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
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

  // const handleLessonClick = ({ id }) => {
  //   setCurrentVideoId(true);
  // };

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      {course && (
        <div>
          <h3>Course: {course.title}</h3>
          <Video
            videoLink={course.meta.courseVideoPreview.link}
            id={course.id}
          />
          <ul>
            {course.lessons.map(lesson => {
              return (
                <li
                  key={lesson.id}
                  onClick={() => {
                    setCurrentVideoId(lesson.id);
                  }}
                >
                  <h5>{lesson.title}</h5>
                  <img
                    style={{
                      height: '240px',
                      objectFit: 'cover',
                      // width: 'auto',
                    }}
                    src={
                      lesson.previewImageLink +
                      '/lesson-' +
                      lesson.order +
                      '.webp'
                    }
                    alt=""
                  />

                  {currentVideoId === lesson.id &&
                    lesson.status === 'unlocked' &&
                    lesson.type === 'video' && (
                      <Video videoLink={lesson.link} id={lesson.id} />
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
