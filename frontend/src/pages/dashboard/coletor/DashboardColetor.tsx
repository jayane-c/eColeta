import CardResumo from "../../../Components/dashboard-coletor/card-resumo/CardResumo";
import "./DashboardColetor.css";
// 1. CORREÇÃO: Adicionadas as chaves { } no import
import { NavbarColetor } from "../../../Components/dashboard-coletor/navbar/NavbarColetor";
import ColetasDisponiveis from "../../../Components/dashboard-coletor/coletas-disponiveis/ColetasDisponiveis";
import { useState } from "react";
import DetalheColetas from "../../../Components/dashboard-coletor/detalhe-coletas/DetalheColetas";
import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import Footer from "../../../Components/Footer/footer";

// Interface flexível para evitar erros de tipagem com os dados novos do banco
interface Coleta {
  id_coleta: number;
  [key: string]: any; 
}

function DashboardColetor() {
  const [totalDisponiveis, setTotalDisponiveis] = useState(0);
  const [totalAndamento, setTotalAndamento] = useState(0);
  const [totalFinalizadas, setTotalFinalizadas] = useState(0);
  const [coletaIniciada, setColetaIniciada] = useState(false);

  const [coletaAtiva, setColetaAtiva] = useState<Coleta | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Removida a lógica de 'nomeParaExibicao' (a Navbar já resolve isso)

  const handleAceitarColeta = (dadosDaColeta: any) => {
    if (coletaAtiva) {
      alert("Você já possui uma coleta em andamento! Finalize-a antes de aceitar outra.");
      return;
    }

    setColetaAtiva(dadosDaColeta);
    setMostrarModal(true);
    setTotalAndamento((prev) => prev + 1);
    // Ajuste visual simples
    setTotalDisponiveis((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleFinalizarColeta = () => {
    setMostrarModal(false);
    setColetaAtiva(null);
    setColetaIniciada(false);
    setTotalAndamento((prev) => prev - 1);
    setTotalFinalizadas((prev) => prev + 1);
  };

  return (
    <>
      {/* 2. CORREÇÃO: Navbar sem props */}
      <NavbarColetor />

      <main className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-cards">
            <CardResumo
              titulo="Disponíveis"
              valor={totalDisponiveis}
              icon={<Package size={24} />}
              colorClass="orange"
            />
            <CardResumo
              titulo="Em Andamento"
              valor={totalAndamento}
              icon={<Truck size={24} />}
              colorClass="blue"
            />
            <CardResumo
              titulo="Finalizadas"
              valor={totalFinalizadas}
              icon={<CheckCircle size={24} />}
              colorClass="green"
            />
          </div>

          {coletaAtiva && !mostrarModal && (
            <div className="alerta-coleta-ativa" onClick={() => setMostrarModal(true)}>
              <div className="alerta-conteudo">
                <AlertCircle size={20} />
                <p>
                  Você tem uma coleta em andamento: <strong>{coletaAtiva.morador?.nome || "Ver detalhes"}</strong>
                </p>
              </div>
              <span>Clique para ver detalhes</span>
            </div>
          )}

          <div className="dashboard-section-wrapper">
            <ColetasDisponiveis
              setTotalDisponiveis={setTotalDisponiveis}
              onAceitar={handleAceitarColeta}
              bloquearBotao={!!coletaAtiva}
            />
          </div>
        </div>

        {mostrarModal && coletaAtiva && (
          <DetalheColetas
            coleta={coletaAtiva}
            onClose={() => setMostrarModal(false)}
            onFinalizar={handleFinalizarColeta}
            iniciada={coletaIniciada}
            setIniciada={setColetaIniciada}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default DashboardColetor;