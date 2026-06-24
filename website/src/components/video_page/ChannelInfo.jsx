import { PlayCircle } from "lucide-react";

const ChannelInfo = ({ videos=[], activeVideo, setActiveVideo }) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-yellow-500">Course Playlist</h2>

        <p className="text-sm text-zinc-500 mt-1">{videos.length} lessons</p>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className={`w-full p-4 text-left border-b border-zinc-800 transition
              ${
                activeVideo?.id === video.id
                  ? "bg-yellow-500/10 border-l-4 border-l-yellow-500"
                  : "hover:bg-zinc-800"
              }
            `}
          >
            <div className="flex gap-3 items-start">
              <PlayCircle
                className={`w-5 h-5 mt-1 ${
                  activeVideo?.id === video.id
                    ? "text-yellow-500"
                    : "text-zinc-500"
                }`}
              />

              <div>
                <h3 className="font-medium text-white">
                  {index + 1}. {video.title}
                </h3>

                <p className="text-xs text-zinc-500 mt-1">{video.duration}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelInfo;
