import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/paginaDeError.css';

const ErrorPage = () => {
  return (
    <div>
      <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
      <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
      <h1>404 - Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default ErrorPage;