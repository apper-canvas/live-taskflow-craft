import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <AlertTriangleIcon className="w-16 h-16 text-yellow-500 dark:text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-white">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="inline-flex items-center gap-2 btn-primary px-6 py-3 text-lg">
          <HomeIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;