import {useState, useEffect} from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import {BrowserRouter} from 'react-router-dom';
import {decodeToken} from 'react-jwt';
import ProvisionsReduxApi from './api/provisions-redux-api';
import NavBar from './components/NavBar/NavBar'
import AppRouting from './components/Routing/AppRouting';
import CircularProgress from '@mui/material/CircularProgress';
import CartModel from './models/CartModel';
import './App.css'

export const TOKEN_STORAGE = 'token';

function App() {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const cart = CartModel();


  // USER METHODS

   /**
   * Effect to get current user.
   * 
   * If there is a token present in local storage,
   * get username from token,
   * use Provisions-Redux-API to talk to backend
   * retrieve user obj:
   * 
   * {username, }
   * 
   */

   useEffect(() => {
    const getCurrUser = async () => {
      if (token){
        try{
          let {username} = decodeToken(token);
          let currUser = await ProvisionsReduxApi.getCurrUser(username);
          setCurrentUser(currUser);
        }catch(err){
          console.error("App getUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrUser()
  }, [token]);


  /** Handles site-wide logout  */

   const logout = () => {
    setCurrentUser(null);
    setToken(null);
   }

  /** Handle site-wide login */

  const login = async (username, password) => {
    try{
      let res = await ProvisionsReduxApi.userLogin(username, password);
      setToken(res);
      return {success: true};
    }catch(err){
      console.error('Login Failed', err);
      return {success: false, err}
    }
  }

  /** Handle site-wide sign up 
   * Sets Token upon sign up
  */

  const signup = async (username, email, password, first_name, last_name, city, state) => {
    try{
      let res = await ProvisionsReduxApi.userSignup(username, email, password, first_name, last_name, city, state)
      setToken(res);
      return {success: true};
    }catch(err){
      console.error('Signup Failed', err);
      return {success: false, err};
    }
  }


  if(!infoLoaded){
    return (<CircularProgress />)
}

  return (
    <>
      <BrowserRouter>
        <NavBar currentUser={currentUser} logout={logout} cart={cart}/>
        <AppRouting login={login} signup={signup} currentUser={currentUser} cart={cart}/>
      </BrowserRouter>
      
    </>
  )
}

export default App
