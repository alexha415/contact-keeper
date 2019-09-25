import React, { useContext, Fragment } from 'react'
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../Context/Contacts/ContactContext';
const Contacts = () => {

  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;
  if(contacts.length === 0){
    return <h4>Please a contact</h4>
  }

  let contactList;

  filtered ? contactList = filtered : contactList = contacts; 

  return (
      <Fragment>
        <TransitionGroup>
        {contactList.map((contact) => (
            <CSSTransition key={contact.id} timeout={1000} classNames='item'>
              <ContactItem contact={contact}/>
             </CSSTransition>
        ))}
        </TransitionGroup>
      </Fragment>
  )
}

export default Contacts
