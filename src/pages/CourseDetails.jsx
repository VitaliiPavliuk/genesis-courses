import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestCourseDetails } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Video } from 'components/Video/Video';

export const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState(null);
  const [currentVideoPoster, setCurrentVideoPoster] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async courseId => {
      try {
        setIsLoading(true);
        const course = await requestCourseDetails(courseId);
        setCourse(course);
        setCurrentVideoId(course.id);
        setCurrentVideoLink(course.meta.courseVideoPreview.link);
        setCurrentVideoTitle(course.title);
        setCurrentVideoPoster(course.previewImageLink + '/cover.webp');
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
          <h3
            onClick={() => {
              setCurrentVideoId(course.id);
              setCurrentVideoLink(course.meta.courseVideoPreview.link);
              setCurrentVideoTitle(course.title);
              setCurrentVideoPoster(course.previewImageLink + '/cover.webp');
            }}
          >
            Course: {course.title}
          </h3>
          <h4>{currentVideoTitle}</h4>
          <Video
            videoLink={currentVideoLink}
            id={currentVideoId}
            title={currentVideoTitle}
            poster={currentVideoPoster}
          />
          <ul>
            {course.lessons.map(lesson => {
              return (
                <li
                  style={{ cursor: 'pointer', marginBottom: '20px' }}
                  key={lesson.id}
                >
                  {lesson.type !== 'video' ? (
                    <h5>
                      Lesson {lesson.order}. {lesson.title} - {lesson.type}
                    </h5>
                  ) : lesson.status === 'locked' ? (
                    <h5>
                      Lesson {lesson.order}. {lesson.title} - {lesson.type} -
                      LOCKED
                    </h5>
                  ) : (
                    <h5
                      onClick={() => {
                        setCurrentVideoId(lesson.id);
                        setCurrentVideoLink(lesson.link);
                        setCurrentVideoTitle(
                          `Lesson ${lesson.order}. ${lesson.title}`
                        );
                        setCurrentVideoPoster(
                          lesson.previewImageLink +
                            '/lesson-' +
                            lesson.order +
                            '.webp'
                        );
                      }}
                    >
                      Lesson {lesson.order}. {lesson.title} - {lesson.type}
                    </h5>
                  )}

                  {/* <img
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
                  /> */}

                  {/* {currentVideoId === lesson.id &&
                    lesson.status === 'unlocked' &&
                    lesson.type === 'video' && (
                      <Video videoLink={lesson.link} id={lesson.id} />
                    )} */}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
