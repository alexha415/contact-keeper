import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ----------------ACTIONS----------------

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }
  const getContacts = async () => {
  //GET CONTACTS

    try {
      const res = await axios.get('/api/contacts/');
      dispatch({ 
        type: GET_CONTACTS, 
        payload: res.data
      })
    } catch (error) {
      dispatch({ 
        type: CONTACT_ERROR, 
        error: error.response.msg
      })
    }
  }
  // ADD CONTACT
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ 
        type: ADD_CONTACT, 
        payload: res.data
      })
    } catch (error) {
      dispatch({ 
        type: CONTACT_ERROR, 
        error: error.response.msg
      })
    }
  }

  //UPDATE CONTACT

  // DELETE CONTACT
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR
      })
      console.log(error.response.msg);
    }
    
  }
  // SET CURRENT CONTACT
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }
  // CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }
  // UPDATE CONTACT
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
      dispatch({ 
        type: UPDATE_CONTACT, 
        payload: res.data
      })
    } catch (error) {
      dispatch({ 
        type: CONTACT_ERROR, 
        error: error.response.msg
      })
    }
  }
  // FILTER CONTACTS
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  }
  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }
  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      getContacts,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      clearContacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;