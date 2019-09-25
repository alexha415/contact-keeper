import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../Context/Auth/AuthContext';
import AlertContext from '../../Context/Alert/AlertContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlerts } = alertContext;

  const authContext = useContext(AuthContext);
  const {error, login, clearErrors, isAuthenticated, loadUser } = authContext;

  const [ user, setUser ] = useState({
    email: '',
    password: '',
  });


  useEffect( () => {
    if(isAuthenticated){
      props.history.push('/');
    }
    if(error === 'Invalid Credentials'){
      setAlert(error, 'danger', 3000);
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const {email, password} = user;

  const onChange = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    
    if(email === '' || password === ''){
      setAlert('Please fill in all fields', 'danger');
    }else{
      login({
        email,
        password
      })
    }
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={password} onChange={onChange} required/>
        </div>
        <input type="submit" value='Login' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Login