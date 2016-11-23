import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

export default ({ config, db }) => {
	let protectedApi = Router();

	// mount the facets resource
	protectedApi.use('/facets', facets({ config, db }));
    
    protectedApi.use('/', expressJwt({secret: "secret"}))
    
    protectedApi.post('/events', (req, res) => {
        console.log(req.body)
        const events = req.body
        const postEventsQuery = "INSERT INTO events SET ?";
        
        db.query(postEventsQuery, req.body, (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(result);
                res.send({insertId: result.insertId});
            }
        });
    });
    
    
    protectedApi.post('/players', (req, res) => {
        const players = req.body;
        const postPlayersQuery = "INSERT INTO players SET ?";
        
        db.query(postPlayersQuery, players, (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(result);
                res.send({insertId: result.insertId})
            }
        })
    })

	return protectedApi;
}
