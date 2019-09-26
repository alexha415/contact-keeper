import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
REGISTER_FAIL,
REGISTER_SUCCESS,
LOGIN_SUCCESS,
LOGIN_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGOUT,
CLEAR_ERRORS
} from '../types';

import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // ----------------ACTIONS----------------

  // LOAD USER
  const loadUser = async () => {
    if (localStorage.token){
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }
  // REGISTER USER
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      })
    }
  }
  //LOGIN USER
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      })
    }
  }
  //LOGOUT
  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }
  //CLEAR ERRORS
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  return (
    <AuthContext.Provider value={{
      token: state.token,
      loading: state.loading,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      error: state.error,
      register,
      login,
      loadUser,
      logout,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState