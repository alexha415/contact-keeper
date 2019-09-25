import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';
import ContactContext from '../../Context/Contacts/ContactContext';
const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const contactContext = useContext(ContactContext);

  const { clearContacts } = contactContext;
  const onLogout = () => {
    logout();
    clearContacts();
  }
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fa fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
      <li>
          <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}/> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fa fa-id-card'
}
export default Navbar
