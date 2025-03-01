import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return JSON.parse(tokenString);
}

const Auth = ({ login=false, view }) => {
  const navigate = useNavigate();
  const [displayView, setDisplayView] = useState(false);

  useEffect(() => {
    (async () => {
      setDisplayView(false);
      try {
        console.log('Sending Token verification');
        const response = await fetch('http://127.0.0.1:8080/verify', {
          method: 'POST',
          body: JSON.stringify({token: getToken()}),
          headers: {'Content-Type': 'application/json'},
        });
        console.log('Token verification response: ', response);
  
        // If Auth is wrapped around the Login component
        if (login) { 
          if (response.status === 200) {
            console.log('responseCode ok from login. redirecting to main page');
            navigate('/', { replace: true });
          } else{
            console.log('responseCode not ok from login. Displaying Login page');
            setDisplayView(true);
          }
        }
  
        // If Auth is wrapped around any of the Main components
        else if (!login) {
          if (response.status !== 200) {
            console.log('responseCode not ok from main page. redirecting to login');
            navigate('/login', { replace: true });
          } else {
            console.log('responseCode ok from main page. Displaying Main page');
            setDisplayView(true);
          }
        }
        
        // If response is not ok throw an error
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
      } catch (error) {
        console.error('We caught an error', error.message);
        // If Auth is NOT wrapped around the Login component
        // and there is an error, go to the login page
        if (!login)
          navigate('/login');
        else 
          setDisplayView(true);
      }
    })();
  }, [login, navigate]);  
     
  return (
    <>
      {displayView && view}
    </>
  );
};

export default Auth;