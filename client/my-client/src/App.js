import React, { useState, useEffect, createRef } from 'react';

import axios from 'axios';

const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

// Initialize

const App = () => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const [newmessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);

	// let textInput = React.createRef();

	// const onUsernameInputHandler = (event) => {
	// 	const username = event.target.value;
	// 	setUsername(username);
	// };
	// const onMessageInputHandler = (event) => {
	// 	const message = event.target.value;
	// 	setMessage(message);
	// };

	// const onNewMessageInputHandler = (event) => {
	// 	setNewMessage(event.target.value);
	// };

	// const submitHandler = (event) => {
	// 	event.preventDefault();
	// 	console.log(username, message);
	// 	axios
	// 		.post('http://localhost:3002/api/insert', {
	// 			username: username,
	// 			message: message,
	// 		})
	// 		.then((result) => {
	// 			console.log(result.data);
	// 			console.log(messages);
	// 			setMessages([
	// 				...messages,
	// 				{
	// 					id: result.data.id,
	// 					username: result.data.username,
	// 					usermessage: result.data.usermessage,
	// 				},
	// 			]);
	// 			console.log(messages);
	// 		});
	// 	console.log('Cliked Submit');
	// };

	// const deleteMessageHandler = (id) => {
	// 	console.log('Request delete ID: ', id);
	// 	axios
	// 		.delete('http://localhost:3002/api/delete', { data: { id: id } })
	// 		.then((result) => {
	// 			console.log(result.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});

	// 	setMessages((prevMessages) => {
	// 		return prevMessages.filter((message) => {
	// 			return message.id !== id;
	// 		});
	// 	});
	// };

	// const updateMessageHandler = (id) => {
	// 	console.log('New Message: ', newmessage);
	// 	console.log('Request update ID: ', id);
	// 	axios
	// 		.put('http://localhost:3002/api/update', {
	// 			id: id,
	// 			message: newmessage,
	// 		})
	// 		.then((result) => {
	// 			// console.log('Update Result: ', result);
	// 			setMessages((prevMessages) => {
	// 				console.log('PrevMessages ', prevMessages);
	// 				const arr = prevMessages.map((message) => {
	// 					if (message.id === id) {
	// 						return {
	// 							id: message.id,
	// 							username: message.username,
	// 							usermessage: newmessage,
	// 						};
	// 					}
	// 					return message;
	// 				});
	// 				//console.log('Returned: ', arr);
	// 				return [...arr];
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:3002/messages')
	// 		.then((result) => {
	// 			const data = result.data;

	// 			setMessages((messages) => [...messages, ...data]);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);

	// console.log('Messages', messages);
	const onClickHandler = () => {
		const url = 'http://localhost/storehouse/wp-json/wc/v3/products';

		//const consumer_key = 'ck_c537326e36602fb5c59174e2b06390242bde4362';
		const consumer_key = 'ck_4ecc74e1c7484fd0fadf42ce9c6e33a66da4864d';

		//const consumer_secret = 'cs_9fec25e487fcb3651b545adf122d28f956de2a65';
		const consumer_secret = 'cs_b30280ed2058f7f32b7b6cb7259f124508397acd';

		const oauth = OAuth({
			consumer: {
				key: consumer_key,
				secret: consumer_secret,
			},
			signature_method: 'HMAC-SHA1',
			hash_function(base_string, key) {
				return crypto
					.createHmac('sha1', key)
					.update(base_string)
					.digest('base64');
			},
		});

		// const request_data = {
		// 	url:
		// 		'https://api.twitter.com/1/statuses/update.json?include_entities=true',
		// 	method: 'POST',
		// 	data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
		// };
		const request_data = {
			url: url,
			method: 'GET',
			// data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
		};
		const token = {
			key: 'ck_c537326e36602fb5c59174e2b06390242bde4362',
			secret: 'cs_9fec25e487fcb3651b545adf122d28f956de2a65',
		};
		// request(
		// 	{
		// 		url: request_data.url,
		// 		method: request_data.method,
		// 		form: oauth.authorize(request_data, token),
		// 	},
		// 	function (error, response, body) {
		// 		console.log(error);
		// 		console.log(response);
		// 		console.log(body);
		// 	}
		// );

		axios
			.get('http://localhost/storehouse/wp-json/wc/v3/products', {
				headers: {
					headers: oauth.toHeader(oauth.authorize(request_data, token)),
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
		// 	headers: oauth.toHeader(),
		// })
		// 	.then((responseJson) => {
		// 		console.log(responseJson);
		// 	})
		// 	.catch((error) => console.log(error));

		// var obj = {
		// 	method: 'GET',
		// 	headers: {
		// 		authorization:
		// 			'OAuth oauth_consumer_key="ck_4d20b595462f110d6f21ec3d651e2fc6658d206d",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1611900591",oauth_nonce="iGTPOKeoIwI",oauth_version="1.0",oauth_signature="9pHOa%2BLHkv1z7PdmOLKMWjGNV6Y%3D"',
		// 		'user-agent': 'PostmanRuntime/7.26.10',
		// 		accept: '*/*',
		// 		'postman-token': 'f4ca17c1-d3ac-4259-b257-39ec03ac0a81',
		// 		host: 'localhost:3002',
		// 		'accept-encoding': 'gzip, deflate, br',
		// 		connection: 'keep-alive',
		// 	},

		// 	mode: 'cors', // no-cors, *cors, same-origin
		// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: 'same-origin', // include, *same-origin, omit
		// };
		// fetch(url, obj)
		// 	.then((responseJson) => {
		// 		const items = JSON.parse(responseJson._bodyInit);
		// 		console.lot(items);
		// 	})
		// 	.catch((error) => console.log(error));

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

		// 		fetch(url, {
		// 			method: 'GET',
		// 			// withCredentials: true,
		// 			// credentials: 'include',
		// 			headers: {
		// 				// Authorization: bearer,
		// 				// 'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
		// 				// 'Content-Type': 'application/json',
		// 				Content-Type: application,

		// Authorization: OAuth,

		//   oauth_consumer_key=consumer_key,

		//   oauth_signature_method="HMAC-SHA1",

		//   oauth_callback=[Client Redirect URI],

		//   oauth_timestamp=[Timestamp],

		//   oauth_nonce=[Nonce],

		//   oauth_signature=[Signature]
		// 			},
		// 		})
		// 			.then((responseJson) => {
		// 				var items = JSON.parse(responseJson._bodyInit);
		// 			})
		// 			.catch((error) =>
		// 				this.setState({
		// 					isLoading: false,
		// 					message: 'Something bad happened ' + error,
		// 				})
		// 			);
	};
	return (
		<React.Fragment>
			<button type="button" onClick={onClickHandler}>
				Request
			</button>
			{/* <div>
				<form onSubmit={submitHandler}>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="text"
						onChange={onUsernameInputHandler}
					/>
					<label htmlFor="name">Message:</label>
					<input
						type="text"
						name="message"
						onChange={onMessageInputHandler}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
			<div>
				{messages.map((value) => {
					return (
						<div>
							<h3>Username: {value.username}</h3>
							<p>Message:{value.usermessage}</p>
							<button
								onClick={() => {
									deleteMessageHandler(value.id);
								}}>
								Delete {value.id}
							</button>
							<input
								type="text"
								name="newmessage"
								// onChange={onNewMessageInputHandler}
								// value={newmessage}
								// onChange={(e) => {
								// 	onNewMessageInputHandler(e, value.id);
								// }}
								// onChange={onNewMessageInputHandler.bind(
								// 	this,
								// 	value.id
								// )}

								// onChange={}
								ref={textInput}
								onChange={onNewMessageInputHandler}
							/>

							<button
								onClick={() => {
									updateMessageHandler(value.id);
								}}>
								Update {value.id}
							</button>
						</div>
					);
				})}
			</div> */}
		</React.Fragment>
	);
};

export default App;
