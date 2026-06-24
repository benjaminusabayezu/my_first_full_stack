import React from "react";
import { ListCheck, Watch, CircleCheck } from "lucide-react";




const TaskPage = ({ currentFilter, stats, onFilterChange }) => {
  const filter = [
    { key: "all", label: "All", icon: ListCheck, count: stats.total },
    { key: "active", label: "Active", icon: Watch, count: stats.active },
    {
      key: "completed",
      label: "Completed",
      icon: CircleCheck,
      count: stats.completed,
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-zinc-500 rounded-lg p-1">
        {filter.map(({ key, label, icon, count }) => {
          const Icon = icon;
          return (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm mr-1
            font-medium transition-all duration-300  ${currentFilter === key ? "bg-zinc-400 text-slate-900 shadow-md" : "text-zinc-800 hover:text-slate-900 hover:bg-zinc-800"}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
              <span>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPage;