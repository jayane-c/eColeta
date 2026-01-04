import "./NavbarCooperativa.css";
import { useNavigate } from "react-router-dom";
import IconeCooperativa from "../../assets/Logo/icone-cooperativa.png";
import BotaoDescarte from "../BotaoDescarte/BotaoDescarte";
import BotaoSair from "../botaoSair/BotaoSair"; 

export default function NavbarCooperativa({ nome }: { nome: string }) {
  const navigate = useNavigate();

  return (
    <nav className="barra-navegacao-coop">
      <div className="conteudo-navegacao">
        <div className="logo-e-texto" onClick={() => navigate("/")}>
          <img src={IconeCooperativa} alt="Logo" className="imagem-logo-png" />
          <div className="identificacao">
            <h2 className="titulo-coop">{nome}</h2>
            <p className="subtitulo-coop">Painel da Cooperativa</p>
          </div>
        </div>

        <div className="acoes-navbar">
          <BotaoDescarte onClick={() => navigate("/guia")} />
          <BotaoSair onSair={() => navigate("/")} />
        </div>
      </div>
    </nav>
  );
}