import React, { useContext } from 'react';
import './Profile.css';
import { AuthContext } from '../../UserContext/UserContext';
import { useNavigate } from 'react-router';

const Profile = () => {
    const {user, logOutUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOutUser()
        .then(() => {
            navigate('/');
        })
        .catch(error => console.log(error))
    }
    return (
        <div className='text-center mt-10'>
            <p className='font-bold text-xl'>{user?.email}</p>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;