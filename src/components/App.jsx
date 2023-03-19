import { AllCourses } from 'pages/AllCourses';
import { CourseDetails } from 'pages/CourseDetails';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { requestCourses } from 'services/api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const fetchedCourses = await requestCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div
      style={{
        width: '1140px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}

      <Routes>
        <Route
          path="/genesis-courses"
          element={<AllCourses courses={courses} coursesPerPage={10} />}
        ></Route>
        <Route
          path="/genesis-courses/courses/:courseId"
          element={<CourseDetails />}
        ></Route>
      </Routes>
    </div>
  );
};
