import React, { Component } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");

class App extends Component {
	constructor(props) {
		super(props);
		this.runScraper = this.runScraper.bind(this);
		this.state = {
			data: [],
			message: ""
		};
	}
	async runScraper() {
		socket.on("scraper", message => this.setState({ message }));
		const data = await axios.post("http://localhost:4000/", {
			url: "https://developers.google.com/web/"
		});
		this.setState({ data: data.data.result });
	}
	render() {
		return (
			<div className="App">
				<button onClick={this.runScraper}>run scraper</button>
				<h1>{this.state.message}</h1>
				{this.state.data.map(e => (
					<li>{e}</li>
				))}
			</div>
		);
	}
}

export default App;
