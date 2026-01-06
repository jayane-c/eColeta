import "./NavbarCooperativa.css";
import { useNavigate } from "react-router-dom";
import IconeCooperativa from "../../assets/Logo/icone-cooperativa.png";
import BotaoDescarte from "../BotaoDescarte/BotaoDescarte";
import BotaoSair from "../botaoSair/BotaoSair";
import { useAuth } from "../../contexts/AuthContext";

export default function NavbarCooperativa() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nomeCooperativa = user?.nome || "Cooperativa";

  const handleSair = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="barra-navegacao-coop">
      <div className="conteudo-navegacao">
        <div
          className="logo-e-texto"
          onClick={() => navigate("/dashboard-cooperativa")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={IconeCooperativa}
            alt="Logo"
            className="imagem-logo-png"
          />

          <div className="identificacao">
            <h2 className="titulo-coop">{nomeCooperativa}</h2>
            <p className="subtitulo-coop">Painel de Gestão</p>
          </div>
        </div>

        <div className="acoes-navbar">
          <BotaoDescarte onClick={() => navigate("/guia-materiais")} />
          <BotaoSair onSair={handleSair} />
        </div>
      </div>
    </nav>
  );
}
