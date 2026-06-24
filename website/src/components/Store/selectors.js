export const selectTasks = (state) => state.tasks.items;
export const selectFilter =(state) =>state.tasks.filter;
export const selectIsAddingTask  =(state) =>state.tasks.isAddingTask;


export const selectFilteredTasks =(state)=>{
    const tasks =state.tasks.items;
    const filter =state.tasks.filter;

    switch(filter){
        case "active":
            return tasks.filter((task) => !task.completed);
            case "completed":
                return tasks.filter((task)=> task.completed);

                default:
                    return tasks;
    }

};

export const selectTasksStats = (state) =>{
    const tasks =state.tasks.items;
    const total =tasks.length;
    const completed = tasks.filter((task)=> task.completed).length;
    const active = total - completed;
    const completePercentage = total > 0 ? Math.round((completed/total)*100): 0;

    return {
        tasks,total,completed,active,completePercentage
    };
};