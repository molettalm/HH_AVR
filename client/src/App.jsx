import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Register from './pages/register-login/Register';
import Login from './pages/register-login/Login';
import ListExercicios from './pages/exercises/ListExercicios';
import UpdateExercicios from './pages/exercises/UpdateExercicios';
import AddExercicios from './pages/exercises/AddExercicios';
import Resumo from './pages/Resumo';
import ListMedicamentos from './pages/medicines/ListMedicamentos';
import UpdateMedicamentos from './pages/medicines/UpdateMedicamentos';
import AddMedicamentos from './pages/medicines/AddMedicamentos';
import Metricas from './pages/metrics/UpdateMetricas';
import Configuracoes from './pages/Configuracoes';
import Home from './pages/Home';
import RegisterInfo from './pages/register-login/RegisterInfo';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home route without Layout */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info" element={<RegisterInfo />} />
                <Route path="/" element={<Layout />}>
                    <Route path="resumo" element={<Resumo />} />
                    <Route path="exercicios" element={<ListExercicios />} />
                    <Route path="exercicios/edit/:id" element={<UpdateExercicios />} />
                    <Route path="exercicios/adicionar" element={<AddExercicios />} />
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
