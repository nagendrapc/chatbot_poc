// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Personal from './components/Personal';
import Official from './components/Official';
import Social from './components/Social';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Personal /> },
      { path: 'personal', element: <Personal /> },
      { path: 'official', element: <Official /> },
      { path: 'social', element: <Social /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
