import mysql from "mysql"

export default callback => {
	var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'club_tennis'
    })
    
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
    
	callback();
}
