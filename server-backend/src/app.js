const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'loginsystem',
});

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

app.listen(3002, () => {
	console.log('Server is running on port 3002');
});
