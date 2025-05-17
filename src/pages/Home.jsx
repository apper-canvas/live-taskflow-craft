import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
    toast.success('Task added successfully!');
  };
  
  const toggleTaskStatus = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    
    const taskStatus = tasks.find(task => task.id === id)?.isCompleted ? 'reopened' : 'completed';
    toast.info(`Task ${taskStatus}!`);
  };
  
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };
  
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !task.isCompleted;
    if (activeFilter === 'completed') return task.isCompleted;
    return true;
  });
  
  // Get icons
  const ClipboardListIcon = getIcon('ClipboardList');
  const CheckCircleIcon = getIcon('CheckCircle');
  const FilterIcon = getIcon('Filter');
  const TrashIcon = getIcon('Trash');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Manage Your Tasks Efficiently
          </h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-2xl mx-auto">
            Create, organize, and track all your tasks in one place with TaskFlow's intuitive interface.
          </p>
        </div>
        
        <MainFeature onAddTask={addTask} />
        
        <div className="my-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ClipboardListIcon className="w-5 h-5 text-primary" />
              <span>Your Tasks</span>
              <span className="ml-2 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-sm px-2 py-0.5 rounded-full">
                {filteredTasks.length}
              </span>
            </h2>
            
            <div className="flex items-center gap-2 p-1 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <FilterIcon className="w-4 h-4 text-surface-500 ml-2" />
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('active')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === 'active' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveFilter('completed')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === 'completed' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="neu-card flex items-start gap-3"
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                      task.isCompleted 
                        ? 'bg-primary border-primary' 
                        : 'border-surface-300 dark:border-surface-600'
                    } flex items-center justify-center`}
                    aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.isCompleted && <CheckCircleIcon className="w-5 h-5 text-white" />}
                  </button>
                  
                  <div className="flex-grow">
                    <h3 className={`font-medium text-lg ${
                      task.isCompleted ? 'line-through text-surface-400 dark:text-surface-500' : ''
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`mt-1 text-surface-600 dark:text-surface-400 ${
                        task.isCompleted ? 'line-through text-surface-400 dark:text-surface-600' : ''
                      }`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {task.priority && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                            : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                      )}
                      
                      {task.dueDate && (
                        <span className="text-xs px-2 py-1 rounded-full bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      
                      {task.category && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-surface-400 hover:text-red-500 dark:text-surface-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    aria-label="Delete task"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 neu-card">
              <div className="flex justify-center mb-4">
                {(() => {
                  const ClipboardIcon = getIcon('Clipboard');
                  return <ClipboardIcon className="w-12 h-12 text-surface-300 dark:text-surface-600" />;
                })()}
              </div>
              <h3 className="text-xl font-medium text-surface-600 dark:text-surface-400 mb-2">
                No tasks found
              </h3>
              <p className="text-surface-500 dark:text-surface-500">
                {activeFilter === 'all' 
                  ? "You haven't created any tasks yet. Add one above!" 
                  : activeFilter === 'active'
                    ? "You don't have any active tasks. Great job!" 
                    : "You don't have any completed tasks yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;