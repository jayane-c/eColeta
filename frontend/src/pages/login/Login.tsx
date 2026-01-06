import './Login.css';
import { Mail, Lock, User } from 'lucide-react'; // Adicionei icone de User
import Logo from "../../assets/Logo/logo2.png"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // NOVO: Precisamos saber quem está logando para mandar pro backend correto
  const [tipo, setTipo] = useState('morador'); 
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      // 1. AQUI É A MUDANÇA REAL: Chamada ao Backend
      // A URL muda dinamicamente baseada no tipo (ex: /auth/login/morador)
      const response = await api.post(`/auth/login/${tipo}`, {
        email: email.toLowerCase().trim(),
        senha: senha
      });

      // 2. Pegamos o token REAL que veio do servidor
      const { token, user } = response.data;

      // 3. Salvamos o token (vital para as próximas telas funcionarem)
      localStorage.setItem('token', token);
      
      // Opcional: salvar dados do usuário para mostrar nome no dashboard
      localStorage.setItem('user', JSON.stringify(user));

      // 4. Redirecionamento correto
      if (tipo === 'morador') navigate('/dashboard-morador');
      else if (tipo === 'ecoletor') navigate('/dashboard-coletor');
      else if (tipo === 'cooperativa') navigate('/dashboard-cooperativa');

    } catch (error: any) {
      console.error(error);
      // Pega a mensagem de erro do backend (Ex: "Senha incorreta")
      setErro(error.response?.data?.message || "Falha no login. Verifique suas credenciais.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={Logo} alt="eColeta" className="login-logo" />
        <h1 className="brand-name">eColeta</h1>
        <p className="login-subtitle">Entre na sua conta</p>
      </div>
      <div className="login-card">
        {erro && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* NOVO CAMPO: Seleção de Tipo de Usuário */}
          <div className="input-group">
            <User size={20} className="input-icon" />
            <select 
              value={tipo} 
              onChange={(e) => setTipo(e.target.value)}
              className="login-select" // Você pode estilizar isso no CSS se quiser
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px' }}
            >
              <option value="morador">Sou Morador</option>
              <option value="ecoletor">Sou Ecoletor</option>
              <option value="cooperativa">Sou Cooperativa</option>
            </select>
          </div>

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
              onChange={(e) => setSenha(e.target.value)} 
              required
            />
          </div>
          
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Acessando..." : "Entrar"}
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