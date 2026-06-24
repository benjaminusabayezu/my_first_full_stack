import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {getStudents} from '../../api/studentApi'

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-yellow-500">Students</h1>

          <p className="text-zinc-500 text-sm">Manage enrolled students</p>
        </div>

        <div className="rounded-md overflow-hidden text-zinc-400 border border-zinc-800">
          <table className="w-full">
            <thead className="bg-zinc-950/70 backdrop-blur-md text-zinc-400">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-zinc-800">
                  <td className="p-4">{student.username}</td>

                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.role}</td>

                  <td className="p-4">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentsPage;
