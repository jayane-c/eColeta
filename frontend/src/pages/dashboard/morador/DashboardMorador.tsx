import './DashboardMorador.css';
import NavbarMorador from '../../../Components/navbar-morador/NavbarMorador';
import DashboardContentMorador from '../../../Components/dashboardContent/DashboardContentMorador';
import Footer from '../../../Components/Footer/footer';

export default function DashboardMorador() {

    return (
        <div className="recipiente-dashboard-principal">
            <NavbarMorador />

            <div className="conteudo-central">
                <DashboardContentMorador />
            </div>
            
            <Footer />
        </div>
    );
}