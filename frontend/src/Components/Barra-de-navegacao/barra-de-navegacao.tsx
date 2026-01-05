import '../Barra-de-navegacao/barra-de-navegacao.css';
import Logo from '../../assets/Logo/logo.png';

export default function Barra_de_navegacao() {
    return (
        <header className="header-fix">
            <div className="header-content">
                <img src={Logo} alt="eColeta" className="logo-img" />
                
                <nav className="nav-menu">
                    <ul>
                        <li>Inicio</li>
                        <li>Sobre</li>
                        <li>Como Funciona</li>
                        <li>Contato</li>
                    </ul>
                    <button className="btn-entrar-fix">Entrar</button>
                </nav>
            </div>
        </header>
    );
}