import { CheckLine, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, setIsAddingTask } from "../Store/taskSlice";

const TaskForm = ({
  onSubmit,
  onCancel,
  initialValue="",
  placeholder="Add a new Task",
}) =>{
 
  const dispatch=useDispatch();
  const [text,setText] =useState(initialValue);
  const inputRef=useRef(null);

  const handleSubmit =(e)=>{
    e.preventDefault();
    const trimmedText = text.trim();
    if(trimmedText)
      if(onSubmit){
        //for edit
        onSubmit(trimmedText)
      }else{
        dispatch(addTask(trimmedText));
      }
      setText("")
  }
  const handleCancel =() =>{
    if(onCancel){
      onCancel();
    }
    else{
      dispatch(setIsAddingTask(false))
    }
    setText("");
  }

  const handleKeyDown =(e) =>{
   if(e.key === "Escape"){
      handleCancel();
    
   }
  };
  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
        ref={inputRef}
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 border border-zinc-500 rounded-md 
        focus:ring-2 focus:outline-none focus:ring-lime-700
        focus:border-transparent transition-all duration-300 bg-zinc-800/50
        font-mediun font-bold backdrop-blur-md text-lime-700 shadow-lg
        placeholder-zinc-500"
          maxLength={500}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
        type="submit"
          className="flex items-center justify-center w-12 h-12 bg-lime-700 hover:bg-lime-200 
      disabled:bg-zinc-600 disabled:cursor-not-allowed cursor-pointer
      hover:text-lime-700 rounded-md transition-colors duration-300 ease-out"
          title="Save task"
        >
          <CheckLine className="w-4 h-4" />
        </button>
        <button
        type="submit" onClick={handleCancel}
          className="flex items-center justify-center w-12 h-12 hover:bg-pink-300 bg-pink-500 
      disabled:bg-zinc-600 disabled:cursor-not-allowed cursor-pointer
      hover:text-red-600 text-md font-bold rounded-md transition-colors duration-300 ease-out"
          title="Cancel "
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;