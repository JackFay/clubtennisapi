import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import _ from "lodash"


class EventsStore extends EventEmitter{
    constructor(){
        super()
        this.events = []
        
    }
    
    createEvent(event){
        /*TODO*/
        
        
    }
    
    getAllEvents(){
        return this.events
    }
    
    handleActions(action){
        switch(action.type){
            case "INITIALIZE_EVENTS_STORE":{
                this.events = action.payload
                this.emit("events store changed")
                break;
            }
            case "CREATE_EVENT":{
                action.payload.new = true;
                this.events = this.events.concat(action.payload)
                console.log(this.events)
                this.emit("event added")
                break;
            }
            case "DELETE_EVENT":{
                this.events = _.filter(this.events, (event) => {
                    if(event.id != action.payload){
                        return event;
                    }
                })
                this.emit("events store changed")
                break;
            }
            default:
                break;
        }
    }
    
}

const eventsStore = new EventsStore
dispatcher.register(eventsStore.handleActions.bind(eventsStore));
export default eventsStore