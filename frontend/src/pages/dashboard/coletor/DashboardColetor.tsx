import CardResumo from "../../../Components/dashboard-coletor/card-resumo/CardResumo"
import "./DashboardColetor.css"

function DashboardColetor() {
  return (
    <main className="dashboard-page"> 
      <div className="dashboard-container">

        <div className="dashboard-cards">
          <CardResumo
            titulo="Disponíveis"
            valor={0}
            icon="📦"
            colorClass="orange"
          />

          <CardResumo
            titulo="Em Andamento"
            valor={0}
            icon="✈️"
            colorClass="blue"
          />

          <CardResumo
            titulo="Finalizadas"
            valor={0}
            icon="✅"
            colorClass="green"
          />
        </div>
      </div>
    </main>
  );
}

export default DashboardColetor;

