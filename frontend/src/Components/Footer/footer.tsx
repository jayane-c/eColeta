import "./Footer.css";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-marca">
          <div className="footer-logo">
            <MapPin className="footer-icone-localizacao" />
            <h2>eColeta</h2>
          </div>

          <span className="footer-slogan">Reciclagem na sua porta</span>

          <p className="footer-descricao">
            Conectando pessoas e cooperativas para um futuro mais sustentável.
            Transforme seus resíduos em impacto positivo.
          </p>

          <div className="footer-selo">
            ♻️ Certificado Selo Verde
          </div>
        </div>

        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <ul>
            <li>Como Funciona</li>
            <li>Guia de Separação</li>
            <li>Área do Usuário</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Junte-se a Nós</h4>
          <ul>
            <li>Cadastro de Morador</li>
            <li>Cadastro de Coletor</li>
            <li>Cadastro de Cooperativa</li>
          </ul>
        </div>

        <div className="footer-contato">
          <h4>Contato</h4>

          <div className="contato-item">
            <Mail size={18} />
            <span>contato@ecoleta.com.br</span>
          </div>

          <div className="contato-item">
            <Phone size={18} />
            <span>(81) 99636-3918 </span>
          </div>

          <div className="contato-item">
            <MapPin size={18} />
            <span>Igarassu, PE</span>
          </div>
        </div>
      </div>

      <hr className="footer-divisor" />

      <div className="footer-inferior">
        <p>© 2026 eColeta. Todos os direitos reservados.</p>
        <span>Desenvolvido com ❤️ para um planeta mais sustentável</span>
      </div>

      <div className="footer-impacto">
        ♻️ Impacto Positivo — Ajudando a construir um futuro sustentável
      </div>
    </footer>
  );
}
