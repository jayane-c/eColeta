import "./NavbarColetor.css"
import logo from "../../../assets/Logo/recycleIcon.png"
import { useNavigate } from "react-router-dom"; 

interface NavbarColetorProps {
  nome?: string;
}

function NavbarColetor({ nome }: NavbarColetorProps) {
  const navigate = useNavigate();
  
  return (
    <header className="navbar-coletor">
      <div className="navbar-container">
        
        <div className="navbar-left">
          <img src={logo} alt="logo eColeta" className="navbar-logo"/>
          <div>
            <h1>Olá, {nome || "Coletor"}!</h1>
            <p>Painel do Coletor</p>
          </div>
        </div>

        <button className="navbar-button" onClick={() => navigate("/perfil")}>
          Meu perfil
        </button>

      </div>
    </header>
  );
}

export default NavbarColetor;