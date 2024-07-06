import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie library

// const appApiUrl = process.env.REACT_APP_API_URL;
const appApiUrl = "http://localhost:3000";

const Exercise = (props) => (
    <tr>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.calories_burned}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={`/exercicios/edit/${props.exercise._id}`}>Editar</Link> | <a href="#" onClick={(e) => { e.preventDefault(); props.deleteExercise(props.exercise._id); }}>Deletar</a>
        </td>
    </tr>
);

class ListExercicios extends Component {
    constructor(props) {
        super(props);
        this.state = { exercises: [] };
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

        fetch(`${appApiUrl}/exercises?username=${username}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ exercises: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteExercise = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        fetch(`${appApiUrl}/exercises/${id}`, requestOptions)
            .then(() => {
                this.setState({
                    exercises: this.state.exercises.filter(el => el._id !== id)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    exercisesList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        });
    }

    goToAddExercisePage = () => {
        window.location.replace('/#/exercicios/adicionar');
    }

    render() {
        return (
            <div>
                <table className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4">
                    <thead>
                        <tr>
                            <th className="p-2.5">Esporte</th>
                            <th className="p-2.5">Duração (min)</th>
                            <th className="p-2.5">Calorias Queimadas</th>
                            <th className="p-2.5">Data</th>
                            <th className="p-2.5">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={this.goToAddExercisePage}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Adicionar Exercício
                </button>
            </div>
        );
    }
}

export default ListExercicios;
