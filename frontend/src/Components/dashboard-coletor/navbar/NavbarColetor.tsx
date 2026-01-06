import "./NavbarColetor.css";
import logo from "../../../assets/Logo/recycleIcon.png"; // Confirme se esse é o ícone que você usava
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react"; // Opcional: ícone para sair

export function NavbarColetor() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("Coletor");

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        // Pega o primeiro nome (ex: "Matheus Francisco" -> "Matheus")
        if (user && user.nome) {
            const primeiroNome = user.nome.split(' ')[0];
            setNomeUsuario(primeiroNome);
        }
      } catch (e) {
        console.error("Erro ao ler nome do usuário", e);
      }
    }
  }, []);

  function handleSair() {
      localStorage.clear(); // Limpa tudo
      navigate('/login');
  }

  return (
    <header className="navbar-coletor">
      <div className="navbar-container">
        
        {/* Lado Esquerdo: Logo + Texto de Boas Vindas */}
        <div className="navbar-left">
          <img src={logo} alt="logo eColeta" className="navbar-logo"/>
          <div>
            <h1>Olá, {nomeUsuario}!</h1>
            <p>Painel do Coletor</p>
          </div>
        </div>

        {/* Lado Direito: Botões */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="navbar-button" onClick={() => navigate("/perfil")}>
              Meu perfil
            </button>
            
            {/* Botão de Sair discreto*/}
            <button 
                onClick={handleSair} 
                style={{ 
                    background: 'transparent', 
                    border: '1px solid #fff', 
                    color: '#fff', 
                    padding: '8px', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                }}
                title="Sair"
            >
                <LogOut size={20} />
            </button>
        </div>

      </div>
    </header>
  );
}