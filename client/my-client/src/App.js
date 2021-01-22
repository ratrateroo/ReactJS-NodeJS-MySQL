import React from 'react';

const App = () => {
	const submitHandler = (event) => {
		event.preventDefault();
		console.log('Cliked Submit');
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<label htmlFor="name">Name:</label>
				<input type="text" name="text" />
				<label htmlFor="name">Message:</label>
				<input type="text" name="message" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default App;
