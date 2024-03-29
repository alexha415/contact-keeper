import React, { useState, useContext, useEffect }from 'react'
import ContactContext from '../../Context/Contacts/ContactContext';

const ContactForm = () => {

  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext; 

  useEffect( () => {
    if(current !== null){
      setContact(current);
    }
    else{
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [ contact, setContact ]  = useState(
    {
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
    
  const { name, email, phone, type } = contact

  const clearContact = (e) => {
    clearCurrent();
  }
  const onChange = (e) => setContact({...contact, [e.target.name] : e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();
    if(current){
      updateContact(contact);
      clearCurrent();
    }else{
      addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact':'Add Contact' }</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>
      <h5>Contact Type</h5>
      <input type="radio" name="type" value='personal' checked={type === 'personal'}  onChange={onChange}/>
      Personal {' '}
      <input type="radio" name="type" value='professional' checked={type === 'professional'}  onChange={onChange}/>
      Professional {' '}
      <div>
        <input type="submit" className="btn btn-primary btn-block" value={current ?   'Save Changes':'Add Contact'}/>
      </div>
      <div>
        {current && <input type="button" className="btn btn-light btn-block" onClick={clearContact} value='Clear'/>}
      </div>
    </form>
  )
}

export default ContactForm
