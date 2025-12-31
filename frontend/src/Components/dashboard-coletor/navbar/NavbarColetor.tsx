import "./NavbarColetor.css"
import logo from "../../../assets/dashboard.jpeg"
function NavbarColetor() {
  return (
    <header className="navbar-coletor">
      <div className="navbar-container">
        
        <div className="navbar-left">
          <img src={logo} alt="logo eColeta" className="navbar-logo"/>
          <div>
            <h1>Olá, Carlos Santos!</h1>
            <p>Dashboard do Coletor</p>
          </div>
        </div>

        <button className="navbar-button">
          Meu perfil
        </button>

      </div>
    </header>
  );
}

export default NavbarColetor;
