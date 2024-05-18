import React, { Component } from 'react';

class AddMedicamentos extends Component {

	constructor(props) {
		super(props);

		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onChangeMedicineName = this.onChangeMedicineName.bind(this);
		this.onChangePeriod = this.onChangePeriod.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);

		this.state = {
			username: '',
			medicine_name: '',
			period: 0,
			date_time: new Date()
		};
	}

	componentDidMount(){
		this.setState({
			username: "FlavioNeto"
		})
	}

	onChangeUserName = (un) => {
		this.setState({
			username: un.target.value
		});
	};

	onChangeMedicineName = (medicine) => {
		this.setState({
			medicine_name: medicine.target.value
		});
	};

	onChangePeriod = (p) => {
		this.setState({
			period: p.target.value
		});
	};

	onChangeDate = (datetime) => {
		this.setState({
			date_time: datetime
		});
	};

	onSubmit = () => {

		const medicine = {
			username: this.state.username,
			medicine_name: this.state.medicine_name,
			period: this.state.period,
			date_time: this.state.date_time
		}

		console.log(medicine);

		window.location = '/medicamentos';
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div class="grid gap-6 mb-6 md:grid-cols-1">
					<div>
						<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Usuário</label>
						<input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="FlavioNeto" required 
						onChange={this.onChangeUserName}/>
						<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Por favor insira seu usuário!</p>
					</div>
					<div>
						<label for="medicine_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome do Remédio</label>
						<input type="text" id="medicine_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rivotril" required 
						onChange={this.onChangeMedicineName}/>
					</div>
					<div>
						<label for="period" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Período de Ingestão</label>
						<select name="pedriod" id="period-select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={this.onChangePeriod}>
							<option value="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">--Por favor escolha uma opção--</option>
							<option value="2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">2 Horas</option>
							<option value="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">4 Horas</option>
							<option value="6" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">6 Horas</option>
							<option value="8" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">8 Horas</option>
							<option value="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">10 Horas</option>
							<option value="12" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">12 Horas</option>
							<option value="14" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">14 Horas</option>
							<option value="16" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">16 Horas</option>
							<option value="18" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">18 Horas</option>
							<option value="20" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">20 Horas</option>
							<option value="22" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">22 Horas</option>
							<option value="24" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">24 Horas</option>
						</select>
						<p id="period-select" class="mt-2 text-sm text-gray-500 dark:text-gray-400">De quantas em quantas horas vai tomar seu remédio?</p>
					</div>
					<div>
						<label for="datetime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Primeira Dose</label>
						<input type="datetime-local" id="first_intake" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
						onChange={this.onChangeDate}/>
						<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Selecione o dia e o horário da primeira dose</p>
					</div>
				</div>
				<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Medicamento</button>
			</form>
		);
	}
}

export default AddMedicamentos