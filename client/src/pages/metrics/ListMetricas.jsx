import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// const appApiUrl = process.env.REACT_APP_API_URL;
const appApiUrl = "http://localhost:3000";

const Metricas = props => (
    <tr>
        <td>{props.metricas.weight} Kg</td>
        <td>{props.metricas.hours_of_sleep} h</td>
        <td>{props.metricas.blood_pressure_high} mmHg</td>
		<td>{props.metricas.blood_pressure_low} mmHg</td>
        <td>{props.metricas.blood_sugar} mg/dL</td>
        <td>{props.metricas.calories_consumed} kcal</td>
        <td>
            <Link to={"/metricas/edit/" + props.metricas._id}>Editar</Link> | <a href="#" onClick={(e) => { e.preventDefault(); props.deleteMetricas(props.metricas._id) }}>Deletar</a>
        </td>
    </tr>
);

class ListMetricas extends Component {
    constructor(props) {
        super(props);
        this.state = { metricas: [] };
    }

    componentDidMount() {
        const username = Cookies.get('username');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        fetch(`${appApiUrl}/dailies?username=${username}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ metricas: data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteMetricas = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        fetch(`${appApiUrl}/dailies/` + id, requestOptions)
            .then(() => {
                this.setState({
                    metricas: this.state.metricas.filter(el => el._id !== id)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    metricasList() {
        return this.state.metricas.map(currentMetricas => {
            return <Metricas metricas={currentMetricas} deleteMetricas={this.deleteMetricas} key={currentMetricas._id} />;
        });
    }

    goToAddMetricasPage = () => {
        window.location.replace('/#/metricas/adicionar');
    }

    render() {
        return (
            <div>
                <table className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4">
                    <thead>
                        <tr>
                            <th className="p-2.5">Peso</th>
                            <th className="p-2.5">Horas de Sono</th>
                            <th className="p-2.5">Pressão Arterial Sistólica</th>
							<th className="p-2.5">Pressão Arterial Diastólica</th>
                            <th className="p-2.5">Glicose</th>
                            <th className="p-2.5">Calorias Consumidas</th>
                            <th className="p-2.5">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.metricasList()}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={this.goToAddMetricasPage}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Adicionar Métricas
                </button>
            </div>
        );
    }
}

export default ListMetricas;
