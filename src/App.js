import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Login from './components/main_containers/Login';
import SignUp from './components/main_containers/SignUp';
import HomeScreen from './components/main_containers/HomeScreen';
import Footer from './components/Footer';
import ToTop from './components/buttons/ToTop';

function App() {

  const userActions = useSelector(state => state);
  
  useEffect(() => {
    setTimeout(()=>{
      document.getElementById('preloader').style.display = 'none';
    }, 1500);
  },[]);

  return (
    <div className="App">
      <div id='preloader'>
        <img className="preloader--img" src={require("./icons/camera.png")} alt="graffitee-logo"/>
        <div className='preloader--text'>WatchMovie</div>
      </div>
      <Header />
      <div className='main--container'>
        {userActions.onHomePage && <HomeScreen />}
        {userActions.onLoginPage && <Login />}
        {userActions.onSignUpPage && <SignUp />}
      </div>
      <ToTop/>
      <Footer/>
    </div>
  );
}

export default App;
