import axios from 'axios';

const HOST = 'https://api.wisey.app/';
const VERSION = 'api/v1/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjcwOTlkYy1kNjE2LTQzNjEtYjNhYy00MzUzMmE2NjQwNTciLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MzYzMTEsImV4cCI6MTY3OTYzNjMxMX0.yLpxbfFvaDoUYrm_iLiaKI0oLFONGtyIR65pWg_kOy4';
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const requestCourses = async () => {
  const { data } = await axios.get(
    `${HOST}${VERSION}core/preview-courses`,
    config
  );

  return data.courses;
};

export const requestCourseDetails = async courseId => {
  const { data } = await axios.get(
    `${HOST}${VERSION}core/preview-courses/${courseId}`,
    config
  );

  return data;
};
