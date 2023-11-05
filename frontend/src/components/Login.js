import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from "react-router-dom";

import "./Login.css" ;
import "./Register" ;

// import "./Home" ;
import Home from './Home';
// import Header from './Header'; 

function Login() {
  const history = useHistory() ;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticatedData, setAuthenticatedData] = useState(null);
  const [clicked,setClicked] =useState(0) ;
  const [got,setGot] =useState(false) ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked( clicked+1 ) ;

    // Replace with the actual API endpoint of your server
    const apiUrl = 'http://localhost:5000/login';

    // Create a data object to send to the server
    const data = {
      email,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Successfully sent data to the server
        const data = await response.json();
        setAuthenticatedData(data);
        // history.push("../components/Home.js") ;
        setGot(true) ;

        console.log('Data sent successfully.');
      } else {
        // Handle server errors
        console.error('Server error:', response.statusText);
        // history.push("/Home") ;
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <>
    { got==false ?  
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et est sed felis aliquet sollicitudin
          </p>
          <span>
            <p>Login with social media</p>
            <a href="#">
              <i className="fa fa-facebook" aria-hidden="true">Login with Facebook</i>
            </a>
            <a href="#">
              <i className="fa fa-twitter" aria-hidden="true"></i> Login with
              Twitter
            </a>
          </span>
        </div>
      </div>

      <div className="right">
      <br/>
      <br/>
        <h5>Login</h5>
        <br/>
        <br/>
        <br/>

        <p>
          Don't have an account? <a href="/register">Create Your Account</a> it takes
          less than a minute
        </p>
        <div className="inputs">
         
        <form  onSubmit={handleSubmit} >

          <input type="email" value={email} placeholder="E-mail"  required  onChange={ (e)=>{setEmail( e.target.value ) } }/>
 
          <br />
          <input type="password" value={password}  placeholder="Password"  required onChange={ (e)=>{setPassword( e.target.value ) } }/>
          <input type="submit" />
          </form>
        </div>

        <br />
        <br />

        { clicked!==0 && got===false && 
    <div> 
    <h7  text>Incorrect Login details...</h7>
    </div>}

        <div className="remember-me--forget-password">
   
          <label>
            <input type="checkbox" name="item" checked />
            <span className="text-checkbox">Remember me</span>
          </label>
          <a href ="">Forgot password?</a>
          
        </div>
        <br />
      </div>
    </div>

    : <div> </div> }
     {/* {authenticatedData && (
       <div>
        <h3>Welcome, {authenticatedData.firstname} {authenticatedData.lastname}!</h3>
      </div> 

     
    )}  */}
    {/* <Header>
        
    </Header> */}

    </>
  );
}
export default Login;
