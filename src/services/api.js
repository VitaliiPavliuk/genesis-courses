import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjcwOTlkYy1kNjE2LTQzNjEtYjNhYy00MzUzMmE2NjQwNTciLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MzYzMTEsImV4cCI6MTY3OTYzNjMxMX0.yLpxbfFvaDoUYrm_iLiaKI0oLFONGtyIR65pWg_kOy4';

// const BASE_URL = 'http://api.wisey.app/api/v1/core/preview-courses';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '33371810-0a52094386dea8583f801697d';
// export const PER_PAGE = 12;

export const requestCourses = async () => {
  // const searchParams = {
  //   params: {
  //     key: API_KEY,
  //     q: query,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     page: page,
  //     per_page: PER_PAGE,
  //   },
  // };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data } = await axios.get(
    'https://api.wisey.app/api/v1/core/preview-courses',
    config
  );

  return data;
};
