import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertReducer from './AlertReducer';
import AlertContext from './AlertContext';
import {
SET_ALERT,
REMOVE_ALERT,
CLEAR_ALERTS
} from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // ----------------ACTIONS----------------

  // SET ALERT
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {msg, type, id}
    })

    setTimeout( () => {
      dispatch ({
        type: REMOVE_ALERT,
        payload: id
      })
    }, timeout)
  }

  //CLEAR ALL ALERTS
  const clearAlerts = () => {
    dispatch({
      type: CLEAR_ALERTS
    })
  }
  return (
    <AlertContext.Provider value={{
      alerts: state,
      setAlert,
      clearAlerts
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState