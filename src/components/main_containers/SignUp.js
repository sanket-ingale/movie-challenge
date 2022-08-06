import './Form.css';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { onLogin } from '../../actions'

export default function SignUp(props) {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        username : '',
        contactNo : '',
        eMail : '',
        password : '',
        confirmPassword : ''
    });
    const [alertMsg, setAlertMsg] = useState('');

    const handleData = event => {
        if(event.target.name === 'firstName' || event.target.name === 'lastName'){
            if(/[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/.test(event.target.value)) {return;}
        }
        if(event.target.name === 'username'){
            if(/[~!@#$%^&*()+\-={}|[\]\\:";'<>?,/]/.test(event.target.value)) {return;}
        }
        if(event.target.name === 'contactNo'){
            if(/[a-zA-Z~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/.test(event.target.value)) {return;}
        }
        setFormData(prevState => {
            return (
                {
                    ...prevState,
                    [event.target.name] : event.target.value
                }
            );
        });
    }

    // console.log(!/[0-9]/.test('7576576'));

    const handleSubmit = event => {
        event.preventDefault();
        
        for (const prop in formData) {
            if(formData[prop] ===''){
                setAlertMsg('Please fill out all the fields');
                return;
            }
        }

        if(formData.password !== formData.confirmPassword) {
            setAlertMsg('Password does not match');
            return;
        } 
        
        if(localStorage.getItem(formData.username) !== null) {
            setAlertMsg('Username is already taken');
            return;
        } 

        setAlertMsg('');
        localStorage.setItem(formData.username, JSON.stringify(formData));
        dispatch(onLogin());
    }

    const clearAll = () => {
        setAlertMsg('');
        setFormData(prevState => {
            return (
                {
                    firstName : '',
                    lastName : '',
                    username : '',
                    contactNo : '',
                    eMail : '',
                    password : '',
                    confirmPassword : ''
                }
            );
        });
    }
    
    // console.log(formData);

    return (
        <div className='background'>
            <form onSubmit={handleSubmit} className="form--details" autoComplete='off'>
                <div className='input--container'>
                    <input 
                        type='text' 
                        value={formData.firstName}
                        name='firstName' 
                        onChange={handleData}  
                        className='in--div' 
                        placeholder='First Name'
                        required={true}
                        minLength={4}
                    />
                    <input 
                        type='text' 
                        value={formData.lastName}
                        name='lastName' 
                        onChange={handleData} 
                        className='in--div' 
                        placeholder='Last Name'
                        required={true}
                        minLength={4}
                    />
                </div>
                <input 
                    type='text' 
                    value={formData.username}
                    name='username' 
                    onChange={handleData} 
                    className='form--input' 
                    placeholder='Username'
                    required={true}
                    minLength={4}
                />
                <input 
                    type='text' 
                    value={formData.contactNo}
                    name='contactNo' 
                    onChange={handleData} 
                    className='form--input' 
                    placeholder='Contact Number'
                    required={true}
                    maxLength={10}
                />
                <input 
                    type='email' 
                    value={formData.eMail}
                    name='eMail' 
                    onChange={handleData} 
                    className='form--input' 
                    placeholder='E-mail'
                    required={true}
                />
                <input 
                    type='password' 
                    value={formData.password}
                    name='password' 
                    onChange={handleData} 
                    className='form--input' 
                    placeholder='Password'
                    required={true}
                    minLength={8}
                />
                <input 
                    type='password' 
                    value={formData.confirmPassword}
                    name='confirmPassword' 
                    onChange={handleData} 
                    className='form--input' 
                    placeholder='Confirm Password'
                    required={true}
                    minLength={8}
                />
                <span className='alert--msg'>{alertMsg}</span>
                <button type='submit' className='form--btn'>Sign up</button>
                <div className='form--link' onClick={clearAll}>Clear all</div>
                <span>Already a user? <span className='form--link' onClick={() => dispatch(onLogin())}>Login</span></span>
            </form>
        </div>
    );
}