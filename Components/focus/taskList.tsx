import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  focusMode: boolean;
}

export default function TaskList({ tasks, setTasks, focusMode }: TaskListProps) {
  const [newTask, setNewTask] = useState('');
  
  const addTask = () => {
    if (newTask.trim() && tasks.length < 5) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const currentTask = tasks.find(t => !t.completed);
  
  if (focusMode) {
    return currentTask ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
          Current Focus
        </p>
        <p className="text-xl font-medium text-slate-700 dark:text-slate-200">
          {currentTask.text}
        </p>
      </motion.div>
    ) : null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <h3 className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 text-center">
        Today's Focus
      </h3>
      
      {/* Task input */}
      {tasks.length < 5 && (
        <div className="flex gap-2 mb-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            className="flex-1 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button
            onClick={addTask}
            size="icon"
            className="bg-indigo-500 hover:bg-indigo-600 text-white shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {/* Task list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group flex items-center gap-3 p-3 rounded-xl transition-all ${
                task.completed 
                  ? 'bg-slate-100/50 dark:bg-slate-800/30' 
                  : 'bg-white/70 dark:bg-slate-800/70 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
                }`}
              >
                {task.completed ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3 text-transparent" />
                )}
              </button>
              
              <span className={`flex-1 transition-all ${
                task.completed 
                  ? 'text-slate-400 dark:text-slate-500 line-through' 
                  : 'text-slate-700 dark:text-slate-200'
              }`}>
                {task.text}
              </span>
              
              <button
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 py-8">
            Add up to 5 tasks to focus on
          </p>
        )}
      </div>
    </motion.div>
  );
}