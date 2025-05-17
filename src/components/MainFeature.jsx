import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const MainFeature = ({ onAddTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });
  const [errors, setErrors] = useState({});
  
  // Get icons
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const ChevronDownIcon = getIcon('ChevronDown');
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!taskData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (taskData.dueDate && new Date(taskData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newTask = {
        ...taskData,
        id: Date.now().toString(),
        isCompleted: false,
        createdAt: new Date().toISOString()
      };
      
      onAddTask(newTask);
      
      // Reset form
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: ''
      });
      
      setIsFormOpen(false);
    } else {
      toast.error("Please fix the errors in the form");
    }
  };
  
  // Predefined categories
  const categories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'education', label: 'Education' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'finance', label: 'Finance' }
  ];
  
  return (
    <div className="card border-t-4 border-t-primary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {(() => {
            const ListPlusIcon = getIcon('ListPlus');
            return <ListPlusIcon className="w-5 h-5 text-primary" />;
          })()}
          <span>Create New Task</span>
        </h2>
        
        <button
          onClick={() => setIsFormOpen(prev => !prev)}
          className={`btn ${isFormOpen ? 'btn-outline' : 'btn-primary'} flex items-center gap-2`}
          aria-expanded={isFormOpen}
          aria-controls="task-form"
        >
          {isFormOpen ? (
            <>
              <XIcon className="w-4 h-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <PlusIcon className="w-4 h-4" />
              <span>New Task</span>
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            id="task-form"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="What needs to be done?"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  placeholder="Add details about this task..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    className={`input ${errors.dueDate ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      id="priority"
                      name="priority"
                      value={taskData.priority}
                      onChange={handleChange}
                      className="input appearance-none pr-10"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-700 dark:text-surface-300">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Category (Optional)
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={taskData.category}
                      onChange={handleChange}
                      className="input appearance-none pr-10"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-700 dark:text-surface-300">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isFormOpen && (
        <div className="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-4 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Click the "New Task" button to create a task and stay organized.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainFeature;