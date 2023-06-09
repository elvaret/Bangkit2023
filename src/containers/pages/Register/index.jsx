import React, { useState } from 'react';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import './register.css';
import { useNavigate } from 'react-router-dom';
import IconGoogle from './img/google-icon.svg';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleChangeText = (e) => {
      if (e.target.id === 'email') {
        setEmail(e.target.value);
      } else if (e.target.id === 'password') {
        setPassword(e.target.value);
      }
    };
  
    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      const res = await props.registerAPI({ email, password }).catch((err) => err);
      if (res) {
        setEmail('');
        setPassword('');
        navigate('/login', { replace: true });
      }
    };
  
    return (
      <section id="register" className="register">
        <div className="container">
          <div className="container-register">
            <h1>Sign Up</h1>
            <p className="p1">Create Your Own Account.</p>
            <form className='form' onSubmit={handleRegisterSubmit}>
              <label htmlFor="fname">Full Name</label>
              <br />
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter Your Email"
                required=""
              />
              <br />
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your Password"
                required=""
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleChangeText}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={handleChangeText}
              />
              <Button type="submit" title="Sign Up" Loading={props.isLoading} />
            </form>
            <img src="src/img/or.svg" style={{ width: 200 }} alt="" /> <br />
            <button className="b1">
              <img src={IconGoogle} alt="Icon Google" />
              <p className="tbutton">Sign Up with Google</p>
            </button>
          </div>
        </div>
      </section>
    );
}


  
  const reduxState = (state) => ({
    isLoading: state.isLoading
  });
  
  const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
  });
  
  export default connect(reduxState, reduxDispatch)(Register);