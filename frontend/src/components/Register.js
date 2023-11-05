import React, { useState } from 'react';
import "./Register.css" ;

function Register() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); // Default to 'male'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      firstname,
      lastname,
      email,
      gender,
      phone,
      password, 
      confirmpassword ,
    };
    try {
      console.log("OM") ;
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log("OM2") ;

 
     console.log( response ) ;
     console.log( response.status ) ;

      if (response. status ===200  ) {
        alert('Registration successful! Please login again.');
        // Optionally, you can clear the form fields after a successful registration.
        setFirstName('');
        setLastName('');
        setEmail('');
        setGender('male'); // Reset gender to default
        setPhone('');
        setPassword('');
        setConfirmPassword('');

      } 
    else {
        alert('Registration failed. Please try again.');
        const errorData = await response.json();
        // alert('Registration failed: ' + errorData.error);
      }
    } 
    catch (error) {
      console.log("error") ;
      console.error('Error:', error);
    }
  };

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et est sed felis aliquet sollicitudin
          </p>
          <span>
            <p>Login with social media</p>
            <a href="#">
              <i className="fa fa-facebook" aria-hidden="true">Login with Facebook</i>
            </a>
            <a href="#">
              <i className="fa fa-twitter" aria-hidden="true"></i> Login with Twitter
            </a>
          </span>
        </div>
      </div>

      <div className="right">
        <h5>Register</h5>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h7>Choose your Gender :&nbsp;&nbsp;</h7>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input type="submit" value="Register" />
        </form>
        <p>
          Alreday have an account? <a href="/login">Click here</a> 
        </p>

      </div>
    </div>
  );
}

export default Register;

