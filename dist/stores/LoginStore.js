import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import jwt_decode from "jwt-decode"
import { hashHistory } from "react-router";


class LoginStore extends EventEmitter{
    constructor(){
        super()
        this._user = null;
        this._jwt = null;
        this.authenticated = false;
    }
    
    getUser(){
        return this._user
    }
    
    getJwt(){
        return this._jwt
    }
    
    getAuthenticated(){
        return this.authenticated;
    }
    
    handleActions(action){
        switch(action.type){
            case "LOGIN_SUCCESS":{
                this._jwt = action.payload;
                this._user = jwt_decode(this._jwt);
                this.authenticated = true;
                this.emit("user logged in");
            }
                
        }
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore))
export default loginStore