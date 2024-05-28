import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Exercicios from './pages/Exercicios';
import Resumo from './pages/Resumo';
import ListMedicamentos from './pages/ListMedicamentos';
import UpdateMedicamentos from './pages/UpdateMedicamentos';
import AddMedicamentos from './pages/AddMedicamentos';
import Metricas from './pages/Metricas';
import Configuracoes from './pages/Configuracoes';
import Home from './pages/Home'; // Import the Home component

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home route without Layout */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="resumo" element={<Resumo />} />
                    <Route path="exercicios" element={<Exercicios />} />
                    <Route path="medicamentos" element={<ListMedicamentos />} />
                    <Route path="medicamentos/edit/:id" element={<UpdateMedicamentos />} />
                    <Route path="medicamentos/adicionar" element={<AddMedicamentos />} />
                    <Route path="metricas" element={<Metricas />} />
                    <Route path="configuracoes" element={<Configuracoes />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
