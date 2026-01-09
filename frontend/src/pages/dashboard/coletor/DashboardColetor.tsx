import CardResumo from "../../../Components/dashboard-coletor/card-resumo/CardResumo"
import "./DashboardColetor.css"
import NavbarColetor from "../../../Components/dashboard-coletor/navbar/NavbarColetor";
import ColetasDisponiveis from "../../../Components/dashboard-coletor/coletas-disponiveis/ColetasDisponiveis";
import { useState } from "react";
import DetalheColetas from "../../../Components/dashboard-coletor/detalhe-coletas/DetalheColetas"
import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import Footer from "../../../Components/Footer/footer"

interface Coleta {
  id: string;
  material: string;
  quantidade: string;
  peso: string;
  endereco: string;
  distancia?: string;
}

function DashboardColetor() {
  const [totalDisponiveis, setTotalDisponiveis] = useState(0)
  const [totalAndamento, setTotalAndamento] = useState(0)
  const [totalFinalizadas, setTotalFinalizadas] = useState(0)
  const [coletaIniciada, setColetaIniciada] = useState(false);

  const [coletaAtiva, setColetaAtiva] = useState<Coleta | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
 
  const [filtro, setFiltro] = useState('disponiveis');

  const todasColetas = [
    { id: 1, material: 'Vidro', status: 'disponivel', peso: '3kg' },
    { id: 2, material: 'Papel', status: 'andamento', peso: '5kg' },
   
  ];

  const [nomeParaExibicao] = useState(() => {
    const nomeSalvo = localStorage.getItem('@eColeta:nomeUsuario');
    if (nomeSalvo) {
      return nomeSalvo.split(" ").slice(0, 2).join(" ");
    }
    return "Coletor";
  });



  const handleAceitarColeta = (dadosDaColeta: Coleta) => {
    if (coletaAtiva) {
      alert("Você já possui uma coleta em andamento! Finalize-a antes de aceitar outra.");
      return;
    }

    setColetaAtiva(dadosDaColeta);
    setMostrarModal(true);
    setTotalAndamento(prev => prev + 1);
    setTotalDisponiveis(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleFinalizarColeta = () => {
    setMostrarModal(false);
    setColetaAtiva(null);
    setColetaIniciada(false);
    setTotalAndamento(prev => prev - 1);
    setTotalFinalizadas(prev => prev + 1);
  };

  return (
    <>
      <NavbarColetor />

      <main className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-cards">

            <div
              onClick={() => setFiltro('disponiveis')}
              className={filtro === 'disponiveis' ? 'card-selecionado' : ''}
            >
              <CardResumo
                titulo="Coletas Disponíveis"
                valor={totalDisponiveis}
                icon={<Package size={24} />}
                colorClass="orange"
              />
            </div>

            <div
              onClick={() => setFiltro('andamento')}
              className={filtro === 'andamento' ? 'card-selecionado' : ''}
            >
              <CardResumo
                titulo="Em Andamento"
                valor={totalAndamento}
                icon={<Truck size={24} />}
                colorClass="blue"
              />
            </div>


            <div
              onClick={() => setFiltro('finalizadas')}
              className={filtro === 'finalizadas' ? 'card-selecionado' : ''}
            >
              <CardResumo
                titulo="Finalizadas"
                valor={totalFinalizadas}
                icon={<CheckCircle size={24} />}
                colorClass="green"
              />
            </div>
          </div>

          {coletaAtiva && !mostrarModal && (
            <div className="alerta-coleta-ativa" onClick={() => setMostrarModal(true)}>
              <div className="alerta-conteudo">
                <AlertCircle size={20} />
                <p>Você tem uma coleta em andamento: <strong>{coletaAtiva.material}</strong></p>
              </div>
              <span>Clique para ver detalhes</span>
            </div>
          )}

          <div className="dashboard-section-wrapper">
            <ColetasDisponiveis
              filtroAtual={filtro} 
              setTotalDisponiveis={setTotalDisponiveis}
              setTotalAndamento={setTotalAndamento}
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