import dispatcher from "../dispatcher"
import axios from "axios"
import LoginStore from "../stores/LoginStore";

export function createPlayer(player){
    console.log(player)
    axios.post("http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/protected/players", player, {headers: {
        Authorization: 'Bearer ' + LoginStore.getJwt()
    }})
    .then(response => {
        player.id = response.data.insertId
        dispatcher.dispatch({type: "ADD_PLAYER", payload: player})
    })
    .catch(error => {
        console.log(error)
    })
    
}

export function deletePlayer(playerId){
    axios.post("http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/protected/players/delete", {id: playerId}, {headers: {
        Authorization: 'Bearer ' + LoginStore.getJwt()
    }})
    .then(response => {
        console.log(response.data)
        dispatcher.dispatch({type: "DELETE_PLAYER", payload: playerId})
    })
    .catch(error => {
        console.log(error)
    })
    
}

export function initializePlayersStore(){
    axios.get('http://ec2-35-160-234-54.us-west-2.compute.amazonaws.com/clubtennis/api/players')
//    axios.get('http://localhost:5000/api/players')
    .then(response => {
        dispatcher.dispatch({type: "INITIALIZE_PLAYERS_STORE", payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
    
}