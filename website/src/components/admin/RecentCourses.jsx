import {Ban} from 'lucide-react'

const RecentCourses = ({courses = []}) => {
  return (
    <div className="bg-zinc-950/60 shadow-sm mt-8">
      <div className="p-5 border-b border-yellow-500 rounded-lg text-zinc-400">
        <h2 className="font-semibold text-xl text-yellow-500">Recent Courses</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b text-yellow-400 border-zinc-800">
              <th className="p-4">Title</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Views</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-zinc-900 hover:border-yellow-500
              transition-all duration-300 text-sm">
                <td className="p-4">{course.title}</td>
                <td className="p-4">{course.duration}</td>
                <td className="p-4">{course.instructor}</td>
                <td className="p-4">{course.views}</td>
              </tr>
            ))}

            {courses.length ===0 &&(
                <tr>
                    <td colSpan="4" className="p-5 text-center max-auto items-center justify-center text-sm">
                    
                        No courses found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCourses