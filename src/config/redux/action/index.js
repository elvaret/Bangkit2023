import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from '../../firebase';
import {signInWithEmailAndPassword } from '../../firebase';

export const actionUserName=()=>(dispatch)=>{
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Noem'})
    }, 2000)
}
export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        dispatch({type:'CHANGE_LOADING', value: true})
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('sucess: ', user)
                dispatch({type:'CHANGE_LOADING', value: false})
                resolve(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({type:'CHANGE_LOADING', value: false})
                reject(false)
            })
    })

}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject)=>{
        const auth = getAuth();
        dispatch({type:'CHANGE_LOADING', value: true})
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                console.log('sucess: ', userCredential)
                const dataUser = {
                    email: userCredential.user.email,
                    uid:userCredential.user.uid,
                    emailVerified: userCredential.user.emailVerified
                }
                dispatch({type:'CHANGE_LOADING', value: false})
                dispatch({type:'CHANGE_ISLOGIN', value: true})
                dispatch({type:'CHANGE_USER', value: dataUser})
                resolve(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({type:'CHANGE_LOADING', value: false})
                dispatch({type:'CHANGE_ISLOGIN', value: false})
                reject(false)
            })
    })

}

export const SigninWithGoogle = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
  
      dispatch({ type: 'CHANGE_LOADING', value: true });
  
      signInWithPopup(auth, provider)
        .then((result) => {
          // Berhasil masuk dengan akun Google
          const user = result.user;
          const dataUser = {
            email: user.email,
            uid: user.uid,
            emailVerified: user.emailVerified,
          };
          console.log('success: ', dataUser);
  
          dispatch({ type: 'CHANGE_LOADING', value: false });
          dispatch({ type: 'CHANGE_ISLOGIN', value: true });
          dispatch({ type: 'CHANGE_USER', value: dataUser });
  
          resolve(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
  
          dispatch({ type: 'CHANGE_LOADING', value: false });
          dispatch({ type: 'CHANGE_ISLOGIN', value: false });
  
          reject(false);
        });
    });
  };

