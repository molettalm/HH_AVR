import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie library

const Medicine = props => (
    <tr>
        <td>{props.medicine.medicine_name}</td>
        <td>{props.medicine.period}</td>
        <td>{`${props.medicine.first_intake.substring(0, 10)} ${props.medicine.first_intake.substring(11, 16)}`}</td>
        <td>
            <Link to={"/medicamentos/edit/"+props.medicine._id}>Editar</Link> | <a href="#" onClick={(e) => {e.preventDefault(); props.deleteMedicine(props.medicine._id)}}>Deletar</a>
        </td>
    </tr>
);

class ListMedicamentos extends Component {
	constructor(props) {
		super(props);
		this.state = { medicines: [] };
	}

	componentDidMount() {
		const username = Cookies.get('username'); // Get the username from cookies

		const requestOptions = {
			method: 'GET',
			headers: { 
                'Content-Type': 'application/json',
            },
			credentials: 'include'
		};

		fetch(`http://localhost:3000/medicines?username=${username}`, requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({ medicines: data })
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteMedicine = (id) => {

		const requestOptions = {
			method: 'DELETE',
			headers: { 
                'Content-Type': 'application/json',
            },
			credentials: 'include'
		};

		fetch('http://localhost:3000/medicines/' + id, requestOptions)
			.then(() => {
				// Filter out the deleted medicine from the state
				this.setState({
					medicines: this.state.medicines.filter(el => el._id !== id)
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	medicinesList() {
		return this.state.medicines.map(currentmedicine => {
			return <Medicine medicine={currentmedicine} deleteMedicine={this.deleteMedicine} key={currentmedicine._id} />;
		});
	}

	goToAddMedicinePage = () => {
		window.location.replace('/#/medicamentos/adicionar');
	}

	render() {
		return (
			<div>
				<table className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4">
					<thead>
						<tr>
							<th className="p-2.5">Nome do Remédio</th>
							<th className="p-2.5">Período (em horas)</th>
							<th className="p-2.5">Primeira Dose</th>
							<th className="p-2.5">Ações</th>
						</tr>
					</thead>
					<tbody>
						{this.medicinesList()}
					</tbody>
				</table>
				<button
					type="button"
					onClick={this.goToAddMedicinePage}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Adicionar Medicamento
				</button>
			</div>
		);
	}
}

export default ListMedicamentos;
