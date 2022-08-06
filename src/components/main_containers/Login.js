import './Form.css';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loggedIn, onSignUp } from '../../actions'

export default function Login() {

    const dispatch = useDispatch();  
    const [loginData, setLoginData] = useState({
        username : '',
        password : ''
    });
    const [alertMsg, setAlertMsg] = useState('');

    const handleData = event => {
        setLoginData(prevState => {
            return (
                {
                    ...prevState,
                    [event.target.name] : event.target.value
                }
            );
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        
        if(loginData.username === '') {
            // alert('Please fill out all the fields');
            setAlertMsg('Please fill out all the fields');
            return;
        }
        if(loginData.password === '') {
            setAlertMsg('Please fill out all the fields');
            return;
        }

        const user = JSON.parse(localStorage.getItem(loginData.username));

        if(user === null) {
            // alert('User does not exists, please sign up');
            setAlertMsg('User does not exists, please sign up');
            return;
        }

        if(loginData.password !== user.password) {
            // alert('Incorrect password');
            setAlertMsg('Incorrect password');
            return;
        }
        setAlertMsg('');
        dispatch(loggedIn(loginData.username));
    }

    return (
        <div className='background'>
            <form onSubmit={handleSubmit} className="form--details" autoComplete='off'>
                <input 
                    type='text' 
                    value={loginData.username} 
                    onChange={handleData} 
                    name='username'
                    className='form--input' 
                    placeholder='Username'
                    required={true}
                    minLength={5}
                />
                <input 
                    type='password' 
                    value={loginData.password} 
                    onChange={handleData} 
                    name='password'
                    className='form--input' 
                    placeholder='Password'
                    required={true}
                    minLength={8}
                />
                <span className='alert--msg'>{alertMsg}</span>
                <button type='submit' className='form--btn'>Login</button>
                <span>New to WatchMovie?</span>
                <span className='form--link' onClick={() => dispatch(onSignUp())}>Sign up</span>
            </form>
        </div>
    );
}