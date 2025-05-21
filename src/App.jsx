// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountOpening from './components/AccountOpening';
import FundTransfer from './components/FundTransfer';
import LoanApplication from './components/LoanApplication';
import Layout from './components/Layout';
import './App.css'; // Assuming you have a CSS file for global styles

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <AccountOpening /> },
      { path: 'accountopeningform', element: <AccountOpening /> },
      { path: 'fundtransferform', element: <FundTransfer /> },
      { path: 'loanapplicationform', element: <LoanApplication /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
