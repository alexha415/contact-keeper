import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
REGISTER_FAIL,
REGISTER_SUCCESS,
LOGIN_SUCCESS,
LOGIN_FAIL,
USER_lOADED,
AUTH_ERROR,
LOGOUT,
CLEAR_ERRORS
} from '../types';

import React, { useReducer } from 'react';
import uuid from 'uuid';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // ----------------ACTIONS----------------

  // LOAD USER

  // REGISTER USER
  
  //LOGIN USER

  //LOGOUT

  //CLEAR ERRORS
  
  return (
    <AuthContext.Provider value={{
      token: state.token,
      loading: state.loading,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      error: state.error
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default ContactState;