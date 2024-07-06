import React, { Component } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

// const appApiUrl = process.env.REACT_APP_API_URL;
const appApiUrl = "http://localhost:3000";

class UpdateMetricas extends Component {

	constructor(props) {
		super(props);

		// Initialize state
		this.state = {
			username: '',
			weight: '',
			hours_of_sleep: '',
			blood_pressure_high: '',
			blood_pressure_low: '',
			blood_sugar: '',
			calories_burned: ''
		};
	}

	// Fetch metric data when the component mounts
	componentDidMount() {
		const href = window.location.href;
		const id = href.match(/\/([^\/]+)$/)[1];

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		};

		fetch(`${appApiUrl}/dailies/` + id, requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({
					username: data.username,
					weight: data.weight,
					hours_of_sleep: data.hours_of_sleep,
					blood_pressure_high: data.blood_pressure_high,
					blood_pressure_low: data.blood_pressure_low,
					blood_sugar: data.blood_sugar,
					calories_burned: data.calories_consumed
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Handle input changes
	onChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	// Handle form submission
	onSubmit = (e) => {
		e.preventDefault();

		const href = window.location.href;
		const id = href.match(/\/([^\/]+)$/)[1];

		const metrics = {
			username: Cookies.get('username'),
			weight: parseInt(this.state.weight),
			hours_of_sleep: parseInt(this.state.hours_of_sleep),
			blood_pressure_high: parseInt(this.state.blood_pressure_high),
			blood_pressure_low: parseInt(this.state.blood_pressure_low),
			blood_sugar: parseInt(this.state.blood_sugar),
			calories_consumed: parseInt(this.state.calories_burned)
		};

		fetch(`${appApiUrl}/dailies/update/` + id, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(metrics),
			credentials: 'include'
		})
		.then(() => {
			setTimeout(() => { window.location.replace('/#/metricas'); }, 100);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Peso Atual</label>
						<input type="number" id="weight" name="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="60 Kg" required 
						value={this.state.weight} onChange={this.onChange} />
						<p id="weight" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique seu peso atual em Kg</p>
					</div>
					<div>
						<label htmlFor="hours_of_sleep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Horas de Sono</label>
						<input type="number" id="hours_of_sleep" name="hours_of_sleep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
						value={this.state.hours_of_sleep} onChange={this.onChange} />
						<p id="hours_of_sleep" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique quantas horas dormiu na última noite</p>
					</div>
					<div>
						<label htmlFor="blood_pressure_high" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pressão Arterial</label>
						<input type="number" id="blood_pressure_high" name="blood_pressure_high" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="120 mmHg" required 
						value={this.state.blood_pressure_high} onChange={this.onChange} />
						<input type="number" id="blood_pressure_low" name="blood_pressure_low" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="80 mmHg" required 
						value={this.state.blood_pressure_low} onChange={this.onChange} />
						<p id="blood_pressure" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique sua pressão arterial sistólica e diastólica medidas hoje</p>
					</div>
					<div>
						<label htmlFor="blood_sugar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Glicose</label>
						<input type="number" id="blood_sugar" name="blood_sugar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="100 mg/dL" required 
						value={this.state.blood_sugar} onChange={this.onChange} />
						<p id="blood_sugar" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique seu nível de glicose medido hoje</p>
					</div>
					<div>
						<label htmlFor="calories_burned" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Calorias Ingeridas</label>
						<input type="number" id="calories_burned" name="calories_burned" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1000 kcal" required 
						value={this.state.calories_burned} onChange={this.onChange} />
						<p id="calories_burned" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique quantas calorias ingeridas hoje</p>
					</div>
				</div>
				<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar Métricas</button>
			</form>
		);
	}
}

export default UpdateMetricas;
