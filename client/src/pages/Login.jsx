import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
            password: this.state.password
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                credentials: 'include' // Ensure cookies are included in the request
            });

            if (!response.ok) {
                throw new Error('Failed to login.');
            }

            const data = await response.json();

            // Assuming the backend sets the cookies correctly, you don't need to handle cookies here
            // Update state to indicate successful login
            this.setState({ success: true, error: '' });
            
            // Redirect to home page or any other route after successful login
            window.location.replace('/#/resumo'); // Change the URL as needed
        } catch (error) {
            console.log(error);
            this.setState({ error: 'Failed to login.' });
        }
    };

    render() {
        const { error, success, username, password } = this.state;
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
                    {success && <p style={{ color: 'green' }}>Login bem-sucedido!</p>}
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
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-2">
                        Não tem uma conta? <Link to={"/register"}>Registre-se</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;
