import React, { useState, useEffect, createRef } from 'react';

import axios from 'axios';

const App = () => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const [newmessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);

	let textInput = React.createRef();

	const onUsernameInputHandler = (event) => {
		const username = event.target.value;
		setUsername(username);
	};
	const onMessageInputHandler = (event) => {
		const message = event.target.value;
		setMessage(message);
	};

	const onNewMessageInputHandler = (event) => {
		setNewMessage(event.target.value);
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
						id: result.data.id,
						username: result.data.username,
						usermessage: result.data.usermessage,
					},
				]);
				console.log(messages);
			});
		console.log('Cliked Submit');
	};

	const deleteMessageHandler = (id) => {
		console.log('Request delete ID: ', id);
		axios
			.delete('http://localhost:3002/api/delete', { data: { id: id } })
			.then((result) => {
				console.log(result.data);
			})
			.catch((error) => {
				console.log(error);
			});

		setMessages((prevMessages) => {
			return prevMessages.filter((message) => {
				return message.id !== id;
			});
		});
	};

	const updateMessageHandler = (id) => {
		console.log('New Message: ', newmessage);
		console.log('Request update ID: ', id);
		axios
			.put('http://localhost:3002/api/update', {
				id: id,
				message: newmessage,
			})
			.then((result) => {
				// console.log('Update Result: ', result);
				setMessages((prevMessages) => {
					console.log('PrevMessages ', prevMessages);
					const arr = prevMessages.map((message) => {
						if (message.id === id) {
							return {
								id: message.id,
								username: message.username,
								usermessage: newmessage,
							};
						}
						return message;
					});
					//console.log('Returned: ', arr);
					return [...arr];
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get('http://localhost:3002/messages')
			.then((result) => {
				const data = result.data;

				setMessages((messages) => [...messages, ...data]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// console.log('Messages', messages);

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
			</div>
		</React.Fragment>
	);
};

export default App;
