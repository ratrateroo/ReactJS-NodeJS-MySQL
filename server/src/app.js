const express = require('express');

const mysql = require('mysql');

const app = express();

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'cruddb1',
});

app.get('/', (req, res) => {
	// const sqlInsert =
	// 	"INSERT INTO usermessages (username, usermessage) VALUES ('rose', 'let''s play with fire');";
	// db.query(sqlInsert, (error, result) => {
	// 	res.send('Accessing Server.');
	// });
});

app.listen(3002, () => {
	console.log('Server is running on port 3001');
});
