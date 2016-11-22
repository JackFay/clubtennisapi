import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

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
    
    api.post('/events', (req, res) => {
        console.log(req.body)
        const events = req.body
        const postEventsQuery = "INSERT INTO events SET ?";
        
        db.query(postEventsQuery, req.body, (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(result);
                res.send("successfully added event(s)");
            }
        });
    });

	return api;
}
