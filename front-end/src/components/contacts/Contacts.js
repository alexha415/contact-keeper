import React, { useContext, Fragment } from 'react'
import ContactItem from './ContactItem';
import ContactContext from '../../Context/Contacts/ContactContext';
const Contacts = () => {

  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map((contact) => 
        { return <ContactItem key={contact.id} contact={contact}/> }
      )}
    </Fragment>
  )
}

export default Contacts
