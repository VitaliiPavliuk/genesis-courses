import Hls from 'hls.js';
import { useEffect, useState } from 'react';

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
    // if (!videoLink) return;

    const video = document.getElementById(`video`);
    // video.currentTime = lessonsVideoStartPosition[id] ?? 0;

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
      style={{ width: '100%', marginBottom: '100px' }}
      id={`video`}
      controls
      poster={poster}
      preload="false"

      // autoPlay={true}

      // muted={true}
    />
  );
};
