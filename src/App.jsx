import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded text-white">
              {(() => {
                const CheckSquareIcon = getIcon('CheckSquare');
                return <CheckSquareIcon className="w-6 h-6" />;
              })()}
            </div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">TaskFlow</h1>
          </div>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-surface-700" />}
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;