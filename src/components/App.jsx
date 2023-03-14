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
        setCourses(fetchedCourses);
        console.log(fetchedCourses);
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
    <div
      style={{
        // height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize: 40,
        // color: '#010101',

        width: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      <Courses courses={courses} />
    </div>
  );
};
