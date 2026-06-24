
import { Check, CalendarCheck, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, updateTask } from "../Store/taskSlice";
import TaskForm from "./TaskForm";
const TaskItem = ({task, index}) => {
  
const dispatch =useDispatch();
  const [isEditing,setIsEditing] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false);

  const handleToggle =()=>{
    dispatch(toggleTask(task.id));
  };

  const handleDelete =() =>{
    setIsDeleting(true);
    setTimeout(()=>{
      dispatch(deleteTask(task.id));
    },2000)
  }

  const handleUpdate =(text)=>{
    dispatch(updateTask({id: task.id, updates:{text:text.trim()}}));
    setIsEditing(false);

  }

  const formatDate =(dateString) =>{
    const date =new Date(dateString);
    return new Intl.DateTimeFormat("en-us",{
      month: "short",day:"numeric",hour:"2-digit",minute:"2-digit",
    }).format(date);
  }
  if(isEditing){
    return <div className="p-4 bg-zinc-500">
      <TaskForm initialValue={task.text} onSubmit={handleUpdate} onCancel={()=>
        setIsDeleting(false)} placeholder="Update you task"/>

    </div>
  }

  return (
    <div className={`group p-5 hover:bg-zinc-700 transition-all duration-300
    ${isDeleting ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"}
    ${task.completed ? "opacity-75" : ""}
    `} style={{animationDelay:`${index * 50}ms`,animation:"slideInUp 0.5 ease-out forwards",}}>
      {/* toggle bitton*/}
      <div className="flex items-center gap-3">
        <button
        onClick={handleToggle}
          className={`
          flex-shrink-0 w-7 h-7 rounded-full border-2 items-center 
    justify-center transition-all duration-200  ${task.completed ? "bg-gradient-to-r from-lime-700 to-blue-600 text-zinc-300 font-bold text-md border border-lime-700 hover:bg-slate-900"
      :"border border-zinc-400 hover:bg-slate-800"
    } `}
        >
          {task.completed  && (<Check className="w-4 h-4 mx-auto" />)}
        </button>
        {/* content*/}
        <div className="flex-1 min-w-0">
          <div className={`text-zinc-200 leading-relaxed`}>{task.text}</div>

          <div className="flex items-center gap-4 mt-3 text-xs text-zinc-300">
            <div className="flex items-center gap-1">
              <CalendarCheck className="w-5 h-5" />
              <span>Created {formatDate(task.createdAt)}</span>
            </div>
            <span>Update {formatDate(task.updatedAt)}</span>
          </div>
        </div>
        {/*end of content*/}
        {/*Action buttons */}
        <div
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100
     transition-all duration-200"
        >
          <button
          onClick={()=>setIsEditing(true)}
            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200
        rounded-md transition-all duration-300 cursor-pointer"
          title="Edit">
            <SquarePen className="w-5 h-5" />
          </button>
          <button

          onClick={handleDelete}
            className="p-2 text-zinc-600 hover:text-red-500 hover:bg-zinc-200
        rounded-md transition-all duration-300 cursor-pointer"
          title="Delete">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;