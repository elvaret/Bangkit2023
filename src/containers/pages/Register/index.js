// import React, { useState } from 'react';
// import Button from '../../../components/atoms/Button';
// import { connect } from 'react-redux';
// import { registerUserAPI } from '../../../config/redux/action';
// import { useNavigate } from 'react-router-dom';
// import './register.css';

// function Register(props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const handleChangeText = (e) => {
//     // console.log(e.target.id)
//     if (e.target.id === 'email') {
//       setEmail(e.target.value);
//     } else if (e.target.id === 'password') {
//       setPassword(e.target.value);
//     }
//   };

//   const handleRegisterSubmit = async () => {
//     try {
//       const { email, password } = { email, password };
//       const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
//       if (response) {
//         setEmail('');
//         setPassword('');
//         navigate('/login', { replace: true });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <section id="register" className="register">
//       <div className="container">
//         <div className="container-register">
//           <h1>Sign Up</h1>
//           <p className="p1">Create Your Own Account.</p>
//           <form>
//             <label htmlFor="fname">Full Name</label><br />
//             <input type="text" id="fname" name="fname" placeholder="Enter Your Email" required /><br />
//             <label htmlFor="username">Username</label><br />
//             <input type="text" id="username" name="username" placeholder="Enter Your Password" required /><br />
//             <label htmlFor="email">Email</label><br />
//             <input type="text" id="email" name="email" placeholder="Enter Your Email" onChange={handleChangeText} required /><br />
//             <label htmlFor="password">Password</label><br />
//             <input type="password" id="password" name="password" placeholder="Enter Your Password" onChange={handleChangeText} required />
//           </form>
//           <Button onClick={handleRegisterSubmit} title="Sign Up" loading={props.isLoading} />
//           <br />
//           <img src="src/img/or.svg" style={{ width: '200px' }} alt="" />
//           <br />
//           <button className="b1">Sign Up with Google</button>
//         </div>
//       </div>
//     </section>
//   );
// }

// const reduxState = (state) => ({
//   isLoading: state.isLoading,
// });

// const reduxDispatch = (dispatch) => ({
//   registerAPI: (data) => dispatch(registerUserAPI(data)),
// });

// export default connect(reduxState, reduxDispatch)(Register);