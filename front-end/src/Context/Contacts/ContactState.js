import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Alex',
        email: 'alex@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Arnold',
        email: 'arnold@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Amy',
        email: 'amy@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      },
      {
        id: 4,
        name: 'Annie',
        email: 'annie@gmail.com',
        phone: '444-444-4444',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ----------------ACTIONS----------------

  // ADD CONTACT
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ 
      type: ADD_CONTACT, 
      payload: contact
    })
  }
  // DELETE CONTACT
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
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
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
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
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter
    }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;