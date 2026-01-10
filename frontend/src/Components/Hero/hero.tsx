import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Conectando você à coleta sustentável!</h1>
          <p>Facilitando a reciclagem e promovendo um futuro mais verde, juntos.</p>
          <button className="btn-saiba-mais"
            onClick={() => navigate('/saibaMais')}>Saiba mais</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;