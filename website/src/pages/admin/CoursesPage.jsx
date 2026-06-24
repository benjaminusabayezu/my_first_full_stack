import { useEffect,useState } from "react"
import AdminLayout from '../../layouts/AdminLayout';
import { getCourses,createCourse,deleteCourse, updateCourse } from "../../api/courseApi";


const CoursesPage = () => {

    const [courses, setCourses] = useState([]);
    const[openModal,setOpenModal] = useState(false)
    const[closeModel, setCloseModel] =useState(false)
    const [loading, setLoading] =useState(false)

    const modelOpen =()=>{
      setOpenModal(true);
      setCloseModel(false)
      
    }
    const modelClose =()=>{
      setCloseModel(true);
      
      setTimeout(() =>{
        setOpenModal(false)
        setCloseModel(false)
      },400);
    };
    
    const[editingCourse, setEditingCourse] =useState(null)
    const [form, setForm] =useState({
        title:"",
        duration:"",
        video:""
    
    });

    useEffect(()=>{
        loadCourses();
    },[]);

    const loadCourses = async ()=>{
        const data= await getCourses();
        setCourses(data);
    };

    const handleChange =(e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();

      try{
        setLoading(true)

        if(editingCourse){
          await updateCourse(
            editingCourse.id, form
          );
        } else{

          await createCourse(form)
        }
        setForm({
          title:"",
          duration:"",
          video:"",
        });
        setEditingCourse(null)
        loadCourses();
        modelClose();

      } catch(error){
        console.log(error);
      }finally{
        setLoading(false)
        
      }
    }

    const removeCourse = async(id) =>{
        await deleteCourse(id);
        loadCourses();
    }

const getYoutubeThumbnail = (url) => {
  try {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    if (!videoId) return null;

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
};

  const handleEdit =(course)=>{
    setEditingCourse(course);

    setForm({
      title: course.title,
      duration:course.duration,
      video:course.video,
    });

    modelOpen();
  }  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-yellow-500">Courses</h1>
            <p className="text-xs text-zinc-300 font-medium">
              Manage Learning Contents
            </p>
          </div>

          <button
            onClick={()=>{
              setEditingCourse(null);
              setForm({
                title:"",
                duration:"",
                video:"",
              });

              modelOpen();
            }}
            className="bg-zinc-900 text-lime-300 px-5 py-2 rounded-lg hover:bg-lime-600
          transition-all duration-300 cursor-pointer hover:text-zinc-400 text-sm font-medium"
          >
            + Add Course
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 animate-card">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-zinc-800 rounded-lg p-5 bg-zinc-950
              shadow-sm shadow-yellow-500/30 hover:shadow-lg hover:shadow-lime-500/30 text-zinc-400"
            >
              <div
                className="w-full h-40 p-2 items-center justify-center flex bg-zinc-900
              shadow-lg shadow-lime-700/30 rounded-lg mb-4"
              >
                {getYoutubeThumbnail(course.video) ? (
                  <img
                    src={getYoutubeThumbnail(course.video)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    No Thumbnail
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <h2 className="font-bold p-2 mb-1 text-yellow-500">
                  {course.title}
                </h2>
                <p className="p-2 text-sm font-semibold text-zinc-500">
                  {course.duration}
                </p>
              </div>
              <div className="items-center flex justify-between text-sm">
                <p className="ml-1">
                  Instructor:
                  {course.instructor_name}
                </p>
                <p className="p-2">
                  Views:
                  {course.views}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                onClick={()=>removeCourse(course.id)}
                  className="mt-4 bg-red-300  text-red-500 px-5 py-2 rounded-lg font-semibold text-sm
                  hover:text-zinc-300 hover:scale-103
              cursor-pointer hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                onClick={() =>handleEdit(course)}
                  className="text-sm mt-4 text-zinc-600 hover:underline py-2 px-4 hover:scale-95 cursor-pointer
                transition-all duration-300"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openModal && (
        <div
          
          className={`fixed inset-0 bg-zinc-950/75 flex items-center justify-center z-50
    ${closeModel ? "animate-modal-close" : "animate-modal"}`}
        >
          <div
            className="flex w-full max-w-2xl bg-zinc-900 rounded-md overflow-hidden shadow-2xl"
          >
            {/* Left panel */}
            <div className="w-48 bg-lime-600 p-6 flex flex-col justify-between">
              <div className="m-10">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-zinc-900 text-lg font-black">+</span>
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 leading-snug mb-2">
                  {editingCourse ? "Update Course "  : "Create New Course"}
                </h2>
                <p className="text-xs text-zinc-900 leading-relaxed">
                  Fill in the details to publish your course for learners.
                </p>
              </div>
              <span className="text-xs text-zinc-600">Step 1 of 1</span>
            </div>

            {/* Right panel — form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black tracking-widest uppercase text-yellow-500">
                  {editingCourse ? "New Changes to Course" : "Course Details"}
                </span>

              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medim tracking-wider text-zinc-500">
                  Course title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Web Development"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-md px-4 py-2.5 text-sm
            text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500
            focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                />
              </div>

              {/* Duration + Level row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium tracking-wider text-zinc-500">
                    Duration
                  </label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 10 hours"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-md px-4 py-2.5 text-sm
              text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500
              focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium tracking-wider text-zinc-500">
                    Level
                  </label>
                  <input
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    placeholder="e.g. Beginner"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-md px-4 py-2.5 text-sm
              text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500
              focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Video URL */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Video URL
                </label>
                <input
                  name="video"
                  value={form.video}
                  onChange={handleChange}
                  placeholder="https://url..../..."
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-md px-4 py-2.5 text-sm
            text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500
            focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                />
                {getYoutubeThumbnail(form.video) &&(
                  <img
                  src={getYoutubeThumbnail(form.video)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md border
                  border-zinc-800 mt-2"
                  />
                )}
              </div>

              {/* Divider + Footer */}
              <div className="border-t border-lime-800 pt-4 flex items-center justify-between mt-auto">
                <span className="text-xs text-red-600 animate-pulse">
                 Note: Check Data correctly.
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={modelClose}
                    className="px-4 py-2 font-medium text-zinc-400 border border-zinc-700
              rounded-md hover:bg-zinc-800 hover:text-zinc-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-medium bg-yellow-500 text-zinc-900 rounded-md
              hover:bg-yellow-400 active:scale-95 transition-all duration-200"
                  >
                    {loading ? "Saving..." : editingCourse ? "Apply Changes" :" Save Course"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default CoursesPage