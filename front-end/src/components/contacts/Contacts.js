import React, { useEffect, useContext, Fragment } from 'react'
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../Context/Contacts/ContactContext';
import Spinner from '../layout/Spinner';
const Contacts = () => {

  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading} = contactContext;

  useEffect( () => {
    getContacts();
    // es-lint-disable-next-line
  },[]);

  if(contacts.length === 0){
    return <h4>Please a contact</h4>
  }

  let contactList;

  filtered ? contactList = filtered : contactList = contacts; 

  return (
      <Fragment>
        {contacts && !loading ? (
        <TransitionGroup>
        {contactList.map((contact) => (
            <CSSTransition key={contact._id} timeout={1000} classNames='item'>
              <ContactItem contact={contact}/>
             </CSSTransition>
        ))}
        </TransitionGroup>) : <Spinner/>
      }
        
      </Fragment>
  )
}

export default Contacts
