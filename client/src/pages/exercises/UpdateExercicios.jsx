import React, { Component } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

// const appApiUrl = process.env.REACT_APP_API_URL;
const appApiUrl = "http://localhost:3000";

class UpdateExercicios extends Component {

    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            username: '',
            description: '',
            duration: 0,
            calories_burned: 0,
            date: ''
        };
    }

    // Fetch exercise data when component mounts
    componentDidMount() {
        const href = window.location.href;
        const id = href.match(/\/([^\/]+)$/)[1];

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };

        fetch(`${appApiUrl}/exercises/` + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                const formattedDate = new Date(data.date).toISOString().split('T')[0];

                this.setState({
                    username: data.username,
                    description: data.description,
                    duration: data.duration,
                    calories_burned: data.calories_burned,
                    date: formattedDate
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

        const exercise = {
            username: Cookies.get('username'),
            description: this.state.description,
            duration: parseInt(this.state.duration),
            calories_burned: parseInt(this.state.calories_burned),
            date: this.state.date
        };

        fetch(`${appApiUrl}/exercises/update/` + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise),
            credentials: 'include'
        })
            .then(() => {
                setTimeout(() => { window.location.replace('/#/exercicios'); }, 100);
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
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Exercício</label>
                        <select name="description" id="exercise-select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required 
                        onChange={this.onChange} value={this.state.description}>
                            <option value="">--Por favor escolha uma opção--</option>
                            <option value="Bicicleta">Bicicleta</option>
                            <option value="Corrida">Corrida</option>
                            <option value="Futebol">Futebol</option>
                            <option value="Basquete">Basquete</option>
                            <option value="Caminhada">Caminhada</option>
                            <option value="Natacao">Natação</option>
                            <option value="Hidroginastica">Hidroginástica</option>
                            <option value="Ginastica">Ginástica</option>
                            <option value="Musculacao">Musculação</option>
                            <option value="Pilates">Pilates</option>
                            <option value="Volei">Vôlei</option>
                            <option value="Escalada">Escalada</option>
                            <option value="Yoga">Yoga</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="calories_burned" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Calorias Gastas</label>
                        <input type="number" id="calories_burned" name="calories_burned" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="100 kcal" required 
                        value={this.state.calories_burned} onChange={this.onChange}/>
                        <p id="calories_burned" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique quantas calorias gastou durante o exercício</p>
                    </div>
                    <div>
                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Duração</label>
                        <input type="number" id="duration" name="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required 
                        value={this.state.duration} onChange={this.onChange}/>
                        <p id="duration" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selecione a duração do seu exercício</p>
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Data</label>
                        <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required 
                        value={this.state.date} readOnly/>
                        <p id="date" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selecione o dia e o horário que realizou o exercício</p>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Exercício</button>
            </form>
        );
    }
}

export default UpdateExercicios;
