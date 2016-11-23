import React from "react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import EventComponent from "../components/EventComponent"
import EventsStore from "../../stores/EventsStore"
import * as EventsActions from "../../actions/eventActions"


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            events: EventsStore.getAllEvents()
        }
    }
    
    componentWillMount(){
        EventsStore.on("events store changed", () => {
            this.setState({
                events: EventsStore.getAllEvents()
            })
        })
    }
    
    render(){
        
        const eventComponents = this.state.events.map(event => {
            var date = new Date(event.date)
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
            const info = {
                time: date.getHours() + ":" + date.getMinutes(),
                day: date.getDate(),
                year: date.getFullYear,
                monthName: months[date.getMonth()-1],
                title: event.title,
                desc: event.desc,
                month: date.getMonth(),
                id: event.id
            }
            return <EventComponent key={event.id} info={info} />
        });
        return(
            <div>
                    <h1 class="home_title">MIZZOU CLUB TENNIS</h1>
                    <div class="home_image">
                        <img src="../../images/club_tennis.jpg"/>
                    </div>
                    <div class="upcoming_events">
                        <h3 class="upcoming_events">Upcoming Events</h3>
                    </div>
                    <ul class="event-list">
                        {eventComponents}
                    </ul>
            </div>
        );
    }
}