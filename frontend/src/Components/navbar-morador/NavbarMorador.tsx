import '../../CSS/global.css';
import './NavbarMorador.css';
import iconeReciclagem from "../../assets/Logo/recycleIcon.png"; 
import { useNavigate } from "react-router-dom";
import BotaoDescarte from "../BotaoDescarte/BotaoDescarte";
import BotaoSair from "../botaoSair/BotaoSair";
import { useAuth } from "../../contexts/AuthContext";

export default function NavbarMorador() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const nomeExibicao = (() => {
        if (user?.nome) {
            const partes = user.nome.trim().split(/\s+/);
            if (partes.length > 1) {
                return `${partes[0]} ${partes[1]}`;
            }
            return partes[0];
        }
        return 'Morador';
    })();

    return (
        <header className="navegacao-recipiente">
            <div className="navegacao-esquerda">
                <div className="caixa-icone">
                    <img src={iconeReciclagem} alt="Ícone de Reciclagem" className="navegacao-icone" />
                </div>
                <div className="navegacao-texto">
                    <h2>Olá, {nomeExibicao}!</h2>
                    <span>Painel do Morador</span>
                </div>
            </div>

            <div className="navegacao-direita">
                <BotaoDescarte onClick={() => navigate("/guia-separacao")} />
                <BotaoSair onSair={() => {
                    logout();
                    navigate("/");
                }} />
            </div>
        </header>
    );
}