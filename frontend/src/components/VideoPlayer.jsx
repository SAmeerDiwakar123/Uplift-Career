// components/VideoPlayer.jsx
import React from 'react';
import { X } from 'lucide-react';

const VideoPlayer = ({ videoUrl, title, onClose }) => {
  if (!videoUrl) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No video available</p>
      </div>
    );
  }

  // YouTube URL ko embed URL mein convert karein
  const getEmbedUrl = (url) => {
    // Agar YouTube link hai
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    // Agar Vimeo hai
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('/')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    // Agar already embed link hai
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
        >
          <X size={20} className="text-gray-600" />
        </button>
      )}
      
      {/* Video Player */}
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title || 'Video player'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Video URL not supported</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;