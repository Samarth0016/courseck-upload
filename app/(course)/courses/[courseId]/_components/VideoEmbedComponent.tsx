import React from 'react';

interface VideoEmbedComponentProps {
  title?: string;
  url: string;
  isLocked: boolean;
}

const VideoEmbedComponent: React.FC<VideoEmbedComponentProps> = ({ title, url, isLocked }) => {
  const getYoutubeId = (youtubeUrl: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    
    return match && match[2].length === 11 ? match[2] : null;
  };
  
  const videoId = getYoutubeId(url);
  
  // const containerStyle: React.CSSProperties = {
  //   width: '100%',
  //   maxWidth: '800px',
  //   margin: '0 auto',
  // };
  
  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '10px 0',
  };
  
  const videoContainerStyle: React.CSSProperties = {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
  };
  
  const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  };
  
  return (
    <div className='relative aspect-video'>
      {isLocked && (
        <>
        {videoId ? (
          <div style={videoContainerStyle}>
            <iframe
              style={iframeStyle}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || 'YouTube Video'}
              allowFullScreen
            />
          </div>
        ) : (
          <p>Invalid YouTube URL</p>
        )}
        </>
      )}
      {!isLocked &&(
        <p className='text-sm'>You need to purchase course to access this chapter.</p>
      )}
    </div>
  );
};

export default VideoEmbedComponent;
