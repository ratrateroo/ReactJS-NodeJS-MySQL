import React from 'react';
import './App.css';

function App() {
	const onClickHander = () => {
		// const url = 'http://localhost/storehouse/wp-json/wc/v3/products';

		// var obj = {
		// 	method: 'POST',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 		Origin: '',
		// 		Host: 'api.producthunt.com',
		// 	},
		// 	body: JSON.stringify({
		// 		client_id: 'ck_4d20b595462f110d6f21ec3d651e2fc6658d206d',
		// 		client_secret: 'cs_9343aac9f18b64967173b14f8a4b8dbe88fcb4ad',
		// 		grant_type: 'client_credentials',
		// 	}),
		// };
		// const result = fetch(url, obj);
		// console.log(result);

		const access_token = 'ck_4d20b595462f110d6f21ec3d651e2fc6658d206d';
		axios
			.get('http://localhost/storehouse/wp-json/wc/v3/products', {
				headers: {
					Authorization: `token ${access_token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.error(error);
			});

		// fetch(url, {
		// 	method: 'GET',
		// 	body:
		// 		'grant_type=client_credentials&client_id=' +
		// 		key +
		// 		'&client_secret=' +
		// 		secret,
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// });

		// request.get(
		// 	'https://api.twitter.com/1.1/users/show.json',
		// 	{
		// 		oauth: {
		// 			consumer_key: '...',
		// 			consumer_secret: '...',
		// 			token: '...',
		// 			token_secret: '...',
		// 		},
		// 		qs: { user_id: '...' }, // or screen_name
		// 	},
		// 	function (err, res, body) {}
		// );

		// fetch(url, {
		// 	method: 'GET',
		// 	withCredentials: true,
		// 	credentials: 'include',
		// 	headers: {
		// 		Authorization: bearer,
		// 		'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
		// 		'Content-Type': 'application/json',
		// 	},
		// })
		// 	.then((responseJson) => {
		// 		var items = JSON.parse(responseJson._bodyInit);
		// 	})
		// 	.catch((error) =>
		// 		this.setState({
		// 			isLoading: false,
		// 			message: 'Something bad happened ' + error,
		// 		})
		// 	);
	};
	return (
		<div>
			{/* <form>
				<h1>Registration</h1>
				<label htmlFor="username">Username:</label>
				<input type="text" name="username" />

				<label htmlFor="password">Password:</label>
				<input type="password" name="password" />

				<label htmlFor="email">Email:</label>
				<input type="Email" name="email" />
				<button type="submit">Submit</button>
			</form>

			<form>
				<h1>Login</h1>
				<label htmlFor="username">Username:</label>
				<input type="text" name="username" />

				<label htmlFor="password">Password:</label>
				<input type="password" name="password" />

				<button type="submit">Submit</button>
			</form> */}

			<button type="button" onClick={onClickHandler}>
				Make Request
			</button>
		</div>
	);
}

export default App;
