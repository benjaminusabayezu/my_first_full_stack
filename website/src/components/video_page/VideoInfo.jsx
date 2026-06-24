import { ThumbsUp,ThumbsDown,Share2,Bookmark,MoreHorizontal } from "lucide-react";
const VideoInfo = ({ video }) => {
  if (!video) {
    return <div className="mt-4 p-2 text-zinc-500">Loading video info...</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between p-2">
        <div className="text-xl font-bold">{video.title}</div>
        <p className="text-sm text-zinc-600 mt-1 font-semibold">
          {Number(video.views).toLocaleString()} · {video.date}
        </p>
      </div>

      <div className="flex flex-wrap gap-6 border-b border-zinc-900 pb-4 mt-2 p-2">
        <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500">
          <ThumbsUp className="w-4 h-4" />
          {video.likes}
        </button>

        <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500">
          <ThumbsDown className="w-4 h-4" />
          {video.dislikes}
        </button>

        <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500">
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500">
          <Bookmark className="w-4 h-4" />
          Save
        </button>

        <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;