import { useState } from "react";
import { getYoutubeThumbnail } from "../../utils/youtube";
import {Play} from 'lucide-react'

const convertToEmbed = (url) => {
  if (!url) return "";

  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
};

const VideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) {
    return (
      <div className="aspect-video bg-zinc-900 rounded-md flex items-center justify-center gap-1.5 text-xl font-bold">
        <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin"/>
        Wait...
      </div>
    );
  }

  const thumbnail = getYoutubeThumbnail(video?.video);

  return (
    <div className="bg-zinc-900 rounded-md overflow-hidden">
      <div className="relative aspect-video">
        {!isPlaying ? (
          <div
            className="relative cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 p-5 rounded-full text-2xl">
              <Play className="w-4 h-4 fill-lime-500"/>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={convertToEmbed(video.video)}
            className="w-full h-full"
            allowFullScreen
            title={video.title}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
