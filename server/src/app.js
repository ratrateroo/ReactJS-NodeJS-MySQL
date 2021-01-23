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
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);
// 	next();
// });

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
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
	const sqlShowMessages = 'SELECT * FROM usermessages ';

	db.query(sqlShowMessages, (error, result) => {
		console.log('Query Result', result);

		res.send(result);
	});
});

app.post('/api/insert', (req, res) => {
	//console.log(req);
	const username = req.body.username;
	const message = req.body.message;
	const sqlInsertMesage =
		'INSERT INTO usermessages (username, usermessage) VALUES (?,?);';
	console.log(username, message);
	db.query(sqlInsertMesage, [username, message], (error, result) => {
		res.send({
			id: result.insertId,
			username: username,
			usermessage: message,
		});
		//console.log('Post', result);
		//res.send(result);
	});
});

app.delete('/api/delete', (req, res) => {
	const id = req.body.id;

	const sqlDelete = 'DELETE FROM usermessages WHERE id = ?;';
	console.log('Request delete ID: ', id);
	db.query(sqlDelete, id, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

app.listen(3002, () => {
	console.log('Server is running on port 3002');
});
