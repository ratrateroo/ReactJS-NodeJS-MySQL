import React, { useState, useEffect } from 'react';

import axios from 'axios';

const App = () => {
	const [username, setUsername] = useState();
	const [message, setMessage] = useState();
	const [messages, setMessages] = useState([]);

	const onUsernameInputHandler = (event) => {
		const username = event.target.value;
		setUsername(username);
	};
	const onMessageInputHandler = (event) => {
		const message = event.target.value;
		setMessage(message);
	};
	const submitHandler = (event) => {
		event.preventDefault();
		console.log(username, message);
		axios
			.post('http://localhost:3002/api/insert', {
				username: username,
				message: message,
			})
			.then((result) => {
				console.log(result.data);
				console.log(messages);
				setMessages([
					...messages,
					{
						username: result.data.username,
						message: result.data.message,
					},
				]);
				console.log(messages);
			});
		console.log('Cliked Submit');
	};

	// const getMessages = () => {
	// 	axios.get('http://localhost:3002/messages').then((result) => {
	// 		console.log('UseEffect', result.data);
	// 		setState((prevState) => ({
	// 			...prevState,
	// 			result: result.data,
	// 		}));
	// 		// setMessages([
	// 		// 	{
	// 		// 		username: result.data.username,
	// 		// 		message: result.data.message,
	// 		// 	},
	// 		// ]);
	// 		console.log('getMessages', messages);
	// 	});
	// };

	useEffect(() => {
		// const fetchData = axios
		// 	.get('http://localhost:3002/messages')

		// 	.then((result) => {
		// 		console.log('UseEffect', result.data);

		// 		setMessages([
		// 			{
		// 				username: result.data.username,
		// 				message: result.data.message,
		// 			},
		// 		]);
		// 		console.log('getMessages', messages);
		// 	});

		const getMessages = async () => {
			try {
				const result = await axios
					.get('http://localhost:3002/messages')
					.then((result) => {
						console.log('UseEffect', result.data);

						console.log(result);

						setMessages([
							...messages,
							{
								username: result.data.username,
								message: result.data.usermessage,
							},
						]);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();

		// call the async fetchData function
	}, []);

	return (
		<React.Fragment>
			<div>
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
						<div key={Math.random()}>
							<h3>Username: {value.username}</h3>
							<p>Message:{value.message}</p>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default App;
