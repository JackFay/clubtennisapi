import axios from "axios"
import * as LoginActions from "../actions/loginActions"
import { hashHistory } from "react-router";

class AuthService{
    login(user){
        axios.post('http://localhost:5000/api/login', user)
        .then(response => {
            console.log(response);
            if(response.data === "incorrect username or password"){
                return;
            }
            //get JWT back from server
            let jwt = response.data.token;
            
            //trigger login action with jwt
            LoginActions.loginUser(jwt)
        })
    }
}

export default new AuthService()