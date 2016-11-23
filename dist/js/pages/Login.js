import React from "react"
import LoginStore from "../../stores/LoginStore"
import Auth from "../AuthService"
import { hashHistory } from "react-router";


export default class Login extends React.Component{
    
    constructor(){
        super()
        this.state = {
            data: {
                username: "",
                hash: ""
            },
            error: ""
        }
    }
    
    componentWillMount(){
        if(LoginStore.getAuthenticated()){
            hashHistory.push('admin');
            return;
        }
    }
    
    usernameChange(e){
        this.state.data.username = e.target.value;
    }
    
    passwordChange(e){
        this.state.data.hash = e.target.value;
    }
    
    onSubmit(){
        Auth.login(this.state.data)
//        .catch(err => {
//            console.log(err);
//        })
    }
    
    render(){
        return(
            <div>
            <h3 class="login_title">Presidential Login</h3>
            <div class="login">
                <div>
                    <input type="text" placeholder="username" onChange={this.usernameChange.bind(this)}/>
                </div>
                <div>
                    <input type="password" placeholder="password" onChange={this.passwordChange.bind(this)}/>
                </div>
                <div>
                    <button type="button" class="SubmitBtn" onClick={this.onSubmit.bind(this)}>Login</button>
                </div>
            </div>
            </div>
        )
    }
}