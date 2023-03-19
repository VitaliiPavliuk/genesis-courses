import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

export const Video = ({ videoLink, id, title, poster }) => {
  const [lessonsVideoStartPosition, setLessonsVideoStartPosition] = useState(
    JSON.parse(localStorage.getItem('lessonsVideoStartPosition')) ?? {}
  );

  useEffect(() => {
    localStorage.setItem(
      'lessonsVideoStartPosition',
      JSON.stringify(lessonsVideoStartPosition)
    );
  }, [lessonsVideoStartPosition]);

  useEffect(() => {
    const video = document.getElementById(`video`);

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(videoLink);
      hls.attachMedia(video);
    }

    video.currentTime = lessonsVideoStartPosition[id] ?? 0;

    video.ontimeupdate = () => {
      const lessonTimer = {
        [id]: video.currentTime,
      };

      setLessonsVideoStartPosition(prev => ({
        ...prev,
        ...lessonTimer,
      }));
    };
    // eslint-disable-next-line
  }, [videoLink, id]);

  return (
    <video
      title={title}
      style={{ width: '100%', marginBottom: '50px' }}
      id={`video`}
      controls
      poster={poster}
      preload="false"

      // muted={true}
    />
  );
};

Video.propTypes = {
  videoLink: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
