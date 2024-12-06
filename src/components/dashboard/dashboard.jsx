import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Search from './search/search';
import './dashboard.css';

const Dashboard = () => {
    const [activeSection, setActiveSection] = React.useState('search');
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNavLinkClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="dashboard">
            <div className="top-panel">
                <div className="nav-links">
                    <span 
                        onClick={() => handleNavLinkClick('search')} 
                        className={activeSection === 'search' ? 'active' : ''}
                    >
                        SEARCH
                    </span>
                    <span 
                        onClick={() => handleNavLinkClick('my-movies')} 
                        className={activeSection === 'my-movies' ? 'active' : ''}
                    >
                        ADDED MOVIES
                    </span>
                </div>
                <div className="logout-button-container">
                    <button 
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
            <div className="bottom-panel">
                <div className="content-container">
                    {activeSection === 'search' && <Search />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
