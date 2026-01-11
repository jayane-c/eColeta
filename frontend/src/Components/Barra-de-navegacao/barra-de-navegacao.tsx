import '../Barra-de-navegacao/barra-de-navegacao.css';
import Logo from '../../assets/Logo/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Barra_de_navegacao() {
    const navigate = useNavigate();

    return (
        <header className="header-fix">
            <div className="header-content">
                <img src={Logo} alt="eColeta" className="logo-img" />

                <nav className="nav-menu">
                    <ul>
                        <li
                            className="nav-link"
                            onClick={() => navigate('/saibaMais')}>Saiba Mais
                            </li>
                            
                        <li
                            className="nav-link"
                            onClick={() => navigate("/guia-separacao")}> Guia de Separação
                                
                            </li>
                    </ul>

                    <button
                        className="btn-entrar-fix"
                        onClick={() => navigate('/login')}
                    >
                        Entrar
                    </button>
                </nav>
            </div>
        </header>
    );
}