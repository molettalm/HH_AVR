import React from 'react';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';

class Home extends React.Component {
    render() {
        return (
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="bg-neutral-900 text-white py-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <div className="flex items-center gap-2">
                            <FcLike fontSize={24} />
                            <h1 className="text-xl font-bold">HealthyHub</h1>
                        </div>
                        <nav className="flex space-x-4">
                            <Link to="/register" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5">
                                Crie uma conta
                            </Link>
                            <Link to="/login" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5">
                                Login
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow overflow-y-auto">
                    <div className="container mx-auto p-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold mb-2">Bem-vindo ao HealthyHub!</h2>
                            <p className="text-gray-700">
                                HealthyHub é o seu companheiro pessoal de acompanhamento de saúde. Mantenha o controle de suas métricas de saúde, gerencie seus medicamentos e mantenha-se no topo de seus objetivos de saúde com facilidade.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center">
                            <div className="flex justify-center flex-col mb-4 p-6 bg-white shadow-lg rounded-lg text-center md:text-left md:w-1/2 md:order-1">
                                <h2 className="text-xl font-semibold mb-2">Ferramentas Intuitivas</h2>
                                <p className="text-gray-700">
                                    Nossa plataforma oferece ferramentas intuitivas para monitorar seu progresso, lembretes de medicação e dicas personalizadas para melhorar seu bem-estar. Junte-se a nós e comece sua jornada para uma vida mais saudável hoje mesmo!
                                </p>
                            </div>
                            <div className="flex justify-center flex-col mb-4 p-6 bg-white shadow-lg rounded-lg text-center md:text-left md:w-1/2 md:order-3">
                                <h2 className="text-xl font-semibold mb-2">Conecte-se com Profissionais</h2>
                                <p className="text-gray-700">
                                    Você também pode se conectar com profissionais de saúde e acessar recursos exclusivos para maximizar seus resultados. HealthyHub é mais do que um rastreador, é o seu parceiro de saúde.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-neutral-900 text-white py-4">
                    <div className="container mx-auto text-center">
                        <p className="text-sm">© 2024 HealthyHub. Todos os direitos reservados.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Home;
