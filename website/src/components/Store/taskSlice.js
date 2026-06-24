import { createSlice } from "@reduxjs/toolkit";
import { selectIsAddingTask } from "./selectors";

const loadTasks =() =>{
    try{
        const saved = localStorage.getItem("task")
    return saved ? JSON.parse(saved) :  []
}catch{
    return []
} 

}

const saveTasks =(task) =>{
    try{
        localStorage.setItem("task",JSON.stringify(task));
    }catch(error){
        console.error("Failed to save tasks.....",error);
    }
};

const initialState ={
    items: loadTasks(),
    filter:"all",
    isAddingTask: false,

};

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setIsAddingTask:(state,action) =>{
            state.isAddingTask=action.payload
        },
        addTask:(state,action) =>{
           const newTask ={id:crypto.randomUUID(), text:action.payload.trim(),completed:false, 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),};
            state.items.unshift(newTask);
            state.isAddingTask =false;
            saveTasks(state.items)
        },

              //toggle checkbox
        toggleTask: (state,action) =>{
            const task = state.items.find((task)=> task.id === action.payload);
            if(task){
                task.completed =!task.completed;
                task.updatedAt = new Date().toISOString();
                saveTasks(state.items);
            }
        },
        deleteTask:(state,action)=>{
            state.items =state.items.filter((task)=> task.id !== action.payload);
            saveTasks(state.items);
        },
        updateTask:(state,action) =>{
            const {id,updates} =action.payload;
            const task =state.items.find((task)=> task.id===  id);

            if(task){
                Object.assign(task,updates,{ updatedAt: new Date().toISOString()});
            }
            saveTasks(state.items);
        },

        setFilter:(state, action)=>{
           state.filter =action.payload; 
        },

        markAllCompleted: (state) =>{
         const hasIncomplete =state.items.some((task)=> !task.completed);
         state.items.forEach((task)=>{
            task.completed =hasIncomplete;
            task.updatedAt = new Date().toISOString();
        });
        saveTasks(state.items);
        },

        clearCompleted:(state) =>{
            state.items= state.items.filter((task) => !task.completed);
            saveTasks(state.items);

        },
  }
});

export const {setIsAddingTask, addTask,toggleTask,deleteTask,updateTask ,setFilter, markAllCompleted,clearCompleted} = taskSlice.actions;

export default taskSlice.reducer;