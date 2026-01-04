import './DashboardCooperativa.css';
import NavbarCooperativa from '../../../Components/navbarCooperativa/NavbarCooperativa';
import DashBoardContentCooperativa from '../../../Components/dashboardContent/DashboardContentCooperativa';
import HistoricoCooperativa from '../../../Components/historicoCooperativa/HistoricoCooperativa';
import MateriaisAceitos from '../../../Components/materiaisAceitos/MateriaisAceitos';
import Footer from '../../../Components/Footer/footer';

export default function DashboardCooperativa() {
    const nomeDaCooperativa = "CoopRecicla São Paulo";

    const meusMateriais = ["papel", "plastico", "metal", "oleo"]; 

    return (
        <div className="recipiente-dashboard-principal">
            <NavbarCooperativa nome={nomeDaCooperativa} />

            <div className="conteudo-central">
                <DashBoardContentCooperativa />
                <HistoricoCooperativa materiaisSelecionados={meusMateriais} />
                <MateriaisAceitos materiaisSelecionados={meusMateriais} />
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}