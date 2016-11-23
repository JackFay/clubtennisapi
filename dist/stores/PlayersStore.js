import {EventEmitter} from "events"
import dispatcher from "../dispatcher"

class PlayersStore extends EventEmitter{
    constructor(){
        super()
        this.players = []
    }
    
    getAllPlayers(){
        return this.players
    }
    
    addPlayer(player){
        
    }
    
    handleActions(action){
        switch(action.type){
            case "INITIALIZE_PLAYERS_STORE":{
                this.players = action.payload
                this.emit("players store changed")
                break;
            }
            case "ADD_PLAYER":{
                this.players = this.players.concat(action.payload)
                this.emit("players store changed")
                break;
            }
            case "DELETE_PLAYER":{
                this.players = _.filter(this.players, (player) => {
                    if(player.id != action.payload){
                        return player;
                    }
                })
                this.emit("player deleted")
                break;
            }
            default:{
                break;
            }
        }
    }
}

const playersStore = new PlayersStore;
dispatcher.register(playersStore.handleActions.bind(playersStore))
export default playersStore