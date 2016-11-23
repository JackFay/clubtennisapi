import React from "react";
import LoginStore from "../../stores/LoginStore";
import { hashHistory } from "react-router";
import EventComponent from "../components/EventComponent"
import EventsStore from "../../stores/EventsStore"
import * as EventsActions from "../../actions/eventActions"

export default class AdminEvents extends React.Component{
    constructor(){
        super()
        this.state = {
            events: EventsStore.getAllEvents(),
            data: {
                title: "",
                desc: "",
                date: "",
                time: ""
            }
        }
    }
    
    componentWillMount(){
        if(!LoginStore.getAuthenticated()){
            hashHistory.push('login')
            return;
        }
        EventsStore.on("events store changed", () => {
            this.setState({
                events: EventsStore.getAllEvents(),
                data: {
                    title: this.state.data.title,
                    desc: this.state.data.desc,
                    date: this.state.data.date,
                    time: this.state.data.time
                }
            })
        })
        EventsStore.on("event added", () => {
            this.setState({
                events: EventsStore.getAllEvents(),
                data: {
                    title: this.state.data.title,
                    desc: this.state.data.desc,
                    date: this.state.data.date,
                    time: this.state.data.time
                }
            })
        })
    }
    titleChange(e){
        this.state.data.title = e.target.value;
    }
    
    descChange(e){
        this.state.data.desc = e.target.value;
    }
    
    dateChange(e){
        this.state.data.date = e.target.value;
    }
    
    timeChange(e){
        this.state.data.time = e.target.value;
    }
    
    createEvent(){
        const event = {
            title: this.state.data.title,
            desc: this.state.data.desc,
            date: this.state.data.date + " " + this.state.data.time,
        }
        console.log(event);
        EventsActions.createEvent(event);
    }
    render(){
        const events = this.state.events
        const eventComponents = events.map((event, index) => {
            var date = new Date(event.date)
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const info = {
                time: date.getHours() + ":" + date.getMinutes(),
                day: event.new ? date.getDate() : date.getDate() + 1,
                year: date.getFullYear,
                monthName: months[date.getMonth()],
                title: event.title,
                desc: event.desc,
                month: date.getMonth(),
                deleteable: true,
                id: event.id
            }
            return <EventComponent key={index}{...event} info={info}/>
        });
        return (
            <div>
                <ul class="event-list">
                    {eventComponents}
                </ul>
                <div class="create_event">
                    <div>
                        <div>
                            <label for="title">Title: </label>
                        </div>
                        <input type="text" name="title" onChange={this.titleChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="desc">Description: </label>
                        </div>
                        <textarea rows="4" cols="50" name="desc" onChange={this.descChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="date">Date: </label>
                        </div>
                        <input type="text" name="date" placeholder="YYYY-MM-DD" onChange={this.dateChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="time">Time: </label>
                        </div>
                        <input type="time" name="time" placeholder="HH:MM AM" onChange={this.timeChange.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={this.createEvent.bind(this)}>Create Event</button>
                    </div>
                </div>
            </div>
        )
    }
}