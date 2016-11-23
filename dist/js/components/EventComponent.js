import React from "react"
import * as EventsActions from "../../actions/eventActions"

export default class EventComponent extends React.Component{
    constructor(){
        super()
    }
    deleteEvent(){
        console.log("deleting event with id: " + this.props.info.id)
        EventsActions.deleteEvent(this.props.info.id)
    }
    render(){
        const {day, year, title, monthName, time, desc, month, deleteable, id} = this.props.info
        const ymd = year + "-" + month + "-" + day
        
        const deleteIcon = deleteable ? <div onClick={this.deleteEvent.bind(this)}><i class="material-icons">delete</i></div> : "";
        
        return(
            <li>
                <time dateTime={ymd} class="icon">
                  <span class="day">{day}</span>
                  <span class="month">{monthName}</span>
                  <span class="year">{year}</span>
                  <span class="time">{time}</span>
                </time>    
                <div class="info">
                    <h2 class="title">{title}</h2>
                    <p class="desc">{desc}</p>
                </div>
                <div class="social">
                    {deleteIcon}
                </div>
                <div class="delete">
                    
                </div>
                
                
            </li>
            
        )
    }
}