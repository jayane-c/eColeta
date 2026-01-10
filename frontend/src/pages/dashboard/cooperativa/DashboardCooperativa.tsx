import './DashboardCooperativa.css';
import NavbarCooperativa from '../../../Components/navbarCooperativa/NavbarCooperativa';
import DashBoardContentCooperativa from '../../../Components/dashboardContent/DashboardContentCooperativa';
import MateriaisAceitos from '../../../Components/materiaisAceitos/MateriaisAceitos';
import Footer from '../../../Components/Footer/footer';

export default function DashboardCooperativa() {
    return (
        <div className="recipiente-dashboard-principal">
            <NavbarCooperativa />

            <div className="conteudo-central">
                <DashBoardContentCooperativa />  
                <MateriaisAceitos />
            </div>
            
            <Footer/>
        </div>
    );
}