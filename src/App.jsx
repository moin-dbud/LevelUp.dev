import React from 'react';
import AppRoutes from './routes/AppRoutes';

/**
 * App Component
 * 
 * Root application component that sets up routing.
 * BrowserRouter is configured in main.jsx for proper history management.
 * All route definitions are delegated to AppRoutes for better organization.
 */
const App = () => {
  return <AppRoutes />;
};

export default App;