import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Exercicios from './pages/Exercicios'
import Resumo from './pages/Resumo'
import AddMedicamentos from './pages/AddMedicamentos'
import Metricas from './pages/Metricas'
import Configuracoes from './pages/Configuracoes'


function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Resumo />} />
                    <Route path="exercicios" element={<Exercicios />} />
                    <Route path="medicamentos" element={<AddMedicamentos />} />
                    <Route path="metricas" element={<Metricas />} />
                    <Route path="configuracoes" element={<Configuracoes />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </HashRouter>
    )
}

export default App
