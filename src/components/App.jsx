import { useEffect, useState } from 'react';
import { requestCourses } from 'services/api';
import { Courses } from './Courses/Courses';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (courses === []) {
    //   return;
    // }

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const fetchedCourses = await requestCourses();
        setCourses(fetchedCourses.courses);
        console.log(fetchedCourses.courses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      <Courses courses={courses} />
    </div>
  );
};
