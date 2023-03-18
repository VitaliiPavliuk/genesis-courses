import Hls from 'hls.js';
import { useEffect } from 'react';

export const Video = ({ videoLink }) => {
  const video = document.getElementById('video');

  useEffect(() => {
    if (!videoLink) return;
    console.log(videoLink);
    const hls = new Hls();

    console.log(video);
    if (Hls.isSupported()) {
      console.log('hello hls.js!');
      hls.loadSource(videoLink);
      hls.attachMedia(video);
      //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //     video.play();
      //   });
    }
  });

  return (
    <video
      style={{ height: '240px' }}
      id="video"
      controls
      //   onClick={this._onTouchInsidePlayer}
      //   ref={player => (this.player = player)}
      autoPlay={true}
    />
  );
};
