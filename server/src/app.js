const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'cruddb1',
});
app.use(express.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(bodyparser.urlencoded({ extended: true }));

//app.get('/', (req, res) => {
// const sqlInsert =
// 	"INSERT INTO usermessages (username, usermessage) VALUES ('rose', 'let''s play with fire');";
// db.query(sqlInsert, (error, result) => {
// 	res.send('Accessing Server.');
// });
//});

app.get('/messages', (req, res) => {
	const sqlInsert = 'SELECT * FROM usermessages ';

	db.query(sqlInsert, (error, result) => {
		console.log(result);
		res.send(result);
	});
});

app.post('/api/insert', (req, res) => {
	console.log(req);
	const username = req.body.username;
	const message = req.body.message;
	const sqlInsert =
		'INSERT INTO usermessages (username, usermessage) VALUES (?,?);';
	console.log(username, message);
	db.query(sqlInsert, [username, message], (error, result) => {
		res.send({ username: username, message: message });
	});
});
app.listen(3002, () => {
	console.log('Server is running on port 3002');
});
