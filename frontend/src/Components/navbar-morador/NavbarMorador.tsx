import '../../CSS/global.css';
import './NavbarMorador.css';
import iconeReciclagem from "../../assets/Logo/recycleIcon.png"; 
import { useNavigate } from "react-router-dom";
import BotaoDescarte from "../BotaoDescarte/BotaoDescarte";
import BotaoSair from "../botaoSair/BotaoSair";

interface PropriedadesNavbar {
    nome: string;
}

export default function NavbarMorador({ nome }: PropriedadesNavbar) {
    const navigate = useNavigate();

    return (
        <header className="navegacao-recipiente">
            <div className="navegacao-esquerda">
                <div className="caixa-icone">
                    <img src={iconeReciclagem} alt="Ícone de Reciclagem" className="navegacao-icone" />
                </div>
                <div className="navegacao-texto">
                    <h2>Olá, {nome}!</h2>
                    <span>Painel do Morador</span>
                </div>
            </div>

            <div className="navegacao-direita">
                <BotaoDescarte onClick={() => navigate("/guia-morador")} />
                <BotaoSair onSair={() => navigate("/")} />
            </div>
        </header>
    );
}