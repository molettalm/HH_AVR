import React, { Component } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

// const appApiUrl = process.env.REACT_APP_API_URL;
const appApiUrl = "http://localhost:3000";;

class AddMedicamentos extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			medicine_name: '',
			period: 0,
			first_intake: ''
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const medicine = {
			username: Cookies.get('username'),
			medicine_name: this.state.medicine_name,
			period: parseInt(this.state.period),
			first_intake: this.state.first_intake
		};

		fetch(`${appApiUrl}/medicines/add`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(medicine),
			credentials: 'include'
		})
		.then(() => {
			setTimeout(() => { window.location.replace('/#/medicamentos'); }, 100);
		})
		.catch((error) => {
			console.log(error);
		});
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="grid gap-6 mb-6 md:grid-cols-1">
					<div>
						<label htmlFor="medicine_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome do Remédio</label>
						<input type="text" id="medicine_name" name="medicine_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Rivotril" required 
						value={this.state.medicine_name} onChange={this.onChange}/>
					</div>
					<div>
						<label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Período de Ingestão</label>
						<select id="period-select" name="period" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required onChange={this.onChange}>
							<option value="">--Por favor escolha uma opção--</option>
							{[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(hours => (
								<option key={hours} value={hours}>{hours} Horas</option>
							))}
						</select>
						<p id="period-select" className="mt-2 text-sm text-gray-500 dark:text-gray-400">De quantas em quantas horas vai tomar seu remédio?</p>
					</div>
					<div>
						<label htmlFor="datetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Primeira Dose</label>
						<input type="datetime-local" id="first_intake" name="first_intake" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required 
						value={this.state.first_intake} onChange={this.onChange}/>
						<p id="username" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selecione o dia e o horário da primeira dose</p>
					</div>
				</div>
				<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Medicamento</button>
			</form>
		);
	}
}

export default AddMedicamentos;
