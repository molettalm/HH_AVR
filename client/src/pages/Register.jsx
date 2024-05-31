import React, { Component } from 'react';
import { Link } from "react-router-dom";

const appApiUrl = process.env.REACT_APP_API_URL;

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            success: false,
            error: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        try {
            const response = await fetch(`${appApiUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include credentials (cookies)
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to register.');
            }

            this.setState({ success: true, error: '' });
            window.location.replace('/#/resumo'); // Redirect to homepage or any other page
        } catch (error) {
            console.log(error);
            this.setState({ error: error.message });
        }
    };

    render() {
        const { error, success, username, email, password } = this.state;
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-lg font-semibold mb-4 text-center">Criar Conta</h2>
                    {success && <p style={{ color: 'green' }}>Conta criada!</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}  
                    <form onSubmit={this.onSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome de usuário</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                    value={username}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Criar Conta
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                            Já tem uma conta? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</Link>
                        </p>
                    </form>
                    <p className="mt-2">
                       Já possui uma conta? <Link to={"/login"}>Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;
