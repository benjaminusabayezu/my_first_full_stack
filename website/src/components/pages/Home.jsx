import React from "react";
import { motion } from "framer-motion";
import {
  ShieldPlus,
  Trash2,
  PackageCheck,
  CircleAlert,
  Sparkles,
  CheckCircle2,
  ListTodo,
} from "lucide-react";

import TaskPage from "./TaskPage";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectFilteredTasks,
  selectTasks,
  selectTasksStats,
  selectIsAddingTask,
} from "../Store/selectors";

import {
  clearCompleted,
  markAllCompleted,
  setFilter,
  setIsAddingTask,
} from "../Store/taskSlice";

const Home = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const filteredTasks = useSelector(selectFilteredTasks);
  const stats = useSelector(selectTasksStats);
  const filter = useSelector(selectFilter);
  const isAddingTask = useSelector(selectIsAddingTask);

  return (
    <div className="min-h-screen flex justify-center px-4 py-10">
      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="p-6 text-center border-b border-zinc-800">
          <h1 className="text-4xl font-bold text-lime-400 tracking-tight">
            Task Control Center
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Engineering your internship progress with precision
          </p>
        </div>

        {/* STATS */}
        {stats.total > 0 && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-zinc-300 flex items-center gap-2">
                <ListTodo className="w-4 h-4" />
                Progress Overview
              </h2>
              <span className="text-lime-400 font-bold text-xl">
                {stats.completePercentage}%
              </span>
            </div>

            {/* progress bar */}
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.completePercentage}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-400"
              />
            </div>

            {/* stats grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Total", value: stats.total },
                { label: "Active", value: stats.active },
                { label: "Completed", value: stats.completed },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-3"
                >
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION BAR */}
        <div className="p-5 border-t border-zinc-800 flex flex-wrap gap-3 justify-between items-center">
          <button
            onClick={() => dispatch(setIsAddingTask(true))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lime-500 text-black font-semibold hover:bg-lime-400 transition"
          >
            <ShieldPlus className="w-4 h-4" />
            New Task
          </button>

          <div className="flex gap-2">
            {stats.completed > 0 && (
              <button
                onClick={() => dispatch(clearCompleted())}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-pink-500 text-pink-400 hover:bg-pink-500/10"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}

            {stats.active > 0 && (
              <button
                onClick={() => dispatch(markAllCompleted())}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-lime-500 text-lime-400 hover:bg-lime-500/10"
              >
                <PackageCheck className="w-4 h-4" />
                Complete All
              </button>
            )}
          </div>
        </div>

        {/* FILTERS */}
        <div className="px-5 pb-4">
          <TaskPage
            currentFilter={filter}
            stats={stats}
            onFilterChange={(f) => dispatch(setFilter(f))}
          />
        </div>

        {/* FORM */}
        {isAddingTask && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950/60">
            <TaskForm placeholder="Write your next mission..." />
          </div>
        )}

        {/* TASK LIST */}
        <div className="max-h-[420px] overflow-y-auto border-t border-zinc-800">
          {filteredTasks.length === 0 ? (
            <div className="p-10 text-center text-zinc-500">
              {tasks.length === 0 ? (
                <>
                  <CircleAlert className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p>No tasks yet</p>
                  <p className="text-xs text-zinc-600">
                    Create your first task to begin
                  </p>
                </>
              ) : (
                <>
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p>No tasks in this filter</p>
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {filteredTasks.map((task, i) => (
                <TaskItem key={task.id} task={task} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 text-center text-xs text-zinc-600 border-t border-zinc-800">
         Welcome
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
