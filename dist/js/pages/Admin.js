import React from "react";
import LoginStore from "../../stores/LoginStore";
import { Link, hashHistory } from "react-router";
import EventComponent from "../components/EventComponent"
import EventsStore from "../../stores/EventsStore"
import * as EventsActions from "../../actions/eventActions"
import AdminEvents from "./AdminEvents"
import AdminRoster from"./AdminRoster"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state={
            component: ""
        }
    }
    
    componentWillMount(){
        if(!LoginStore.getAuthenticated()){
            hashHistory.push('login')
            return;
        }
    }
    editEvents(){
        this.setState({
            component: "events"
        })
    }
    editRoster(){
        this.setState({
            component: "roster"
        })
    }
    render(){
        
        const component = this.state.component === "events" ? <AdminEvents /> : <AdminRoster />;
        
        return (
            <div>
                <button onClick={this.editEvents.bind(this)}>Edit Events</button>
                <button onClick={this.editRoster.bind(this)}>Edit Roster</button>
                {component}
            </div>
        )
    }
}