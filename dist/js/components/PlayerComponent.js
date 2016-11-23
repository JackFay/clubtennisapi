import React from "react";
import * as PlayersActions from "../../actions/playerActions"

export default class PlayerComponent extends React.Component {
 
    constructor(){
        super();
    }
    
    deletePlayer(){
        console.log(this.props.id)
        PlayersActions.deletePlayer(this.props.id)
    }
    
    
    render(){
        const {first_name, last_name, year, high_school, hometown, admin} = this.props;
        const deleteable = admin ? <td><i class="material-icons" onClick={this.deletePlayer.bind(this)}>delete</i></td> : "";
        return(
            <tr class="roster_row">
                <td>{first_name} {last_name}</td>
                <td>{year}</td>
                <td>{hometown} / {high_school}</td>
                {deleteable}
            </tr>
        );
    }
    
}