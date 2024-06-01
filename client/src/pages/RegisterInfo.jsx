import React, { Component } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

const appApiUrl = process.env.REACT_APP_API_URL;

class RegisterInfo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			birth: '',
			biological_gender: '',
			height: 0
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const info = {
			username: Cookies.get('username'),
			birth: parseInt(this.state.birth),
			biological_gender: this.state.biological_gender,
			height: this.state.height
		};

		fetch(`${appApiUrl}/info/add`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
			credentials: 'include'
		})
		.then(() => {
			setTimeout(() => { window.location.replace('/#/resumo'); }, 100);
		})
		.catch((error) => {
			console.log(error);
		});
	};

	render() {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
					<h2 className="text-2xl font-bold mb-6 text-center">Registre suas informações</h2>
					<form onSubmit={this.onSubmit}>
						<div className="grid gap-6 mb-6 md:grid-cols-1">
							<div>
								<label htmlFor="biological_gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Seu gênero</label>
								<select id="biological_gender-select" name="biological_gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={this.onChange}>
									<option value="">--Por favor escolha uma opção--</option>
									{["Masculino", "Feminino"].map(gender => (
										<option key={gender} value={gender}>{gender}</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sua altura</label>
								<input type="number" id="height" name="height" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="173 cm" required 
								value={this.state.height} onChange={this.onChange} />
								<p id="height" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique qual a sua altura em cm</p>
							</div>
							<div>
								<label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sua data de nascimento</label>
								<input type="date" id="birth" name="birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
								value={this.state.birth} onChange={this.onChange} />
							</div>
						</div>
						<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Prosseguir</button>
					</form>
				</div>
			</div>
		);
	}
}

export default RegisterInfo;
