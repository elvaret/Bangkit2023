
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUserAPI, SigninWithGoogle } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import IconGoogle from './img/google-icon.svg';
import LineOr from './img/or.svg';
import Swal from 'sweetalert2';

function Login(props) {
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await props.loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log('login success');
      setEmail('');
      setPassword('');
      Swal.fire({
        title: 'Login Berhasil',
        text: '',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          navigate('/dashboard', { replace: true });
        }
      });
    } else {
      console.log('login failed');
      Swal.fire({
        title: 'Login Gagal',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          navigate('/login');
        }
      });
    }
  };

  const handleGoogleLogin = async () => {
    const res = await props.signinWithGoogle().catch((err) => err);
    if (res) {
      console.log('login success');
      setEmail('');
      setPassword('');
      Swal.fire({
        title: 'Login Berhasil',
        text: '',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          navigate('/dashboard', { replace: true });
        }
      });
    } else {
      console.log('login failed');
      Swal.fire({
        title: 'Login Gagal',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          navigate('/login');
        }
      });
    }
  };

  return (
    <section id="login" className="login">
      <div className="container">
        <div className="container-login">
          <h1>Log In</h1>
          <p className="p1">Continue with Google or enter your details.</p>
          <button className="b1" onClick={handleGoogleLogin}>
            <img src={IconGoogle} alt="" />
            <div className="tbutton">Log In with Google</div>
          </button>
          <br />
          <img src={LineOr} style={{ width: '400px' }} alt="" />
          <form onSubmit={handleLoginSubmit}>
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
              value={password}
              onChange={handleChangeText}
            />
            <div className="createNow">
              <p>
                You don't have an account?{' '}
                <span>
                  <Link to="/register">Create Now</Link>
                </span>
              </p>
            </div>
            <Button type="submit" title="Log In" loading={props.isLoading} />
          </form>
        </div>
      </div>
    </section>
  );
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
  signinWithGoogle: () => dispatch(SigninWithGoogle()),
});

export default connect(reduxState, reduxDispatch)(Login);