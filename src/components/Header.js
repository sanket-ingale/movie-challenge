import './HeaderFooter.css';
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserProfile from './sub_containers/UserProfile';
import { loggedOut, onLogin, onSignUp } from '../actions'

export default function Header(props) {

    const userActions = useSelector(state => state);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnClick = () => userActions.isLoggedIn ? handleClose() : dispatch(loggedOut());

    return (
        <div className="header">
            <ul className='nav--bar--item' onClick={handleOnClick}>
                <img className="logo--img" src={require("../icons/camera.png")} alt="movie-logo"/>
                <li className='logo--text'>WatchMovie</li>
            </ul>
            { !userActions.isLoggedIn ? 
                <ul className='nav--bar--item'>
                    <li className='no--style' onClick={() => dispatch(onLogin())}>LOGIN</li>         
                    <li className='no--style' onClick={() => dispatch(onSignUp())}>SIGN UP</li>     
                </ul>:
                <ul className='nav--bar--item'>
                    <li className='user'>Hello, {userActions.username}</li>
                    <img className="user--img" onClick={handleShow} src={require("../icons/user.png")} alt="user-logo"/>
                </ul>
            }
            <Offcanvas 
                className="off-canvas" 
                show={show} 
                onHide={handleClose} 
                placement="end"
                scroll={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='cart--title'>User Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='off-canvas--body'>
                    <UserProfile logout={handleClose}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
