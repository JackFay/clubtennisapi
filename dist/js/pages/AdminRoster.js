import React from "react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import PlayerComponent from "../components/PlayerComponent";
import PlayersStore from "../../stores/PlayersStore"
import * as PlayerActions from "../../actions/playerActions"

export default class AdminRoster extends React.Component{
    constructor(){
        super();
        this.state = {
            players: PlayersStore.getAllPlayers(),
            data: {
                first_name: "",
                last_name: "",
                year: "",
                hometown: "",
                high_school: ""
            }
        }
        this.values = {
            first_name: "",
            last_name: "",
            year: "",
            hometown: "",
            high_school: ""
        }
    }
    
    componentWillMount(){
        
        PlayersStore.on("players store changed", () => {
            this.setState({
                players: PlayersStore.getAllPlayers(),
                data: {
                    first_name: this.values.first_name,
                    last_name: this.values.last_name,
                    year: this.values.year,
                    hometown: this.values.hometown,
                    high_school: this.values.high_school
                }
            })
        })
        PlayersStore.on("player added", () => {
            console.log(PlayersStore.getAllPlayers())
            this.setState({
                players: PlayersStore.getAllPlayers(),
                data: {
                    first_name: this.values.first_name,
                    last_name: this.values.last_name,
                    year: this.values.year,
                    hometown: this.values.hometown,
                    high_school: this.values.high_school
                }
            })
        })
        PlayersStore.on("player deleted", () => {
            console.log(PlayersStore.getAllPlayers())
            this.setState({
                players: PlayersStore.getAllPlayers(),
                data: {
                    first_name: this.values.first_name,
                    last_name: this.values.last_name,
                    year: this.values.year,
                    hometown: this.values.hometown,
                    high_school: this.values.high_school
                }
            })
        })
    }
    
    firstNameChange(e){
        this.state.data.first_name = e.target.value
    }
    
    lastNameChange(e){
        this.state.data.last_name = e.target.value
    }
    
    yearChange(e){
        this.state.data.year = e.target.value
    }
    
    cityChange(e){
        this.state.data.hometown = e.target.value
    }
    
    highSchoolChange(e){
        this.state.data.high_school = e.target.value
    }
    
    createPlayer(){
        this.values.first_name = this.state.data.first_name;
        this.values.last_name = this.state.data.last_name;
        this.values.hometown = this.state.data.hometown;
        this.values.high_school = this.state.data.high_school;
        PlayerActions.createPlayer(this.state.data)
    }
    
    
    
    render(){     
        
        const {players} = this.state;
        const PlayerComponents = players.map((player, index) => {
            return <PlayerComponent key={index}{...player} admin={true}/>;
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
                <div class="create_event">
                    <div>
                        <div>
                            <label for="fname">First Name: </label>
                        </div>
                        <input type="text" name="fname" onChange={this.firstNameChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="lname">Last Name: </label>
                        </div>
                        <input type="text" name="lname" onChange={this.lastNameChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="year">Year: </label>
                        </div>
                        <select name="year" onChange={this.yearChange.bind(this)}>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <label for="city">City/State: </label>
                        </div>
                        <input type="text" name="city" onChange={this.cityChange.bind(this)}/>
                    </div>
                    <div>
                        <div>
                            <label for="hs">High School: </label>
                        </div>
                        <input type="text" name="hs" onChange={this.highSchoolChange.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={this.createPlayer.bind(this)}>Add Player</button>
                    </div>
                </div>
            </div>
        );
    }
}