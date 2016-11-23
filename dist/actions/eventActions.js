import dispatcher from "../dispatcher"
import axios from "axios"
import LoginStore from "../stores/LoginStore";

export function createEvent(event){
    axios.post("http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/protected/events", event, {headers: {
        Authorization: 'Bearer ' + LoginStore.getJwt()
    }})
    .then(response => {
        event.id = response.data.insertId
        dispatcher.dispatch({type: "CREATE_EVENT", payload: event})
    })
    .catch(error => {
        console.log(error)
    })
    
}

export function deleteEvent(eventId){
    axios.post("http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/protected/events/delete", {id: eventId}, {headers: {
        Authorization: 'Bearer ' + LoginStore.getJwt()
    }})
    .then(response => {
        console.log(response.data)
        dispatcher.dispatch({type: "DELETE_EVENT", payload: eventId})
    })
    .catch(error => {
        console.log(error)
    })
    
}

export function initializeEventsStore(){
    axios.get('http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/events')
    .then(response => {
        dispatcher.dispatch({type: "INITIALIZE_EVENTS_STORE", payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
    
}