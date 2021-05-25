import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, name) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        username: name,
        userId: userId
    };
};

export const logout = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime * 1000);
    };
}



export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auxAuth = (idToken, localId, isSignup, name) => {
    return dispatch =>
    {
        let url = 'https://help-cc-default-rtdb.firebaseio.com/Users/'

        if(isSignup){
            console.log('este é o localid: ' + localId)
            axios.put(url + localId + '.json?auth=' + idToken, {Name: name}).then(response=>{
                console.log(response.data.Name.value)
                dispatch(authSuccess(idToken, localId, response.data.Name.value));
                //dispatch(checkAuthTimeout(response.data.expiresIn))
            }).catch(err =>{
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
        }
        else{
            axios.get(url + localId + '.json').then(response=>{
                console.log(response.data.Name.value)
                dispatch(authSuccess(idToken, localId, response.data.Name.value));
                //dispatch(checkAuthTimeout(response.data.expiresIn))
            }).catch(err =>{
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
        }
    }
}

export const auth = (email, password, isSignup, name) =>{
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
            dispatch(auxAuth(response.data.idToken, response.data.localId, isSignup, name))
            console.log(response);
            
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
        
    }
}