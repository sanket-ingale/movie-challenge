import './UserProfile.css';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../../actions'

export default function UserProfile(props) {
    const dispatch = useDispatch();
    const userActions = useSelector(state => state);

    const user = JSON.parse(localStorage.getItem(userActions.username));

    const onClickHandler = () => {
        props.logout();
        dispatch(loggedOut());
    }

    return (
        <div className="user--profile">
            <img className="user--profile--img" src={require("../../icons/user.png")} alt="user-logo"/>
            <div className='user--profile--item'>
                <span>Name</span> {user?.firstName} {' '} {user?.lastName}
            </div>
            <div className='user--profile--item'>
                <span>Contact</span> {user?.contactNo}
            </div>
            <div className='user--profile--item'>
                <span>e-Mail ID</span> {user?.eMail}
            </div>
            <button className='logout--btn' onClick={onClickHandler}>Log out</button>
        </div>
    );
}