import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
import './Login.css';

const Login = () => {
    const [error, setError] = useState('');
    const {signInUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (event) => {
        event.preventDefault();
        const form  = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from, {replace: true})
        })
        .catch((error) => {
            console.error(error);
            setError(error.message);
        })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-detail'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' placeholder='enter email' required/>
                </div>
                <div className='form-detail'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='enter password' required/>
                </div>
                <p style={{color: 'red'}}>{error}</p>
                <button className='btn-submit' type='submit'>Submit</button>
            </form>
            <p className='form-another'>New to Ema-john? <Link to='/signup'>Create an account</Link></p>
            <p className='or-section'>------------------ or --------------------</p>
            <button className='google-btn'>Continue to Google</button>
        </div>
    );
};

export default Login;