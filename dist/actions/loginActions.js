import dispatcher from "../dispatcher"
import axios from "axios"

export function loginUser(jwt){
    localStorage.setItem('jwt', jwt);
    hashHistory.push('admin');
    dispatcher.dispatch({type: "LOGIN_SUCCESS", payload: jwt})
}

export function initializeLoginStore(){
    if(localStorage.getItem('jwt')){
        dispatcher.dispatch({type: "LOGIN_SUCCESS", payload: localStorage.getItem('jwt')})
    }
}