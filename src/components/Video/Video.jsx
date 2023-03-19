import Hls from 'hls.js';
import { useEffect, useState } from 'react';

export const Video = ({ videoLink, id }) => {
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

    const video = document.getElementById(`video-${id}`);
    video.currentTime = lessonsVideoStartPosition[id] ?? 0;

    if (Hls.isSupported()) {
      // console.log('hello hls.js!');

      const hls = new Hls();

      // hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      //   console.log('video and hls.js are now bound together !');
      // });

      // hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      //   console.log(
      //     'manifest loaded, found ' + data.levels.length + ' quality level'
      //   );
      // });

      hls.loadSource(videoLink);
      hls.attachMedia(video);

      video.ontimeupdate = () => {
        const lessonTimer = {
          [id]: video.currentTime,
        };

        setLessonsVideoStartPosition(prev => ({
          ...prev,
          ...lessonTimer,
        }));
      };
    }
  }, [videoLink, id]);

  return (
    <video
      // title="adasdasdasdafaf"
      style={{ height: '240px' }}
      id={`video-${id}`}
      controls
      //   onClick={this._onTouchInsidePlayer}
      //   ref={player => (this.player = player)}
      // autoPlay={true}

      // muted={true}
    />
  );
};
