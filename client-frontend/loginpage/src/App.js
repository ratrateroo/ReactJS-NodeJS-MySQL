import React from 'react';
import './App.css';

function App() {
	return (
		<div>
			<form>
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
			</form>
		</div>
	);
}

export default App;
