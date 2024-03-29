import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../Context/Auth/AuthContext';

const Home = () => {

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect( () => {
    authContext.loadUser();
    console.log('test');
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter/>
        <Contacts/>
      </div>
    </div>
  )
}

export default Home
