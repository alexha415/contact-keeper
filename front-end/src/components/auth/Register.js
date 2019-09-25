import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';
import AuthContext from '../../Context/Auth/AuthContext';

const Register = props => {

  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlerts } = alertContext;

  const authContext = useContext(AuthContext);
  const { error, register, clearErrors, isAuthenticated } = authContext;

  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect( () => {
    if(isAuthenticated){
      props.history.push('/');
    }
    if(error === 'User already exists'){
      setAlert(error, 'danger', 3000);
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const {name, email, password, password2} = user;



  const onChange = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    clearAlerts();
    if(name === '' || email === '' || password === ''){
      setAlert('please enter all fields', 'danger', 3000)
    }else if(password !== password2){
      setAlert('passwords do not match', 'danger', 3000);
    }else{
      register({
        name,
        email,
        password
      });
    }
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={name} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={password} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name='password2' value={password2} onChange={onChange} required/>
        </div>
        <input type="submit" value='Register' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Register
