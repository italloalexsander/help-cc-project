import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        };
        console.log(isSignup)
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdzFNEgz3QNAaSwI4xHALwm-wRL3ktUdU';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdzFNEgz3QNAaSwI4xHALwm-wRL3ktUdU';
        }
        axios.post(url, authData)
        .then(response=>{
            console.log(response);
            dispatch(authSucess(response.data.idToken, response.data.localId));
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
        
    }
}