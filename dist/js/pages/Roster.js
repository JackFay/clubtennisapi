import React from "react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import PlayerComponent from "../components/PlayerComponent";
import PlayersStore from "../../stores/PlayersStore"
import * as PlayerActions from "../../actions/playerActions"

export default class Roster extends React.Component{
    constructor(){
        super();
        this.state = {
            players: PlayersStore.getAllPlayers()
        };
        
    }
    
    componentWillMount(){
        PlayersStore.on("players store changed", () => {
            this.setState({
                players: PlayersStore.getAllPlayers()
            })
        })
    }
    
    
    
    render(){     
        
        const {players} = this.state;
        const PlayerComponents = players.map((player) => {
            return <PlayerComponent key={player.id}{...player}/>;
        });
        
        return(
            <div>
                <h3 class="roster_title">2016-2017 Roster</h3>
                <table class="table table-hover table-striped">
                    <thead class="roster_table_head">
                      <tr>
                        <th>Name</th>
                        <th>Yr.</th>
                        <th>Hometown/High School</th>
                      </tr>
                    </thead>
                    <tbody>
                        {PlayerComponents}
                    </tbody>
                </table>
            </div>
        );
    }
}