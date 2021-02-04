import React, { useState, useEffect, createRef } from 'react';

import axios from 'axios';

// const request = require('request');
// const OAuth = require('oauth-1.0a');
// const crypto = require('crypto');

import request from 'request';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import addOAuthInterceptor from 'axios-oauth-1.0a';

// Initialize
const consumer_key = 'ck_4ecc74e1c7484fd0fadf42ce9c6e33a66da4864d';
const consumer_secret = 'cs_b30280ed2058f7f32b7b6cb7259f124508397acd';
const App = () => {
	const onClickHandlerAxios = () => {
		// Initialize
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

		const request_data = {
			url: 'http://localhost/storehouse/wp-json/wc/v3/products/categories',
			method: 'GET',
			// data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
		};

		// Note: The token is optional for some requests
		const token = {
			key: consumer_key,
			secret: consumer_secret,
		};

		fetch('http://localhost/storehouse/wp-json/wc/v3/products/categories', {
			method: request_data.method,

			headers: oauth.toHeader(oauth.authorize(request_data)),
		})
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	const onClickHandler = () => {
		const url = 'http://localhost/storehouse/wp-json/wc/v3/products';

		//const consumer_key = 'ck_c537326e36602fb5c59174e2b06390242bde4362';

		//const consumer_secret = 'cs_9fec25e487fcb3651b545adf122d28f956de2a65';

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

		const request_data = {
			url: url,
			method: 'GET',
			// data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
		};
		const token = {
			key: 'ck_c537326e36602fb5c59174e2b06390242bde4362',
			secret: 'cs_9fec25e487fcb3651b545adf122d28f956de2a65',
		};

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
	};
	return (
		<React.Fragment>
			<button type="button" onClick={onClickHandler}>
				Request
			</button>

			<button type="button" onClick={onClickHandlerAxios}>
				Request Axios
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
