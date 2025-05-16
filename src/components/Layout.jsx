// components/Layout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <div>
                    <h3>Navigation</h3>
                    <ul>
                        <li>
                            <NavLink to="/personal" className={({ isActive }) => isActive ? 'active' : ''}>
                                Personal
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/official" className={({ isActive }) => isActive ? 'active' : ''}>
                                Official
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/social" className={({ isActive }) => isActive ? 'active' : ''}>
                                Social
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <footer>
                    <p>&copy; 2023 Chatbot App</p>
                </footer>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
