import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/home/home'
import CadastroMorador from "../pages/cadastro/morador/CadastroMorador"
import CadastroColetor from "../pages/cadastro/coletor/CadastroColetor"
import CadastroCooperativa from "../pages/cadastro/cooperativa/CadastroCooperativa"
import DashboardColetor from "../pages/dashboard/coletor/DashboardColetor"
import DashboardMorador from "../pages/dashboard/morador/DashboardMorador"
import PerfilColetor from "../pages/perfil-coletor/PerfilColetor"
import DashboardCooperativa from "../pages/dashboard/cooperativa/DashboardCooperativa"
import GuiaSeparacao from "../pages/guia-separacao/Guiaseparacao"
import Login from "../pages/login/login"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro-morador" element={<CadastroMorador />} />
                <Route path="/cadastro-coletor" element={<CadastroColetor />} />
                <Route path="/cadastro-cooperativa" element={<CadastroCooperativa />} />
                <Route path="/dashboard-coletor" element={<DashboardColetor />} />
                <Route path="/dashboard-morador" element={<DashboardMorador/>}/>
                <Route path="/perfil" element={<PerfilColetor />} />
                <Route path="/dashboard-cooperativa" element={<DashboardCooperativa/>} />
                <Route path="/guia-separacao" element={<GuiaSeparacao/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes;   