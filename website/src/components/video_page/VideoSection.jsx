import VideoPlayer from "./VideoPlayer"
import VideoInfo from "./VideoInfo"
import ChannelInfo from "./ChannelInfo"
import { getCourses } from "../../api/courseApi"
import {ChevronDown, OctagonAlert} from 'lucide-react'
import { useEffect, useState } from "react"

const VideoSection = () => {

  const [videos ,setVideos] =useState([])
  const [activeVideo,setActiveVideo] =useState(null)

useEffect(() => {
  const loadVideos = async () => {
    try {
      const data = await getCourses();

      console.log(data);

      setVideos(data);
      setActiveVideo(data?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

  loadVideos();
}, []);
  return (
    <div className="bg-zinc-950/50 text-zinc-400 p-2 w-[80%] mx-auto">
      <div className="max-w-7xl  mx-auto grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <VideoPlayer  video={activeVideo}/>
          <VideoInfo video={activeVideo} />
        </div>

        <div className="col-span-12 md:col-span-4">
          <ChannelInfo videos={videos}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo} />
          <div className="text-center items-center justify-center flex py-6 gap-2 animate-modal">
            <OctagonAlert  className="w-7 h-7 text-yellow-500"/>
        
            <p>This page is still under development 
                </p>
                <ChevronDown  className="w-5 h-5 animate-bounce"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection