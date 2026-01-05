import './Login.css';
import { Mail, Lock} from 'lucide-react';
import Logo from "../../assets/Logo/logo2.png"

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-header">
        <img src={Logo} alt="eColeta" className="login-logo" />
        <h1 className="brand-name">eColeta</h1>
        <p className="login-subtitle">Entre na sua conta</p>
      </div>
      <div className="login-card">
        <div className="input-group">
          <Mail size={20} className="input-icon" />
          <input type="text" placeholder="E-mail" />
        </div>
        <div className="input-group">
          <Lock size={20} className="input-icon" />
          <input type="password" placeholder="********" />
        </div>
        <button className="btn-entrar">Entrar</button>
        <button className="btn-flat">Esqueceu a senha?</button>
      </div>
      <div className="register-card">
        <p>Não tem uma conta? <span className="text-bold">Cadastre-se</span></p>
      </div>
     
    </div>
  );
}