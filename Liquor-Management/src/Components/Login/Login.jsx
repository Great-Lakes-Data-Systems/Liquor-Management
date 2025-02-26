import MainHeader from '../App/Layout/Header/MainHeader';
import btybglds from '../../assets/images/btybglds.png';
import styles from './login.module.css';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // Declare the state of the input fields in the form as controlled components
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [rememberMeValue, setRememberMeValue] = useState(false);
  // An error message to display to user if something goes wrong
  const [errorMessage, setErrorMessage] = useState('');

  // Setting the values of the form to the user's remembered credentials
  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'checked'){
      setUsernameValue(localStorage.getItem('username'));
      setPasswordValue(localStorage.getItem('password'));
      setRememberMeValue(true);
    }
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    // Setting the values to local storage if user checked Remember me
    if (rememberMeValue) {
      localStorage.setItem('rememberMe', 'checked');
      localStorage.setItem('username', usernameValue);
      localStorage.setItem('password', passwordValue);
    } else {
      localStorage.setItem('rememberMe', 'unchecked');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    // FAKE API CALL
    if (usernameValue === 'avi' && passwordValue === '1234')
      navigate('/');
    else setErrorMessage('The username or password are incorrect');

    // let responseStatusCode = undefined;
    // try {
    //   const response = await fetch('http://127.0.0.1:8080/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ 
    //       username: usernameValue,
    //       password: passwordValue 
    //     }),
    //     headers: {'Content-Type': 'application/json'},
    //   });

    //   responseStatusCode = response.status;
    //   const json = await response.json();
      
    //   // If response from server is ok and we got a token, 
    //   // store the token in session storage and go to the home page
    //   if (responseStatusCode === 200 && json.token) {
    //     sessionStorage.setItem('token', JSON.stringify(json.token));
    //     navigate('/');
    //   }

    //   if (!response.ok) {
    //     throw new Error(`Response status: ${response.status}`);
    //   }
    // } catch (error) {
    //   setErrorMessage(error.message);  // Use this message for devlopment
    //   // setErrorMessage('Something went wrong');  // TODO: Use this message for production
    //   // If the server sent an unauthorized code, display the following message to user
    //   if(responseStatusCode === 401)
    //     setErrorMessage('The username or password are incorrect');
    // }
  }, [navigate, rememberMeValue, usernameValue, passwordValue]);

  // Submit the form when enter key is pressed
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') 
        handleSubmit(e);
    };
    document.addEventListener('keydown', listener);
    return () =>  document.removeEventListener('keydown', listener);
  }, [handleSubmit]);

  return (
    <div className={styles.app}>
      <MainHeader showLogout={false}/>
      <div className={styles.body}>
        <div className={styles.bgd_gradient}></div>
        <div className={styles.loginBox}>
          <h3 className={styles.loginHeader}>Login</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type='text' 
              name='username' 
              placeholder='Username' 
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)}
              className={`${styles.loginInput} ${styles.loginTextInput}`} />
            <input 
              type='password' 
              name='password' 
              placeholder='Password' 
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              className={`${styles.loginInput} ${styles.loginTextInput}`} />
            <input 
              type='checkbox' 
              name='rememberMe' 
              id='rememberMe' 
              checked={rememberMeValue}
              onChange={() => setRememberMeValue(!rememberMeValue)}
              className={styles.loginCheckbox}/>
            <label htmlFor='rememberMe'>Remember Me</label>
            <button type='submit' className={`${styles.loginInput} ${styles.signInButton}`}>Sign in</button>
          </form>
          <p className={styles.signInError}>{errorMessage}</p>
        </div>
      </div>
      <img src={btybglds} alt="Brought to you by GLDS" className={styles.btybglds_img}/>
    </div>
  );
};

export default Login;