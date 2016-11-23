import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import jwt from "jsonwebtoken";


export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});
    
    api.get('/events', (req, res) => {
        const getEventsQuery = "SELECT * FROM events";
        
        db.query(getEventsQuery, (err, rows, fields) => {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(rows);
            }
        })
    });
    
    
    api.get('/players', (req, res) => {
        const getPlayersQuery = "SELECT * FROM players";
        
        db.query(getPlayersQuery, (err, rows, fields) => {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                res.send(rows)
            }
        });
    });
    
    api.post('/login', (req, res) => {
        console.log(req.body)
        const {username, hash} = req.body;
        const getLoginQuery = "SELECT * FROM users WHERE username=\'" + username + "\' and hash=\'" + hash + "\'";
        
        db.query(getLoginQuery, (err, rows, fields) => {
            if(err){
                console.log(err);
                res.send("fail")
            }else{
                if(rows.length == 1){
                    const user = {
                        first_name: rows[0].first_name,
                        id: rows[0].user_id
                    }
                    const secret = "secret";
                    const token = jwt.sign(user, secret)
                    
                    res.json({token: token, expiresInMinutes: 60*5});
                }else{
                    res.send("incorrect username or password")
                }
            }
        })
    })

	return api;
}
