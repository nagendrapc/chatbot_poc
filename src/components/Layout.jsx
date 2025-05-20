// components/Layout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <h3>Navigation</h3>
                <ul>
                    <li><NavLink to="/accountopeningform" className={({ isActive }) => isActive ? 'active' : ''}>Account Opening Form</NavLink></li>
                    <li><NavLink to="/fundtransferform" className={({ isActive }) => isActive ? 'active' : ''}>Fund Transfer Form</NavLink></li>
                    <li><NavLink to="/loanapplicationform" className={({ isActive }) => isActive ? 'active' : ''}>Loan Application Form</NavLink></li>
                </ul>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
