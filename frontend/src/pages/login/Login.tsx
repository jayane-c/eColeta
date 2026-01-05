import './Login.css';
import { Mail, Lock} from 'lucide-react';
import Logo from "../../assets/Logo/logo2.png"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
    setCarregando(true);
    setErro('');

    const dados = {
      email: email.toLowerCase().trim(),
      senha: senha
    };

    console.log("Integrando com o backend... Dados:", dados);

   
    setTimeout(() => {
      setCarregando(false);

      localStorage.setItem('token', 'meu_token');
      navigate('/dashboard-morador');
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={Logo} alt="eColeta" className="login-logo" />
        <h1 className="brand-name">eColeta</h1>
        <p className="login-subtitle">Entre na sua conta</p>
      </div>
      <div className="login-card">
        {erro && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{erro}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input type="email" placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input type="password" placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} />
          </div>
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button className="btn-flat">Esqueceu a senha?</button>
      </div>
      <div className="register-card">
        <p> Não tem uma conta? <span className="register-link-container" onClick={() => navigate('/cadastro-morador')}>
            <strong className="text-bold"> Cadastre-se</strong>
          </span>
          </p>
      </div>

    </div>
  );
}